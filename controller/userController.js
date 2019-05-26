const Model = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt'),
    whiteSpace = require('../helper/whiteSpace')


const axios = require('axios')

class Controller {
    static create(req, res) {
        console.log(req.body);
        Model.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            family: req.body.family,
            familyCode: req.body.familyCode,
            gender: req.body.gender,
            birthDay: req.body.birthDay,
            phone: req.body.phone,
            password: req.body.password1,
            // tag: whiteSpace(req.body.tag)
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }


    static login(req, res) {
        Model.findOne({
            email: req.body.email
        })
            .then(function (user) {
                // console.log('masok login');

                let validasi = bcrypt.compareSync(req.body.password, user.password);
                if (validasi == false) {
                    res.status(400).json({
                        message: 'Wrong Email/Password'
                    })
                } else {
                    let token = jwt.sign({
                        email: user.email
                    })
                    res.status(200).json({
                        token,
                        role: 'User'
                    })
                }

            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })

    }
    static all(req, res) {
        Model.find({})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
    static remove(req, res) {
        console.log('okokokoko');

        Model.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }

}

module.exports = Controller