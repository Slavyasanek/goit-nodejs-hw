const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const path = require("path");
const fs = require('fs/promises');
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
        user: {
            email, subscription: newUser.subscription
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email })
    if (!currentUser) {
        throw HttpError(401, "Email or password is wrong");
    }
    const comparedPassword = await bcrypt.compare(password, currentUser.password)
    if (!comparedPassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: currentUser._id,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3h" });
    await User.findByIdAndUpdate(currentUser._id, { token: token }, { new: true })
    res.status(200).json({
        token,
        user: {
            email,
            subscription: currentUser.subscription
        }
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    res.status(204).send()
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        email, subscription
    })
}

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body
    const result = await User.findByIdAndUpdate(_id, { subscription: subscription })
    res.status(200).json({
        email: result.email,
        subscription: result.subscription
    })
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const {path: tempPath, originalname} = req.file;
    try {
        const image = await Jimp.read(tempPath);
        image.resize(250, 250).write(tempPath);
    } catch (error) {
        res.status(500).json({message: "Server error. Were not able to resize image"})
    }
    const filename = `${_id}_${originalname}`;
    const resultDist = path.join(avatarDir, filename);
    await fs.rename(tempPath, resultDist);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.status(200).json({
        avatarURL
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
}