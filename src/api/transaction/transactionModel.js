const { transactionSchema } = require('./transactionSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId
const dayjs = require('dayjs')

class transactionModel {
    async insertTransaction(obj) {
        try {
            const transaction = await transactionSchema.create(obj)
            return transaction
        } catch (error) {
            console.log(error)
            return { completed: false }
        }
    }

    async getLastRecord(storeId, reservedTime){
        try {
            const lastestTransaction = await transactionSchema.findOne({ storeId: ObjectId(storeId) , reservedTime: reservedTime , 
                                                                          reservedDate: dayjs().format('YYYY-MM-DD') }).sort({ _id: -1 })
            return lastestTransaction ;
        } catch (error) {
            console.error(error);
            return { completed: false }
        }
    }

    async findStoreLeftQty(storeId){
        try {
            const pipeline = [
                {
                  '$match': {
                    'storeId': ObjectId(storeId),
                    'reservedDate': dayjs().format('YYYY-MM-DD').toString()
                  }
                }, {
                  '$group': {
                    '_id': '$reservedTime', 
                    'currentQty': {
                      '$last': '$currentQty'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'reservedTime': '$_id', 
                    'currentQty': 1
                  }
                }
              ]

            const getData = await transactionSchema.aggregate(pipeline);
            return getData ; 

        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = new transactionModel()