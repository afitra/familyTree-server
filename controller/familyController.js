const Model = require('../models/family')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt'),
    whiteSpace = require('../helper/whiteSpace')


const axios = require('axios')

class Controller {
    static create(req, res) {
        console.log(req.body);

        Model.create({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            familyCode: req.body.familyCode,
            password: req.body.password1,
            role: req.body.role
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
        // console.log(req.body.email, req.body.password)
        Model.findOne({
            email: req.body.email
        })
            .then(function (user) {
                console.log(user, 'okokok')
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
                    console.log(user)
                    res.status(200).json({
                        token,
                        role: user.role
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
                res.status(200).json(data)
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