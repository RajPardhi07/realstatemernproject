import express from 'express'
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listingController.js';

const router = express.Router();


router.post('/create', createListing);
router.delete('/deletelisting/:id', deleteListing);
router.post('/updateListing/:id', updateListing);
router.get('/get/:id', getListing);

export default router;