import mongoose from'mongoose'


const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected Successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB