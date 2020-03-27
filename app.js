const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const server = express();

server.use("/assets/css", express.static(__dirname + "/assets/css"));
server.use("/assets/images", express.static(__dirname + "/assets/images"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index");
  console.log("loaded index page");
});

server.get("/thankyou", (req, res) => {
  res.render("page2");
  console.log("Thank you!");
});

server.post("/submit", (req, res) => {
  fname = req.body.fname;
  lname = req.body.lname;
  city = req.body.city;
  district = req.body.district;
  state = req.body.state;
  pin = req.body.pin;
  if (req.body.Fever) {
    fever = "YES";
  } else {
    fever = "NO";
  }
  if (req.body.Cough) {
    cough = "YES";
  } else {
    cough = "NO";
  }
  if (req.body.Breath) {
    breath = "YES";
  } else {
    breath = "NO";
  }
  if (req.body.Aches) {
    aches = "YES";
  } else {
    aches = "NO";
  }
  if (req.body.Sore) {
    sore = "YES";
  } else {
    sore = "NO";
  }
  if (req.body.Tastelessness) {
    tastelessness = "YES";
  } else {
    tastelessness = "NO";
  }
  if (req.body.Tiredness) {
    tiredness = "YES";
  } else {
    tiredness = "NO";
  }
  if (req.body.Corona) {
    corona = "YES";
  } else {
    corona = "NO";
  }

  //sending mail to change password
  smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "visitthestars0010@gmail.com",
      pass: "pass@882836"
    }
  });

  let msg = {
    to: "hfh6775@gmail.com",
    from: "Corona Help-Line <visitthestars0010@gmail.com>",
    subject: `Report - ${fname}`,
    text: `Hey ,

    User : ${fname} ${lname},
    City: ${city},
    District: ${district},
    State: ${state},
    PIN: ${pin},
    Symptoms : 
            Fever: ${fever}
            Cough: ${cough}
            Shortness of breath:  ${breath}
            Aches and Pain: ${aches}
            Sore Throat: ${sore}
            Tastelessness: ${tastelessness} 
            Tiredness: ${tiredness}
            Have been to corona infected places: ${corona}.
    Regards,
    Tech Team`
  };

  smtpTransport.sendMail(msg, err => {
    if (err) return console.log(err);
    console.log("Mail sent for " + fname + ".");
    return res.redirect("/thankyou");
  });
});


const port = process.env.port | 8000
server.listen(port, () => {
    console.log("Server running at port "+port);
});

