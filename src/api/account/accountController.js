const accountModel = require('./accountModel')
const transactionModel = require('../transaction/transactionModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')
const { encrypted, decrypted, generateToken } = require('../../functions')

class accountController {
    async register(req, res) {
        try {
            const { userName, password, firstName, lastName, email } = req.body
            const checkUser = await accountModel.findOneAccount({ userName: userName })
            const passwordEncrypted = await encrypted(password)
            if (checkUser.completed && !checkUser.account) {
                const { result } = await accountModel.registerUser({ userName, password: passwordEncrypted, firstName, lastName, email })
                generateToken(req, result._id)
                return success(res, 'สมัครสมาชิกสำเร็จ', { account: result, tokenId: req.token })
            } else {
                return failed(res, 'มีผู้ใช้ username นี้ในระบบแล้ว')
            }
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async login(req, res) {

        const { userName, password } = req.body
        try {
            const checkUser = await accountModel.findOneAccount({ userName })
            if (checkUser.completed && !!checkUser.account) {
                const comparePassword = await decrypted(checkUser.account.password, password)
                if (!comparePassword) {
                    return failed(res, 'username หรือ password ไม่ถูกต้อง')
                }
                generateToken(req, checkUser.account._id)
                return success(res, "เข้าสู่ระบบเรียบร้อย", { user: checkUser.account, tokenId: req.token })
            } else {
                return failed(res, 'username หรือ password ไม่ถูกต้อง')
            }
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }

    }

    async getInfo(req, res) {
        try {
            const accountId = req.accountId ;
            const { account } = await accountModel.findOneAccount({ _id: accountId });
            
            //const balance = (await transactionModel.getLastestTransaction(req.accountId)).currentAmount
            return success(res, "ดึงข้อมูลผู้ใช้สำเร็จ", { account })
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async getCheckAccount(req, res) {
        try {
            const { refAccount } = req.body
            let account
            if (refAccount.length == 24) {
                account = (await accountModel.findOneAccount({ _id: refAccount })).account
            } else {
                account = (await accountModel.findOneAccount({ username: refAccount })).account
            }
            if (!account) {
                return failed(res, 'username หรือ เลขบัญชีผู้รับไม่ถูกต้อง')
            }
            return success(res, "ดึงข้อมูลผู้ใช้สำเร็จ", { account: account ? account : accountUsername })
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async logout(req, res) {
        try {

        } catch (error) {

        }
    }
}

module.exports = new accountController()