import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';

const endpointSecret = "whsec_31d45bf9d142da6c92e55fa21c9f7da5ec923b028e5bc77882ee2b075b28485d";

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

// fair-ardent-pardon-fiery
// confirm_auth?t=ZoGwZxCiJWEPYsslYyPOjlQTGGf70dj4
// account id acct_1KOtvLAN05eIhtIj

// Your webhook signing secret is whsec_31d45bf9d142da6c92e55fa21c9f7da5ec923b028e5bc77882ee2b075b28485d
