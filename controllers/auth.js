const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPassword });
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

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}