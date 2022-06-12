const transactionModel = require('./transactionModel')
const storeModal = require('../store/storeModel')
const accountModel = require('../account/accountModel')
const mongoose = require('mongoose')
const { debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')

class transactionController {
    async reserved(req, res) {
        try {
            const checkCurrentReservedHour = await transactionModel.getLastRecord(req.body.storeId, req.body.reservedTime);
            const { account } = await accountModel.findOneAccount({ _id: req.body.userId })
            console.log(account);
            if(!checkCurrentReservedHour) {
                //get data maxQty from table store
                const getDataMaxQty = await storeModal.findStoreMaxQty(req.body.storeId);
                console.log(" Initil. QTY ", getDataMaxQty.maxQty.toString());
                //ลบค่า current กับ request ที่เข้ามา
                req.body.currentQty = getDataMaxQty.maxQty - req.body.reservedQty ;
                //insert
                if(req.body.currentQty > 0){
                   const transaction = await transactionModel.insertTransaction(req.body);
                   account.transactions.push(transaction._id);
                   await account.save();

                   return success(res, 'ทำการจองสำเร็จ');
                } else {
                    return failed(res, 'คุณไม่สามารถจองได้');
                }
            } else {
                //Update
                console.log(" Current QTY AT ", checkCurrentReservedHour.reservedTime , " have ", checkCurrentReservedHour.currentQty.toString());
                //set New Current to transaction
                req.body.currentQty = checkCurrentReservedHour.currentQty - req.body.reservedQty ;
                if(req.body.currentQty >= 0){
                   const transaction = await transactionModel.insertTransaction(req.body);
                   account.transactions.push(transaction._id);
                   await account.save();

                    return success(res, 'ทำการจองสำเร็จ');
                } else {
                    return failed(res, 'คุณไม่สามารถจองได้');
                }
            }
            
            
        } catch (error) {
            debug(error)
            return failed(res, 'found issue on reserved');
        }
    }
}

module.exports = new transactionController()