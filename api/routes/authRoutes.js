import express from 'express'
import { deleteUserController, editUserData, getUser, getUserListings, google, signInController, signUpController } from '../controllers/authController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/signin', signInController);

router.post('/signup', signUpController);
router.post('/google', google);

router.post('/update/:id', requireSignIn, editUserData);

router.delete('/delete/:id', deleteUserController);
router.get('/listings/:id',  getUserListings);
router.get('/:id',  getUser);


export default router;