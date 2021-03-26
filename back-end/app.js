// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules

const multer =require("multer")
const axios = require("axios")
const morgan=require("morgan")


var cors = require('cors')
app.use(cors())
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))


app.get("/", (req, res) => {
    res.send("bye!")
})
app.get("/html-example", (req, res) => {
  res.sendFile("/public/some-page.html", { root: __dirname })
})

// route for HTTP GET requests to /json-example
app.get("/json-example", (req, res) => {
  // assemble an object with the data we want to send
  const body = {
    title: "Hello!",
    heading: "Hello!",
    message: "Welcome to this JSON document, served up by Express",
    //imagePath: "/static/images/donkey.jpg",
  }

  // send the response as JSON to the client
  res.json(body)
})
app.post("/home_login", (req, res) => {
  const email = req.body.email
  const position = req.body.your_position
  const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.status(200).json({ok:true})
  //res.send("hello")
  console.log(email);
})

app.get("/home_login", (req, res) => {
  const email = req.body.email
  const position = req.body.your_position
  const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.send("hi")
})

app.get("/class_modules", (req,res, next) => {
  // use axios to make a request to an API for our class history data
  axios
    .get("https://my.api.mockaroo.com/search_history.json?key=7fa4d720")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})


  
module.exports = app