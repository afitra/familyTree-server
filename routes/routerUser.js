const router = require('express').Router(),
    userController = require('../controller/userController')

router.get('/all', userController.all)
router.post('/register', userController.create)
router.post('/login', userController.login)
router.delete('/remove/:id', userController.remove)

// router.post('/login', userController.login)






module.exports = router