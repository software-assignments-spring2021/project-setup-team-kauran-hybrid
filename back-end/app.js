// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules
app.get("/", (req, res) => {
    res.send("Hello!")
  })
  
module.exports = app