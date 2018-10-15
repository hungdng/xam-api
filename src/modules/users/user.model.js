import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid ermail!',
    },
  },
  fullname: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken',
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  _authenticateUser(password) {
    return compareSync(password, this.password);
  },

  _createToken() {
    return jwt.sign({
      _id: this._id,
    },
    constants.JWT_SECRET
    );
  },

  toAuthJSON() {
    return {
      token: `${this._createToken()}`,
      ...this.toJSON(),
    };
  },

  toJSON() {
    return {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
    };
  },
};

export default mongoose.model('User', UserSchema);
