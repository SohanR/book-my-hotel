import fs from "fs";
import Hotel from "../models/hotel";

// for creating hotels
export const create = async (req,res) =>{
    // console.log("Hotel create field", req.fields);
    // console.log("Hotel create file", req.files);


    try {
        
        let fields = req.fields
        let files = req.files

        let hotel = new Hotel(fields)

        // handle image
        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path)
            hotel.image.contentType = files.image.type
        } 

        hotel.save((err, results) =>{
            if(err){
                console.log("saving hotel err => ", err);

                res.status(400).send("Hotel saving Error")
            }

            res.json(results)


        } )




    } catch(err){
        console.log(err);

        res.status(400).json({
            err:err.message
        })
    }

}


// for getting hotels

export const hotels = async (req, res) =>{
    let all = await Hotel.find({})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
    
    console.log(all);
    res.json(all);
    
}