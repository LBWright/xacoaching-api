import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      trim: true,
      unique: true,
      maxlength: 50
    },
    username: {
      type: String,
      required: [true, 'Username is a required field'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is a required field']
    },
    campus: {
      type: String,
      required: [true, 'Campus is a required field']
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

export const User = mongoose.model('user', userSchema)
