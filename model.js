import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    name:{
        type: String,
    },
    otp:{
        type: Number,
    },
})

export default mongoose.model('User', UserSchema)