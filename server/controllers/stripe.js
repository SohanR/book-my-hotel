import Stripe from 'stripe';
import User from '../models/user';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) =>{
    // console.log("REQ USER FROM REQUIRE_SINGIN MIDDLEWARE",  req.auth); //  we can get headers by req.headers
    // console.log("you hit create connect account endpoind");


    // 1. find user from db

    const user = await User.findById(req.auth._id).exec();
    console.log("USER ==> ", user);
    // console.log("STRIPE ",stripe);

    // 2. if user dont have stripe_account_id yet, create now

    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type:"express",
        });

        //console.log("STRIPE ACCOUNT ", account);

        user.stripe_account_id = account.id;

        user.save();
    }



    // 3. create account link based on account id( for frontend to complete onboarding)
    // 4. update payment schedule (optional, default is 2 days)
} 