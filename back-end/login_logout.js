const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const whModels = require("./mongo/wh_models.js")
//const userAccounts = whModels.userAccounts;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongo = require("./mongo/mongo.js");
dotenv.config();

// user and pwd
const mongoUser = process.env.mongoUSER;
const mongoPwd = process.env.mongoPWD;
passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done)=>{
  userAccounts.findById(id,(err,user)=>{
    done(err,user);
  });
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

const loginSuccessChecker = (username, password) => {
  if (username != null && password != null) {
    if (typeof username != undefined && typeof password != undefined) {
      return true;
    }
  } else {
    return false;
  }
};


// passport.use( new JwtStrategy( { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "temporary_secret"
// },
//   async (payload, done) => {
//     userAccounts.findById(payload.sub, (err, user) => {
//       if (err) {
//         done(err, false)
//       } 
//       else {
//         if (!user) {
//           return done(null, false)
//         }
//         done(null, user)
//       }
//     })
//   })
// )

passport.use('login', new LocalStrategy({usernameField:'username', passwordField: 'password', passReqToCallback: true},(req,username, password, done) => {
  const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
  const link = mongoose.createConnection(uri,{useNewUrlParser:true,useUnifiedTopology:true});
  const userAccounts = link.model('userAccounts', whModels.userAccountSchema)
  userAccounts.findOne({ username: username}, (err, user) => {
      if (err) throw err;
      if(!user){
        console.log("Account Doesn't Exist!");
        return done(null,false,{message:"Account Does Not Exist"});
        
      }
      if(user){
        //console.log(password,user.password);
        bcrypt.compare(password,user.password,(err,isMatch)=>{
          if(err) throw err;
          if(isMatch){
            console.log("Matches");
            if(req.body.number){
              console.log('Extra params');
              user.save({courseNum:user.courseNum.push(req.body.number),waitlistPos:user.waitlistPos.push(req.body.position)});
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
  const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
  const link = mongoose.createConnection(uri,{useNewUrlParser:true,useUnifiedTopology:true});
  const userAccounts = link.model('userAccounts', whModels.userAccountSchema)
  userAccounts.findOne({username: username}, (err, user) => {
    
      if (err) throw err;
      if(!user){
        
        const newUser=new userAccounts({username:username,password:password,courseNum:number,waitlistPos:position});
        
        // console.log(newUser);
        bcrypt.genSalt(10,(err,salt)=>{
           
          if(err) throw err;
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            console.log(number,position);
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
        // console.log(password,user.password);
        // bcrypt.compare(password,user.password,(err,isMatch)=>{
        //   if(err) throw err;
        //   if(isMatch){
        //     console.log("Matches");
        //     return done(null,user,{message:"Matches"});
        //   }
        //   else{
        //     console.log("Wrong password");
            
        //   }
        // });
        console.log('Account Exists!')
        return done(null,false,{message:"Account Exists"});
      }
    })
    // mongoose.disconnect();
  })
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

// router.get('/', passport.authenticate('jwt', {session : false}), (req, res) => {
//   const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
//   mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
//   res.json({user: req.user})
//   mongoose.disconnect()
// })

// router.post('/', passport.authenticate('signin', {session : false}), (req, res) => {
//   const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
//   mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
//   res.json({token: signToken(req.user)})
//   mongoose.disconnect()
// })

router.post('/login',(req,res,next)=>{
  // mongoose.disconnect();
  console.log('request received');
  passport.authenticate('login',function(err,user,info){
    if(err) throw err;
    if(!user){
      return res.status(400)//,json({errors:'No user found'});
    }
    req.logIn(user,function(err){
      if(err) throw err;
      return res.status(200)//.json({success: 'logged in '});
    });
  })(req,res,next);
});

 router.post('/signup',(req,res,next)=>{
  console.log('request received');
  passport.authenticate('signup',function(err,user,info){
    if(err) throw err;
    if(!user){
      return res.status(400)//,json({errors:'No user found'});
    }
    req.logIn(user,function(err){
      if(err) throw err;
      return res.status(200)//.json({success: 'logged in '});
    });
  })(req,res,next);
 });

module.exports = {
  passport:passport,
  router:router,
  enterTheID:enterTheID,
  loginSuccessChecker:loginSuccessChecker,
};