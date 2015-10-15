var express = require('express')
  , db = require('./model/db')
  , routes = require('./routes')
  , user = require('./routes/user')
  , schedule = require('./routes/schedule')
  , subject = require('./routes/subject')
 // , lecturer = require('./routes/lecturer')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
// USER ROUTES
app.get('/user', user.index);           // Current user profile
app.get('/user/new', user.create);      // Create new user form
app.post('/user/new', user.doCreate);   // Create new user action
app.get('/user/edit', user.edit);       // Edit current user form
app.post('/user/edit', user.doEdit);    // Edit current user action
app.get('/user/delete', user.confirmDelete);       // delete current user form
app.post('/user/delete', user.doDelete);    // Delete current user action
app.get('/logout', user.doLogout);          // Logout current user
app.get('/login', user.login);          // Edit current user form
app.post('/login', user.doLogin);       // Edit current user action


//Subject
app.get('/subject/new', subject.create);
app.post('/subject/new', subject.doCreate);
app.get('/subject/all', subject.doList);

//Schedule
app.get('/schedule/new', schedule.create);
app.post('/schedule/new', schedule.doCreate);
app.get('/schedule/all', schedule.doList);

// Lecturer
/*app.get('/lecturer/new', lecturer.create);
app.post('/lecturer/new', lecturer.doCreate);
app.get('/lecturer/all', lecturer.doList);*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
