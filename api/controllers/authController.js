import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import listingModel from "../model/listingModel.js";



export const signUpController = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const hashedPassword = await hashPassword(password)

        const newUser = new userModel({
            username,
            password: hashedPassword,
            email
        })
        const user = await newUser.save();
        res.status(201).send({
            success: true,
            message: "User Create successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration"
        })
    }
}


export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                username: user.username,
                email: user.email,

            },
            user,
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login"
        })
    }
}



export const google = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new userModel({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};



export const editUserData = async (req, res) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const editedUser = await userModel.findByIdAndUpdate(id, data, { new: true })

        if (!editedUser) {
            return res.status(404).json({ message: "user not found" })
        }

        res.status(200).json(editedUser);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }
};


export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }
}



export const getUserListings = async (req, res) => {
    try {
        const listing = await listingModel.find({ userRef: req.params.id })
        res.status(200).json(listing);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }

}


export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)

        if (!user) return res.status(404).send("User not found")
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log(error)
    }
}