import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/orders', async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body; // Get the amount from the request body

    if (typeof amount !== 'number') {
      res.status(400).send('Invalid amount');
      return;
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (convert to paise)
      currency: 'INR',
      receipt: 'receipt_order_74394',
    };

    const order = await instance.orders.create(options);

    if (!order) {
      res.status(500).send('Some error occurred');
      return;
    }

    res.json(order);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message || 'Internal Server Error');
  }
});
router.post('/success', async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
      const crypto = require('crypto');
      const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET as string)
        .update(`${orderCreationId}|${razorpayPaymentId}`)
        .digest('hex');
  
      if (generatedSignature === razorpaySignature) {
        res.json({ msg: 'Payment Successful' });
      } else {
        res.status(400).json({ msg: 'Payment Verification Failed' });
      }
    } catch (error) {
      console.error('Payment success handling error:', error);
      res.status(500).send((error as Error).message || 'Internal Server Error');
    }
  });
  

export default router;
