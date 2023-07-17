const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const user = require('../models/user')


const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}


// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await User.findOne({ username: username });
        // console.log(result);
        if (!result) {
            throw Error("user not found");
        }
        else {
            const hash = result.password;
            bcrypt.compare(password, hash, async function (err, data) {
                if (data) {
                    const token = createToken(result._id);
                    res.status(200).json({ "message": "ok", "user": result.username, "token": token });
                }
                else if (err) {
                    // console.log(err);
                    res.status(500).json({ "message": err, "user": "" });
                }
                else {
                    throw Error("invalid credentials")
                }

            });
        }
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }

}


// register user
const registerUser = async (req, res) => {

    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw Error('All fields are required')
        }
        if (!validator.isEmail(username)) {
            throw Error('Not a valid username')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Password is not strong');
        }

        let result;
        let saltRounds = 10;
        const data = await User.findOne({ username: username }).select("username");
        if (data) {
            throw Error('User already exist');
        }
        else {

            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    res.send(err);
                }
                else {
                    let user = new User({ username, password: hash });
                    result = await user.save();
                    const token = createToken(user._id);
                    res.json({ "username": user.username, "token": token })
                }
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUser, registerUser }