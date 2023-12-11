import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true }
});

// Custom password validation
UserSchema.path('password').validate(function (password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}, 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.');

export default mongoose.model('User', UserSchema);