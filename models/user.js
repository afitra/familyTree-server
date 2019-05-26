var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash')
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function (val) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(val).toLowerCase());
            },
            message: `Email invalid format`
        },
        {
            validator: function (val) {
                return User.findOne({
                    email: val,
                    _id: {
                        $ne: this._id
                    }
                })
                    .then(data => {
                        if (data) {
                            throw err;
                        }
                    })
                    .catch(err => {
                        throw err;
                    });
            },
            message: `email is already axist, please  gunakan email lain`
        }
        ]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    familyCode: {
        type: String,
        required: true
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    birthDay: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    tag: {
        type: [String],
        // required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, ' minimal password 6 character'],
        maxlength: [12, ' maximal password 12 character']
    },
});

// userSchema.path('password').validate(function (code) {
//     return code && code.length === 2;
// }, 'Location code must be 2 characters');
userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})

let User = mongoose.model('Users', userSchema)


module.exports = User