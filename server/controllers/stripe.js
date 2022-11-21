import queryString from 'query-string';
import Stripe from 'stripe';
import hotel from '../models/hotel';
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

// update delay days function
const updateDelayDays = async (accountId) =>{
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts:{
               schedule:{
                delay_days:7
               } 
            }
        }
    })

    return account;
}

export const getAccountStatus = async (req,res) => {
   // console.log("account status")

   const user = await User.findById(req.auth._id).exec();
   const account = await stripe.accounts.retrieve(user.stripe_account_id);

//    console.log("USER ACCOUNT RETRIVE ", account);

    // updated delay days
    const updatedAccount = await updateDelayDays(account.id);
    
    // updated user
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        stripe_seller:updatedAccount,        
    }, {
        new:true
    } ).select("-password").exec();

    // console.log(updatedUser);
    res.json(updatedUser);
} 


//getting the account balance
export const getAccountBalance = async (req, res) =>{
    const user = await User.findById(req.auth._id).exec();
    
    
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        })

        console.log("balance => " , balance);
        res.json(balance)
    } catch (error) {
        console.log(error);
    }
}

// payout settings
export const payoutSetting = async (req, res) =>{
    try {
        const user = await User.findById(req.auth._id).exec();

        const loginLink = await stripe.accounts.createLoginLink(user. stripe_account_id, {
            redirect_url:process.env.STRIPE_SETTING_REDIRECT_URL
        })

        console.log("login link for payout settign", loginLink);
        res.json(loginLink)
    } catch (error) {
        console.log("STRIPE PAYOUT SETTING ERR =>",error);
    }
}

// strip Session Id
export const stripSessionId = async (req, res) =>{

    //hotel id
    const {hotelId} = req.body

    //find hotel based on hotelid
    const item = await hotel.findById(hotelId).select('-image.data').populate("postedBy").exec();

    //20% charge as app fee 
    const fee = (item.price * 20)/100

    //create session     
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        //purchase details
        line_items:[
            {
                name:item.title,
                amount:item.price * 100,
                currency:'bdt',
                quantity:1
            }
        ],
        //payment intent and 80% charge
        payment_intent_data:{
            application_fee_amount:fee * 100,            
            transfer_data:{
                destination:item.postedBy.stripe_account_id
            }
        },
        success_url:process.env.STRIPE_SUCCESS_URL,
        cancel_url:process.env.STRIPE_CANCEL_URL
    })

    await User.findByIdAndUpdate(req.auth._id,{stripeSession:session}).exec();

    res.send({
        sessionId:session.id
    })
}


    // add session in db 
    //send session id to frontend    