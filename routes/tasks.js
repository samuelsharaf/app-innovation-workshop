const express = require('express')
const router = express.Router()
const knex = require('../db')
const sendgrid = require('../lib/sendgrid')

router.get('/', async (req, res, next) => {
  res.render('index')
})

module.exports = router
