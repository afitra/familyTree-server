var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash')
var familySchema = new Schema({
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
                return Family.findOne({
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
            message: `eamil is already axist, please  gunakan email lain`
        }
        ]
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    familyCode: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['Family', 'Organization'], required: true },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, ' minimal password 6 character'],
        maxlength: [12, ' maximal password 12 character']
    },
});

familySchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})

let Family = mongoose.model('Familys', familySchema)


module.exports = Family