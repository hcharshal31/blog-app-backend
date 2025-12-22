const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv");

const signup = async (req, res) => {
    try{
        const { firstName, lastName, emailId, password, age, gender } = req.body;
        if(!firstName || !lastName || !emailId || !password){
            return res.status(400).json({
                message: "firstname, lastname, email and password are required!"
            });
        }

        const alreadyExistingUser = await User.findOne({emailId});
        if(alreadyExistingUser){
            return res.status(409).json({
                message: "User already exist with this email!",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword,
            age: age || undefined,
            gender: gender || undefined,
        });

        res.status(201).json({
            message: "User registered succussfully",
            user: {
                id: user._id,
                firstname: user.firstName,
                lastName: lastName,
                emailId: emailId,
            }
        })

    } catch(err) {
        res.status(500).json({
            message: "Signup failed!",
            error: err.message,
        })
    }
}

const login = async (req, res) => {
    try{
        const { emailId, password } = req.body;
        if(!emailId || !password){
            return res.status(400).json({
                message: "Email and Password are required!"
            })
        }

        // Checking if the user is already present in the database
        const user = await User.findOne({emailId});
        if(!user){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        // Comparing the password provided by the user is matching with the password present in the database
         const isPasswordMatch = await bcrypt.compare(password, user.password);
         // How the above line works
         // 1) Extract salt from stored hashed password
         // 2) Hash the entered password using that salt
         // 3) Compares new hashed password with stored hashed password

         if(!isPasswordMatch){
            return res.status(401).json({
                message: "Invalid credentials"
            })
         }

         const jwtToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
         )

         res.status(200).json({
            message: "Login succussfull!",
            jwtToken
         })
    } catch(err){

    }

}

module.exports = { signup, login };