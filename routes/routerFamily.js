const router = require('express').Router(),
    familyController = require('../controller/familyController')

router.get('/all', familyController.all)
router.post('/register', familyController.create)
router.delete('/remove/:id', familyController.remove)
router.post('/login', familyController.login)






module.exports = router