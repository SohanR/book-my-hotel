import jwt from 'jsonwebtoken';
import User from "../models/user";


// for register
export const register = async (req, res) => {

    try {

        console.log(req.body);


        // saving user data in database
        const {name, email, password} = req.body;
    
        //validation
        if(!name) return res.status(400).send("Name is required")
        if(!password) return res.status(400).send("Password is required")
        if(password.length < 6) return res.status(400).send("Password should be minimum 6 characters long")
    
        // cant save 2 user with same email
        let userExist = await User.findOne({email}).exec()
    
        if(userExist) return res.status(400).send("Email is Taken")
    
        // create registered user
        const user = new User(req.body)
    
        // now save data 

        await user.save()
        console.log("User Created: ", user);
        return res.json({ok:true})
    } catch (error) {
        console.log("Create user faild: ", error);
        return res.status(400).send("Error, try again")
    }



}

// for login 

export const login = async(req, res) =>{
    console.log(req.body);

    const {email, password} = req.body;


    try {
        // check if user with that email exist
        let user = await User.findOne({email}).exec();
        console.log('USER EXIST: ', user);

        // if no user
        if(!user){
         res.status(400).send("User not found, Please register for log in")        
        }

        // compare password
        user.comparePassword(password, (err, match) =>{
            console.log('COMPARE PASSWORD IN LOG IN ERR: ',err);

            if(!match || err) return res.status(400).send("Incorrect password")

            
            // generate a token then send as response to client
            let token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
                expiresIn:"7d"
            });

            res.json({token, user:{
                _id:user._id,
                name:user.name,
                email: user.email,
                createdAt:user.createdAt,
                updatedAt: user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,    
                stripeSession:user.stripeSession
            }})


        })
            
        
        
    } catch (error) {
        console.log("LOG IN ERROR", error);

        res.status(400).send("Singin failed")
    }
} 