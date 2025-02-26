require("dotenv").config();
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");


const RequestError = require("../../helpers/RequestError");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.verify) {
        throw RequestError(401, "Email or password wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw RequestError(401, "Email or password wrong");
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
};

module.exports = login;

