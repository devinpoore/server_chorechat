// TODO: Generalize the error catch function and replace in all db calls - great note, now execute

const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const schedule = require("node-schedule");

const axios = require("axios");

const http = require("http");
// const https = require("https");

require("dotenv").config();

const twilioClient = require("twilio")(process.env.accountSid, process.env.authToken);

// twilioClient.verify.services.create({ friendlyName: "chorechat_verify" });

// const MessagingResponse = require("twilio").twiml.MessagingResponse;

const PORT = process.env.PORT || 5500;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./models");

// local mongo db connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chorechat_web";

// deployed mongo db connection
// TODO: Uncomment deployed mongo link

// TODO: for production, the mongoURI should always be an environment variable, never stored to the repo history
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://" + process.env.mongoUser + ":" + process.env.mongoPW + "@ds251158.mlab.com:51158/heroku_5npspkxg";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log("\nMongoose successfully connected to chorechat db\n");
}).catch(err => {
    console.log(err);
});
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

const register_validator = require("./validation/register_validator.js");

//
app.post("/register", (req, res) => {    
    
    // check received data
    console.log(req.body);    
    
    // validate recieved data
    const { errors, is_valid } = register_validator(req.body);
    // console.log(errors, is_valid);
    if (!is_valid) {
        console.log("errors with validation");
        res.status(400).json(errors);
    }
    
    // ensure an account doesn't already exist with the same username/email/phone
    db.chorechat_acct.findOne({ username: req.body.username }).then(user => {
        if (user) {
            console.log("username taken")
            res.status(400).json({ username: "This username is already in use" });
        } else {
            
            const new_account = {
                username: req.body.username,
                email: req.body.email,
                password: ""
            }
            
            // hash password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    new_account.password = hash;
                    
                    // store new account in db
                    db.chorechat_acct.create(new_account).then(account => {
                        // explicitly return 200 status here??
                        res.json(account);
                    }).catch(err => {
                        console.log(err);
                        res.end();
                    });
                });
            });

        }
    });
    
    // Why do these lines cause an error -
    // res.status(500).send("No action taken on registration route");
    // res.end();
});


//
app.post("/send_verification", (req, res) => {

    const { fName, lName, phone } = req.body;

    twilioClient.verify.services(process.env.serviceSid)
        .verifications
        .create({ to: `+1${phone}`, channel: "sms" })
        .then(verification => console.log(verification));

    res.end("route test ended");
});




//
http.createServer(app).listen(PORT, () => {
    console.log("\nServer listening on PORT " + PORT);
});


