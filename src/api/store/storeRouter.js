const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const storeController = require('./storeController')

const storeRouter = Router()

storeRouter.get('/getStore',
    //validate_token(),
    storeController.getDataStore
)

storeRouter.get('/getStore/:storeId',
    //validate_token(),
    storeController.getDataStoreDetail
)

module.exports = storeRouter