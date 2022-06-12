const Joi = require('joi')
const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    },
    reservedQty: Number,
    currentQty: Number,
    type: String,
    reservedTime : String,
    reservedDate : String,
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
}, { collection: 'transaction' })

exports.transactionSchema = mongoose.model('transaction', transactionSchema)