const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
//const session=require('express-session');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const whModels = require("./mongo/wh_models.js")
//const userAccounts = whModels.userAccounts;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const create_key = require('./create_key.js');
const mongo = require("./mongo/mongo.js");
const { restart } = require("nodemon");
const { time } = require("console");
//dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// user and pwd
const mongoUser = process.env.mongoUSER;
const mongoPwd = process.env.mongoPWD;

const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
//const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
const PRIV_KEY=fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
// // Stores a Buffer object
// const encryptedMessage = create_key.encryptWithPublicKey(PUB_KEY, 'Super secret message');
// // If you try and "crack the code", you will just get gibberish
// console.log(encryptedMessage.toString());

// const decryptedMessage = create_key.decryptWithPrivateKey(PRIV_KEY, encryptedMessage);
// // Convert the Buffer to a string and print the message!
// console.log(decryptedMessage.toString());

const payloadObj = {
  sub: "sp1",
  userName:"sp",
  iat: Date.now()
}

const signedJWT = jwt.sign(payloadObj, PRIV_KEY);//, { algorithm: 'RS256'});

//console.log(signedJWT);

// Verify the token we just signed using the public key.  Also validates our algorithm RS256 
jwt.verify(signedJWT, PRIV_KEY, (err, payload) => {
    
  if(err) throw err;
  
  // Both should be the same
  //console.log(payload);
  //console.log(payloadObj);
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY
};

const passportJWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: PUB_KEY ,
  // issuer: 'enter issuer here',
  // audience: 'enter audience here',
  algorithms: ['RS256'],
  ignoreExpiration: false,
  passReqToCallback: false,
  jsonWebTokenOptions: {
      complete: false,
      clockTolerance: '',
      maxAge: '2d', // 2 days
      clockTimestamp: '100',
      nonce: 'string here for OpenID'
  }
}

// The JWT payload is passed into the verify callback
passport.use(new JwtStrategy(passportJWTOptions, function(jwt_payload, done) {
  console.log('beginning passport_strategy');  
  const userAccounts = whModels.userAccounts;
  // We will assign the `sub` property on the JWT to the database ID of user
  userAccounts.findOne({username: jwt_payload.sub}, function(err, user) {
      console.log(jwt_payload.sub);

      if (err) {
          return done(err, false);
      }
      if (user) {
          console.log("if user");
          return done(null, user);
      } else {
          console.log("else user");
          return done(null, false);
      }
      
  });
  
}));

passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done)=>{
  userAccounts.findById(id,(err,user)=>{
    done(err,user);
  });
});

// const enterTheID = (details) => {
//   const acceptable_input = /^[0-9_$a-z]+/;
//   if ((details.match(acceptable_input))) {
//     if (details != null) {
//       return true;
//     }
//   } else {
//     return false;
//   }
// };

// const loginSuccessChecker = (username, password) => {
//   if (username != null && password != null) {
//     if (typeof username != undefined && typeof password != undefined) {
//       return true;
//     }
//   } else {
//     return false;
//   }
// };


passport.use('login', new LocalStrategy({usernameField:'username', passwordField: 'password', passReqToCallback: true},(req,username, password, done) => {
  const userAccounts = whModels.userAccounts;
  userAccounts.findOne({ username: username}, (err, user) => {
      if (err) throw err;
      if(!user){
        console.log("Account Doesn't Exist!");
        return done(null,false,{message:"Account Does Not Exist"});   
      }
      else if(user){
        //console.log(password,user.password);
        bcrypt.compare(password,user.password,(err,isMatch)=>{
          if(err) throw err;
          if(isMatch){
            console.log("Matches");
            if(req.body.number){
              console.log('Extra params');
              
              const newUserHistory={
                index:user.userHistory.length,
                waitlistPos:req.body.position,
                courseNum:req.body.number,
                secCode:req.body.secCode
              };

              user.save({userHistory:user.userHistory.push(newUserHistory)});
            }
            return done(null,user,{message:"Matches"});
          }
          else{
            console.log("Wrong Password");
            return done(null,false,{message:"Wrong Password"});
          }
        });
      }
    })
    // mongoose.disconnect();
  })
)
passport.use('signup', 
new LocalStrategy({usernameField:'username', passwordField: 'password', passReqToCallback: true},
(req,username,password,done) => {

  let number = req.body.number
  let position = req.body.position
  let secCode = req.body.section
  const userAccounts = whModels.userAccounts;
  userAccounts.findOne({username: username}, (err, user) => {
    
      if (err) throw err;
      if(!user){
        const newUserHistory={
          index:0,
          waitlistPos:req.body.position,
          courseNum:req.body.number,
          secCode:req.body.secCode
        };

        const newUser=new userAccounts({username:username,password:password,userHistory:newUserHistory});
        
        // console.log(newUser);
        bcrypt.genSalt(10,(err,salt)=>{
           
          if(err) throw err;
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            console.log(number,position,secCode);
            newUser.password=hash;
            // newUser.courseNum=number;
            // newUser.waitlistPos=position;
            newUser
              .save()
              .then(user=>{
                return done(null,user);
              })
              .catch(err=>{
                return done(null,false,{message:err});
              });
          });
        });
      }
      else{
        console.log('Account Exists!')
        return done(null,false,{message:"Account Exists"});
      }
    })

  })
)


router.post('/login',(req,res,next)=>{
  // mongoose.disconnect();
  console.log('request received');
  passport.authenticate('login',function(err,user,info){
    if(err) throw err;
    if(!user){
      return res.status(400).json({errors:'No user found'});
    }
    req.logIn(user,function(err){
      if(err) throw err;
        const auth="Bearer "+signedJWT;
        passport.session.authorization=auth;
        //console.log(res);
        //res.redirect('/accounts/protected');
        //res.header('authorization',auth);
        res.send({
          'auth':auth,
          'redirect':'/Account'
        });
        //return res.status(200).json({success: 'logged in '});
    });
  })(req,res,next);
  
});

 router.post('/signup',(req,res,next)=>{
  console.log('request received');
  passport.authenticate('signup',function(err,user,info){
    if(err) throw err;
    if(!user){
      return res.status(400).json({errors:'No user found'});
    }
    req.logIn(user,function(err){
      if(err) throw err;
      const auth="Bearer "+signedJWT;
      passport.session.authorization=auth;
      res.send({
        'auth':auth,
        'redirect':'/Account'
      });
    });
  })(req,res,next);
 });

const checkToken = (req, res, next) => {
  
  const header = passport.session['authorization'];
  console.log(passport.session);
  if(typeof header !== 'undefined') {
  const bearer = header.split(' ');
  const token = bearer[1];
  req.token = token;
  next();
  } else {
  //If header is undefined return Forbidden (403)
  res.sendStatus(403)
  }
} 
router.get('/protected',checkToken,(req,res) => {
  console.log("before if");
  jwt.verify(req.token, PRIV_KEY, (err, authorizedData) => {
    if(err){
    //If error send Forbidden (403)
    console.log('ERROR: Could not connect to the protected route');
    res.sendStatus(403);
    } else {
    //If token is successfully verified, we can send the autorized data 
    res.json({
    message: 'Successful log in',
    authorizedData
    });
    console.log('SUCCESS: Connected to protected route');
    }
  }) 
});
// router.get ('/protected',(req,res) => {
//   res.send('testing testing');
// });

 /*
router.post("/", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  axios.post('http://localhost:3000/results',{
    email:email,
    password:password,
  })

  res.status(200).json({ok:true})
})

router.get("/", (req, res) => {
  res.send("hey there")
  res.status(200).json({ok:true})
})
*/

module.exports = {
  passport:passport,
  router:router
};