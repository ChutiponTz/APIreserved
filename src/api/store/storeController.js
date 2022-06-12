const storeModel = require('./storeModel')
const accountModel = require('../account/accountModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')
const transactionModel = require('../transaction/transactionModel')

class storeController {
    async getDataStore(req, res) {
        try {
            const result = await storeModel.findStore();
            return success(res, 'ทำรายการสำเร็จ', { result });
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on getDataStore');
        }
    }

    async getDataStoreDetail(req, res) {
        try {
            const result = await storeModel.findStoreDetail(req.params.storeId);
            const dataHistory = await transactionModel.findStoreLeftQty(req.params.storeId);
            return success(res, 'ทำรายการสำเร็จ', { result , dataHistory });
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on getDataStoreDetail');
        }
    }

}

module.exports = new storeController()