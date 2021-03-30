// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules

const multer =require("multer")
const axios = require("axios")
const morgan=require("morgan")
const scraper=require("./scraper")
const mocha=require("mocha")
const chai=require("chai")


var cors = require('cors')
const { albert_scraper } = require("./scraper")
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
  res.status(200).json({ok:true})
})


let email
let position
let number

app.post("/home_login", (req, res) => {
  email = req.body.email
  position = req.body.position
  number = req.body.number
  // const email = req.body.email
  // const position = req.body.position
  // const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.status(200).json({ok:true})
  //res.send("hello")
  console.log(email);
})

app.get("/home_login", (req, res) => {
  // const email = req.body.email
  // const position = req.body.position
  // const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.send("hi")
  res.status(200).json({ok:true})
})

app.get("/class_modules", (req,res, next) => {
  // use axios to make a request to an API for our class history data
  axios
    .get("https://my.api.mockaroo.com/search_history.json?key=7fa4d720")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
  res.status(200).json({ok:true})
})

const calcProbGetIn = (position, number) => {
  // console.log(position, number)
  // need another function to pull class size based on the class number
  // need another function or algorithm to calculate the probability
  return (100 - position) / 100 // this is a dummy return
}
app.get("/prof_scraper",(req,res)=>{
  scraper.prof_scraper();
  res.send("scraper site");
  res.status(200).json({ok:true})
})
app.get("/albert_scraper",(req,res)=>{
  scraper.albert_scraper();
  res.send("albert_scraper");
  res.status(200).json({ok:true})
  
})
app.get("/results", (req, res) => {
  // call some function that takes email, position, number that the user entered on the home page
  // this function returns the probability that the student gets into the class
  // console.log( calcProbGetIn(position, number) )
  const probGetIn = (calcProbGetIn(position, number) * 100).toString()
  // console.log( probGetIn )
  res.send(probGetIn) // we have to send a string here so we convert the probGetIn type to string above
  res.status(200).json({ok:true})
})


app.get("/class_info", (req,res, next) => {
  scraper.albert_scraper();
  // use axios to make a request to an API for our class info data
  axios
    .get("https://my.api.mockaroo.com/class_prof_info.json?key=01e62b90")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
    res.status(200).json({ok:true})
})

app.post("/login_logout", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.status(200).json({ok:true})
  console.log(email);
  res.status(200).json({ok:true})
})

app.get("/login_logout", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.send("hey there")
  res.status(200).json({ok:true})
})

app.get("/prof_info", (req,res, next) => {
    // use axios to make a request to an API for our class info data
    scraper.prof_scraper();
    axios
      .get("https://my.api.mockaroo.com/professor.json?key=2f789220")
      .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
      .catch(err => next(err)) // pass any errors to express

    res.status(200).json({ok:true})
}) 

module.exports = app