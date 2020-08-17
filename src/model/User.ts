import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: Number.MAX_SAFE_INTEGER
  },
}, {timestamps: true});

export default Mongoose.model('User', userSchema);
