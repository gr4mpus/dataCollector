const express = require('express');
const router = express.Router();

//db model
const ParticleModel = require('../db/model');

router.get('/data',(r,s)=>{
    ParticleModel.find()
        .exec()
        .then(product =>{
            console.log("GET CALLED")
            s.json(product)
        })
        .catch(err => s.send(err.message));

})

router.post('/data',(r,s)=>{
    console.log("POST CALLED");
    console.log(r.body.body);
    for(let counter in r.body.body){
        console.log("COUNTER", counter);
        console.log("ID",r.body.body[counter].id);
        const particleModel = new ParticleModel({
            city_id: r.body.body[counter].id,
            country: r.body.body[counter].country,
            city: r.body.body[counter].city,
            station: r.body.body[counter].station,
            last_update: r.body.body[counter].last_update,
            pollutant_id: r.body.body[counter].pollutant_id,
            pollutant_min: r.body.body[counter].pollutant_min,
            pollutant_max: r.body.body[counter].pollutant_max,
            pollutant_avg: r.body.body[counter].pollutant_avg,
            pollutant_unit: r.body.body[counter].pollutant_unit
        });
        particleModel.save()
            .then(result =>{console.log(result)})
            .catch(err => console.log(err.message));
    }
    // console.log("COUNTRY",r.body.body.country);




    s.json({
        message:"POST REQ",
        createdProduct: "SUCCESSFULL"
    })
});

module.exports = router;
console.log("Data Fetching Ends");
