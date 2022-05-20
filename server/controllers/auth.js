import User from "../models/user";


// for register
export const register = async (req, res) => {
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
    try {
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

            console.log('GANERATED A TOKEN THEN SEND AS RESPONSE TO CLIENT');
        })
            
        
        
    } catch (error) {
        console.log("LOG IN ERROR", error);

        res.status(400).send("Singin failed")
    }
} 