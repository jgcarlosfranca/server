const UserModel = require("../model/UserModel")
const jwt = require("jsonwebtoken")
const { MAX_TIME_EXPIRED_TOKEN, SECRET_PHRASE } = require("../utils/constants")


//"Hupão é muito melhor que a Raiden Shogun" --> gerador de hash aleatorio com frase grande
/* Para observar se está certo entrar no site jwt.io
colar o jwt gerado no resgitro 
o primeiro codigo antes do ponto é o header
o roxinho é o id q apresenta no banco 
pra validar coloca o secret phrase --> Hupão é muito melhor que a Raiden Shogun e é validado no site do jwt --> (no footer) "Signature Verified"
*/

const createToken = (id) => {
    return jwt.sign({ id }, SECRET_PHRASE, {
        expiresIn: MAX_TIME_EXPIRED_TOKEN,
    })
}

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


module.exports.register = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.create({ email, password });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: MAX_TIME_EXPIRED_TOKEN * 1000,
        });

        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: MAX_TIME_EXPIRED_TOKEN * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};