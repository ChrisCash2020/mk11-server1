const express = require('express')
const User = require('../models/User')
const bcrpyt = require('bcryptjs')
exports.createNewUser = async (req, res, next) => {
  try {
    let { username, password } = req.body
    const hash = await bcrpyt.hash(password, 10)
    await User.saveUser(username, hash)
    const [newUser, _] = await User.findNewUser()
    req.session.user = { id: newUser[0].id, username: newUser[0].username }
    res.status(200).json(newUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}
exports.getUserById = async (req, res, next) => {
  let userid = req.params.id
  try {
    const [posts, _] = await User.findOneUser(userid)
    res.status(200).json({ ...posts })
  } catch (err) {
    console.log(err)
    next(err)
  }
  exports
}

exports.loginUser = async (req, res, next) => {
  let { username, password } = req.body
  let [user, _] = await User.checkUserCred(username)
  if (user.length == 1) {
    const hash = await bcrpyt.compare(password, user[0].password)
    if (hash) {
      req.session.user = { id: newUser[0].id, username: newUser[0].username }
      res.status(200).json({ id: user[0].id, username: user[0].username })
    }
  } else {
    res.status(200).json([])
  }
}
exports.auth = async (req, res, next) => {
  if (req.session.user) {
    res.send({ status: true, user: req.session.user })
  } else {
    res.send({ status: false, user: { id: '', username: '' } })
  }
}
