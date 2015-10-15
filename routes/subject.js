var mongoose = require("mongoose");
var Subject = mongoose.model('Subject');


exports.serve = function(req, res){
    
};

exports.create = function(req, res){
     res.render('subject-form', {
        title: 'Add Subject',
        buttonText: 'Thats it!'
     });   
};

exports.doCreate= function(req, res){
    Subject.create({
        subject_name: req.body.subjectName
        ,subject_code: req.body.subjectCode
        ,modified_on: Date.now()
    }, function(err, subject){
        if (err){
            console.log(err);
            if(err.code === 11000){
                res.redirect('/subject/new?exists=true');
            } else {
                res.redirect('/?error=true');
            }
        } else {
            //Success
            console.log("Subject created and saved: " + subject);
            res.redirect('/subject/new'); // Redirect user to add new subject
        }
    });
};

exports.doList= function(req, res){
    Subject.find(
    {}
    ,'_id subject_name subject_code'
    ,function(err, subjects){
        if (!err){
          console.log('All subjects:' + subjects);
          //return res.end(JSON.stringify(subjects));
          res.send(JSON.parse(JSON.stringify(subjects)));
        } else {
          res.redirect('/subject/all?404=error');
        }
    });
    
};