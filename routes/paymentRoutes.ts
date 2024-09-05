import express from 'express';
import { makeOrder, validatePayment } from '../controllers/paymentController';

const router = express.Router()

router.route('/order').post(makeOrder);
router.route('/validate').get(validatePayment);


export default router;