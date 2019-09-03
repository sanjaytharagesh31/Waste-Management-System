var express    = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var fs = require('fs');

var app = express()
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'admin',
  password : 'root',
  database : 'nfdb'
});


app.get('/', function (req, res) {
  //res.sendFile('__dirname','first.html');
  res.sendFile('D:\\cloud\\dbms_app\\newapp\\client_login\\index.html');
});

app.get('/user', function (req, res) {
    //res.sendFile('__dirname','first.html');
    res.sendFile('D:\\cloud\\dbms_app\\newapp\\client_login\\index.html');
});

app.get('/admin', function (req, res) {
    //res.sendFile('__dirname','first.html');
    res.sendFile('D:\\cloud\\dbms_app\\newapp\\admin_login\\index.html');
});

app.post('/ulogin', function(req, res) {
  let user_name = req.body.username;
  let user_password = req.body.password;
  connection.query('SELECT u_password FROM client WHERE user_id="'+user_name+'";', function (err, result, fields) {
    if (err) throw err;
    console.log("data retrieved");
    console.log(result);
    res.send(result);
  });
});

app.post('/alogin', function(req, res) {
  let admin_name = req.body.adminname;
  let admin_password = req.body.password;
});

var server = app.listen(3000, function () {
  console.log('Node server is running on port 3000');
});

app.post('/cloud', function(req, res) {
    console.log(req.body.donor_name+" "+req.body.emaild+" "+req.body.password+" "+req.body.dob+" "+req.body.blood+" "+req.body.how_often+" "+req.body.gender+" "+req.body.weight+" "+req.body.res_phno+" "+req.body.address1+" "+req.body.city_name+" "+req.body.mob_no+" "+req.body.accept_terms+" "+req.body.accept_condition);
    //console.log(req);
    res.send("Data received")
});
