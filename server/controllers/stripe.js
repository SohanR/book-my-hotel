import queryString from 'query-string';
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


    // 3. create login link based on account id( for frontend to complete onboarding)

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url:process.env.STRIPE_REDIRECT,
        return_url:process.env.STRIPE_REDIRECT,
        type:'account_onboarding'
    })

    // prefill email

    accountLink = Object.assign(accountLink, {
        "stipe_user[email]":user.email || undefined
    })

   // console.log("ACCOUNT LINK ", accountLink);

   let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;

   res.send(link)
    // 4. update payment schedule (optional, default is 2 days)
} 


export const getAccountStatus = async (req,res) => {
   // console.log("account status")

   const user = await User.findById(req.auth._id).exec();
   const account = await stripe.accounts.retrieve(user.stripe_account_id);

//    console.log("USER ACCOUNT RETRIVE ", account);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        stripe_seller:account,        
    }, {
        new:true
    } ).select("-password").exec();

    // console.log(updatedUser);
    res.json(updatedUser);
} 