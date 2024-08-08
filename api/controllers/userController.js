import bcryptjs from 'bcrypt';
import User from '../model/userModel.js';
import { hashPassword } from '../helper/authHelper.js';
import userModel from '../model/userModel.js';

// export const updateUser = async (req, res, next) => {
    
//     if(req.user.id !== req.params.id){
//         return res.status(401).send("You can only update your own account!")
//     }

//     try {
//         if(req.body.password){
//             req.body.password = bcryptjs.hashSync(req.body.password, 10);
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set:{
//                     username:req.body.username,
//                     email:req.body.email,
//                     password:req.body.password,
//                     avatar:req.body.avatar,
//                 },
//             },
//             {new: true}
//         );

//         const {password, ...rest} = updatedUser._doc;

//         res.status(200).json(rest);

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Internal server erro"
//         })
//     }
        
// };


// export const updateProfileController = async (req, res) => {
//     try {
//         const { username, email, password, avatar } = req.body
//         const user = await userModel.findById(req.user._id)
//         //password
//         if (password && password.length < 6) {
//             return res.json({ error: "Password is required and 6 charecter long" })
//         }
//         const hashedPassword = password ? await hashPassword(password) : undefined
//         const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
//             username: username || user.username,
//             password: hashedPassword || user.password,
//             avatar: avatar || user.avatar,
//             address: address || user.address

//         }, { new: true })
//         res.status(200).send({
//             success: true,
//             message: "Profile Updated Successfully",
//             updatedUser
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "something went wrong",
//             error,
//         })
//     }
// }