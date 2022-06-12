const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const transactionController = require('./transactionController')

const transactionRouter = Router()

transactionRouter.post('/reserved',
    //validate_token(),
    transactionController.reserved
)

module.exports = transactionRouter