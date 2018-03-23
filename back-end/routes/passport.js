var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in login strategy - passport.js');
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result- login strategy - passport.js');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:results.username,isAdmin:results.isAdmin});
                }
                else {
                    console.log("passport.js - no user fetched");
                    done(null,false);
                }
            }
        });

    }));

    // passport.use('signup', new LocalStrategy(function(username , password, firstname, lastname, done) {
    //     console.log('in signup strategy - passport.js');
    //     console.log('in signup strategy - passport.js - details: '+ username + firstname);
    //     // kafka.make_request('signup_topic',{"username":username,"password":password,"firstname":firstname,"lastname":lastname}, function(err,results){
    //     //     console.log('in result - signup strategy - passport.js');
    //     //     console.log("results - in signup strayegy: "+results);
    //     //     if(err){
    //     //         done(err,{});
    //     //     }
    //     //     else
    //     //     {
    //     //         if(results.code == 201){
    //     //             done(null,{username:"success",password:"a"});
    //     //         }
    //     //         else {
    //     //             console.log("passport.js - signup failed");
    //     //             done(null,false);
    //     //         }
    //     //     }
    //     // });
    //
    // }));
};
