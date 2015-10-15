var mongoose = require("mongoose");
var Schedule= mongoose.model('Schedule');


//POST login page
exports.doLogin = function(req, res){
   Schedule.find(
      {'subject_name':"das",
        },
      '_id name email',
      function(err, user){
        if (!err){
          if (!user){
            res.redirect('/login?404=user');
          } else {
            req.session.user = {
              "name": user.name,
              "email": user.email,
              "_id": user._id
            };
            req.session.loggedIn = true;
            console.log('Logged in user: ' + user);
            res.redirect('/user');
          }
        } else {
          res.redirect('/login?404=error');
        }
      });
  
};