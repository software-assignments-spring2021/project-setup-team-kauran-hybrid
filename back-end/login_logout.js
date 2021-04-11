const express = require("express");
const router = express.Router();
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const whModels = require("./mongo/wh_models.js")

const User = whModels.userAccounts;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
//require("dotenv").config({ silent: true }); // save private data in .env file

const { ExtractJwt } = require("passport-jwt");

dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// user and pwd
const user = process.env.mongoUSER;
const pwd = process.env.mongoPWD;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); next();
});

const enterTheID = (details) => {
  const acceptable_input = /^[0-9_$a-z]+/;
  if ((details.match(acceptable_input))) {
    if (details != null) {
      return true;
    }
  } else {
    return false;
  }
};

const loginSuccessChecker = (username, pwd) => {
  if (username != null && pwd != null) {
    if (typeof username != undefined && typeof pwd != undefined) {
      return true;
    }
  } else {
    return false;
  }
};

/*

router.post("/", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.status(200).json({ok:true})
  console.log(email);
  //res.status(200).json({ok:true})
})

router.get("/", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.send("hey there")
  //res.status(200).json({ok:true})
})

*/

passport.use( new JwtStrategy( { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "temporary_secret"
},
  async (payload, done) => {
    User.findById(payload.sub, (err, user) => {
      if (err) {
        done(err, false)
      } else {
        if (!user) {
          return done(null, false)
        }
        done(null, user)
      }
      })
    }
    )
)

passport.use('signin', new LocalStrategy({ passReqToCallback: true},(req, username, password, done) => {
      User.findOne({ username: username}, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (!user) {
          req.passportErrorMessage = "Please check your Username"
          return done(null, false)
        }
        if (!user.validPassword(password)) {
          req.passportErrorMessage = "Please check your password"
          return done(null, false)
        }
        return done(null, false)
      })
    }
  )
)

const signToken = (user) =>{
  JWT.sign(
    {
      iss: "Login",
      sub: user.id,
      iat: Date.now(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    "temporary_secret"
  )
}

router.use((req, res, next) => {
  if (req.passportErrorMessage) {
    res.passportErrorMessage = req.passportErrorMessage
  }
  next()
})

router.get('/', passport.authenticate('jwt', {session : false}), (req, res) => {
  const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
  mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
  res.json({user: req.user})
  mongoose.disconnect()
})

router.post('/', passport.authenticate('signin', {session : false}), (req, res) => {
  const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
  mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
  res.json({token: signToken(req.user)})
  mongoose.disconnect()
})

module.exports = {
  router:router,
  enterTheID:enterTheID,
  loginSuccessChecker:loginSuccessChecker,
};