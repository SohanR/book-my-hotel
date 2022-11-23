import fs from "fs";
import Hotel from "../models/hotel";
import order from "../models/order";

// for creating hotels
export const create = async (req,res) =>{
    // console.log("Hotel create field", req.fields);
    // console.log("Hotel create file", req.files);


    try {
        
        let fields = req.fields
        let files = req.files

        let hotel = new Hotel(fields)
        hotel.postedBy = req.auth._id;

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
    let all = await Hotel.find({from:{$gte: new Date()}})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
    
    console.log(all);
    res.json(all);
    
}

//for getting hotel image
export const image = async (req, res) =>{
    let hotel = await Hotel.findById(req.params.hotelId).exec();

    if(hotel && hotel.image && hotel.image.data !== null){
        res.set("Content-Type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}


// for getting seller hotels data
export const sellerHotels = async (req, res) =>{
    let all = await Hotel.find({postedBy:req.auth._id})
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();

    res.send(all);
}


// remove hotel from database
export const remove = async (req, res) =>{
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();

    res.json(removed);
}

// for getting single hotel data
export const read = async (req, res) =>{
    let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();

    console.log("single hotel data = ", hotel);

    res.json(hotel);
}

// for update hotel data
export const update = async (req, res) =>{
    try {
        let fields = req.fields;
        let files = req.files;

        let data = {...fields}

        //if image available
        if (files.image){
            let image = {};

            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type

            data.image = image;
        }

        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
            new:true
        }).select("-image.data");

        res.json(updated)


    } catch (error) {
         console.log(error);

        res.status(400).send("Hotel update failed, try again.")
    }    
}


// get user hotel bookings
export const userHotelBookings = async (req, res) => {
    const all = await order.find({orderedBy: req.auth._id})
    .select('session')
    .populate('hotel', '-image.data')
    .populate('orderedBy','_id name')
    .exec()

    res.json(all);
}

//already booked
export const isAlreadyBooked = async (req, res) => {
    const {hotelId} = req.params

    //find order of the current loggend in user
    const userOrders = await order.find({orderedBy: req.auth._id})
    .select('hotel').exec();

    // check if hotel id is found in user order array
    let ids = []

    for(let i = 0; i < userOrders.length; i++){
        ids.push(userOrders[i].hotel.toString())
    }

    res.json({
        ok:ids.includes(hotelId)
    })
}