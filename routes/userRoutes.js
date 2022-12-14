const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

router.route('/auth/logout').post((req, res) => {
  res.clearCookie('id')
  res.status(200).json('cookie id cleared')
})

router.route('/register').post(userControllers.createNewUser)

router.route('/login').post(userControllers.loginUser)

router.route('/auth').get(userControllers.auth)

router.route('/:id').get(userControllers.getUserById)

module.exports = router
