const express = require('express');
const router = express.Router();
const User = require('../Models/user');

//Getting all users
router.get('/getAll', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});





//Getting one user
router.get('/getUser/:id', getUser,(req, res) => {
    res.json(res.user);
});



//Creating one 
router.post('/createUser', async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


//Updating one user
router.patch('/updateUser/:id',getUser , async(req, res) => { 
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});



//Deleting one user
router.delete('/deleteUser/:id',getUser, async(req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message:"Deleted User"});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});





router.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("Invalid email or password")
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            console.log("User does not match")
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If login is successful
        // Create and return a JSON Web Token
        const token = user.generateAuthToken();
        res.json({ status: true, token, message: "Login successful" });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





 async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user;
    next();
};






//Exporting the router
module.exports = router