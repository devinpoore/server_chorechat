// TODO: Generalize the error catch function and replace in all db calls - great note, now execute

const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
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

// const db = require("./models");

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


