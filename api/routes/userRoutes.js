import express from 'express'

const router = express.Router();


router.get('/test', (req, res) => {
    res.send("welcome to test page")
})





export default router;