const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const request = require('request');
const PORT = process.env.PORT || 8465
const router = require('./routes/ap');
app.use(express.urlencoded({limit:'500mb',extended:true, parameterLimit:50000}));
app.use(bodyParser.json({limit:'500mb'}));

app.use('/api',router);

mongoose.connect('mongodb+srv://<user>:<password>@air-particles-mvp7h.mongodb.net/test?retryWrites=true')

setInterval(()=>{
    new Promise(function(resolve){
        request.get(
            'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=<API-KEY>&format=json&offset=0&limit=750',
            (err,response,body)=>{
                if(err){
                    console.log(err.message);
                }else{
                    let newBody = JSON.parse(body);
                    newBody= (newBody.records);
                    resolve(newBody);

                }
            }
        )
    }).then((data)=>{
        console.log("Inside then",data);
        request.post(
            'http://localhost:8465/api/data',
            {json:{body:data}},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                  else {
                    console.log("Error");
                  }
                }
            }
        )
    })
},1000*60*60*12

)

console.log("Finished");
app.listen(PORT,()=>{
    console.log("Started");
});
