  const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Signup.html");
});

app.post("/", function (req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {email_address : email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  }

  var jsonData = JSON.stringify(data)
console.log(firstName, lastName, email);


var options = {
  url: "https://us3.api.mailchimp.com/3.0/lists/ee02f9503c",
  method: "POST",
  headers: {
    "Authorization": "darlkreative fc083eb9d3e88dfaa7c23392ac4353c1-us3"
  },
  body: jsonData
};

request(options, function (error, response, body) {
  if (error) {
  res.sendFile(__dirname + "/failure.html");
  }
  else {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
      else {
      res.sendFile(__dirname + "/failure.html");
      }
    }
  }
);
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Server is running on port 3000!");
});
