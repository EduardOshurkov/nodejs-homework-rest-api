const { User } = require("../../models/user");

const { RequestError, sendMail, createVerifyEmail } = require("../../helpers");


const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(404, "missing required field email")
    }

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed")
    }

    const mail = createVerifyEmail(email, user.verificationToken);

    await sendMail(mail);

    res.json({
        message: "Verification email sent"
    })
};

module.exports = resendEmail;
