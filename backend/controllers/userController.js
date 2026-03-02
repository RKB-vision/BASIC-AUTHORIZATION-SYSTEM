const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    res.json(await UserModel.find());
};

exports.register = async (req, res) => {
    const {name}=req.body;
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already registered" });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const new_user = await UserModel.create({
            name,
            email: email,
            password: hashedPassword
        });
        res.status(201).json(email);
    }
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { id: user._id },
                "your_secret_key",
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login successful", token: token ,name:user.name});
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    } else {
        return res.status(400).json({ message: "Email not registered" });
    }
};
