import User from "../models/user";

export const register = async (req, res) => {
    console.log(req.body);


    // saving user data in database
    const {name, email, password} = req.body;

    //validation
    if(!name) return res.status(400).send("Name is required")
    if(!password || password.length < 6) return res.status(400).send("Password is required or it should be minimum 6 characters long")

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