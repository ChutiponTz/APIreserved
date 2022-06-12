const Joi = require('joi')
const mongoose = require('mongoose')
const moment = require('moment')

const accountSchema = mongoose.Schema({
    authenId: String,  //for third party OAuth
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transaction'
        }
    ],
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
}, { collection: 'account' })

exports.accountSchema = mongoose.model('account', accountSchema)

exports.sch_register = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})