const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config"); // to store confidential data like api key or mongo uri etc. 
const User = require("./model/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

const database = config.get("mongoUri"); //importing database

mongoose.connect(database, {useNewUrlParser: true, // for avoiding deprecation warnings 
                            useUnifiedTopology: true, 
                            useCreateIndex: true, 
                            useFindAndModify: false}, (err) => {

                                if(err)
                                    console.log(err);
                                else
                                    console.log("Connection to the database established...");

                            }); // returns a promise

        
// Create and read are present

//Create

// const newUser = new User({

//     name: "Chayan Sengupta",
//     age: 20,
//     data: {
//         username: "Chayan199916",
//         organization: "St. Xavier's College",
//         friends:["Manjistha", "Reshav"],
//         location: {
//             city: "Kolkata",
//             state: "West Bengal",
//             country: "India"
//         }
//     }

// });

// newUser.save((err, self) => {

//     if(err){

//         console.log("Saving failed...");
//         console.log(err);

//     }else{

//         console.log("Saving successfully done...");
//         console.log(self);

//     }

// });

// Read

// Self.find({}, (err, selves) => {

//     if(err)
//         console.log(err);
//     else
//         console.log(selves);

// });

// Self.find({}, (err, selves) => {

//     if(err)
//         console.log(err);
//     else
//         console.log(selves.sort());

// });

// Creating Server

// routes

app.get("/api/users", (req, res) => {

    User.find({}, (err, users) => {

        if(err)
            res.status(404).json({success: false, message: "no data found"});
        else
            res.status(200).json({success: true, message: "data found", data: users});
    
    });

});

app.post("/api/users", (req, res) => {

    const newUser = new User({

        name: req.body.name,
        age: req.body.age,
        data: {
            username: req.body.data.username,
            joinDate: req.body.data.joinDate,
            organization: req.body.data.organization,
            friends: req.body.data.friends,
            location: {
                city: req.body.data.location.city,
                state: req.body.data.location.state,
                country: req.body.data.location.country
            }
        }

    });

    newUser.save((err, user) => {

        if(err){

            res.status(404).json({success: false, message: "saving failed"})
    
        }else{

            res.status(200).json({success: true, message: "saving successfully done", data: user});
    
        }
    
    });

});

app.get("/api/users/:_id", (req, res) => {

    User.find({_id: req.params._id}, (err, user) => {

        if(err)
            res.status(404).json({success: false, message: `${req.params._id}'s data not found`})
        else
            res.status(200).json({success: true, message: `${req.params._id}'s data received`, data: user});
    
    });

});

app.put("/api/users/:_id", (req, res) => {

    User.findByIdAndUpdate(req.params._id, 
                            req.body, 
                            (err, data) => {

                                if(err){
                                    res.status(404).json({success: false, message: `${req.params._id}'s data updating failed`});
                                }
                                else
                                    res.status(200);
                                    res.json({success: true, message: `${req.params._id}'s data updating successfully done`, data: data});
                            });

                        });

app.delete("/api/users/:_id", (req, res) => {

    User.findOneAndDelete({_id: req.params._id}, 
                            (err, deletedUser) => {

                                if(err){
                                    res.status(404).json({success: false, message: `${req.params._id}'s data deleting failed`});
                                }
                                else
                                    res.status(200).json({success: true, message: `${req.params._id}'s data deleting successfully done`, data: deletedUser});
                            });

                        });

// listening to port

app.listen(port, () => {

    console.log(`Server started at http://127.0.0.1:${port}/api/users`);

});