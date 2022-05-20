import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const {Schema} = mongoose;

// for registration user
const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required: 'Name is required'
    },

    email:{
        type:String,
        trim:true,
        required:'Email is required',
        unique:true
    },

    password:{
        type:String,
        required:true,
        min:6,
        max:64
    },

    stripe_account_id: '',
    stripe_seller:{},
    stripeSession:{}
},
    { timestamps:true}
)




// while saving user, make sure password is hashed, not plain text
//hashing function should run only in 2 case, 1create 2updated

userSchema.pre('save', function(next){
    let user = this;


    // checking ceases
    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function (err, hash){
            if(err){
                console.log("bcrypt hashing error: ", err);
            }

            user.password = hash;    // user password become now hash password

            return next();
        })
    } else {
        return next();  // if its not modified we dont need to hash again
    }

})

// ---> registation end here


// for log in user

// comparing input password with saved password
userSchema.methods.comparePassword = function (password, next){  // next is a callback fn

    bcrypt.compare(password, this.password, function (err, match){
        if(err){
            console.log("COMPARE PASSWORD ERROR: ",err);
            return next(err, false)
        }
        // if no err, we get null
        console.log("MATHC PASSWORD", match);
        return next(null, match); // match will return true 
    })
}

// ---> log in end here


export default mongoose.model("User", userSchema);