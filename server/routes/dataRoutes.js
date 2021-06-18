const router=require('express').Router()
const { protect } = require('../middleware/authMiddleware')
const {addData,getAllData,getData,deleteData,payment}=require('../controllers/dataController') 

router.route('/create-checkout-session').post(payment)

router.route('/').post(protect,addData)
router.route('/').get(protect,getAllData)
router.route('/:id').get(protect,getData)
router.route('/:id').delete(protect,deleteData)
module.exports=router