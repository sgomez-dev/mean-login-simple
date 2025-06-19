const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRETE_KEY = 'secretkey123456';

exports.createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            pass: hashedPassword,
        };

        const user = await User.create(newUser);

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRETE_KEY, { expiresIn });

        res.send({ user, accessToken });
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error');
    }
    
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).send('User not found');

        const passIsValid = await bcrypt.compare(pass, user.pass);
        if (!passIsValid) return res.status(401).send('Invalid Password');

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRETE_KEY, { expiresIn });

        res.send({ user, accessToken });
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error');
    }
}