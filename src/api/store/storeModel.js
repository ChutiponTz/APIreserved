const { storeSchema } = require('./storeSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId

class storeModel {
    async findStore(){
        try {
            const getData = await storeSchema.find();
            return getData ;
        } catch (error) {
            console.error(error);
            return { completed: false }
        }
    }

    async findStoreDetail(storeId){
        try {
            const getData = await storeSchema.findById(ObjectId(storeId));
            return getData ;
        } catch (error) {
            console.error(error);
            return { completed: false }
        }
    }

    async findStoreMaxQty(storeId){
        try {
            const getData = await storeSchema.findById(ObjectId(storeId));
            return getData ;
        } catch (error) {
            console.error(error);
            return { completed: false }
        }
    }

    

}

module.exports = new storeModel()