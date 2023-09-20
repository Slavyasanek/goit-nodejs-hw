const createEmailBody = (email, verificationToken) => {
    const emailToSend = {
        Recipients: [
            {
                Email: email,
                Fields: {
                    user: email, 
                    verificationToken: verificationToken,
                }
            }
        ],
        Content: {
            Body: [
                {
                    ContentType: "HTML",
                    Charset: "utf-8",
                    Content: "<h1>Hello, {user}!</h1><p>Please, follow the link below to confirm your verification Token</p> <div><a target='_blank' href='http://localhost:3000/users/verify/{verificationToken}'>Verify your account here</a></div>"
                }
            ],
            From: "sasha0306052003@gmail.com",
            Subject: "Email verification"
        }
    }
    return emailToSend;
}

module.exports = createEmailBody;