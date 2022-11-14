const register = require("./register");
const verify = require("./verify");
const resendEmail = require("./resendEmail")
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");


module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateAvatar,
    verify,
    resendEmail,
}