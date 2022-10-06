import fs from "fs";
import Hotel from "../models/hotel";

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