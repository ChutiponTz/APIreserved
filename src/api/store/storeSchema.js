const Joi = require('joi')
const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    storeName: String,
    maxQty: Number,
    closeStore: String,
    openStore: String,
    type: String,
    reservedTime : String,
    createdDate: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    updatedDate: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    picUrl:[String]
}, { collection: 'store' })

exports.storeSchema = mongoose.model('store', storeSchema)