var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var fs = require('fs');

const multer  = require("multer");
const FormData = require('form-data');
const util = require('util');
const path = require('path');

var filePath = '';
var fileName = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)// + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

var app = express()
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'admin',
  password: 'dbms_project',
  database: 'nfdb'
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

app.get('/register_user', function (req, res) {
  //res.sendFile('__dirname','first.html');
  res.sendFile('D:\\cloud\\dbms_app\\newapp\\forms\\user_reg.html');
});

app.post('/ulogin', function (req, res) {
  let user_name = req.body.username;
  let user_password = req.body.password;
  console.log(user_name + " " + user_password);
  connection.query('SELECT u_password FROM client WHERE user_id="' + user_name + '";', function (err, result, fields) {
    if (err) throw err;
    console.log("data retrieved");
    let r = result[0].u_password;
    console.log(r);
    if (user_password != r)
      res.send('Authentication failed');
    else
      res.sendFile('D:\\cloud\\dbms_app\\newapp\\dashboard\\user_dash.html');
  });
});

app.post('/alogin', function (req, res) {
  let admin_name = req.body.adminname;
  let admin_password = req.body.password;

  console.log(admin_name + " " + admin_password);
  connection.query('SELECT a_password FROM admin WHERE admin_id="' + admin_name + '";', function (err, result, fields) {
    if (err) throw err;
    console.log("data retrieved");
    let r = result[0].a_password;
    console.log(r);
    if (admin_password != r)
      res.send('Authentication failed');
    else
      res.sendFile('D:\\cloud\\dbms_app\\newapp\\dashboard\\admin_dash.html');
  });
});

app.post('/alogin/area_details/alogi2n', function (req, res) {
  let admin_name = req.body.id;
  let admin_password = req.body.field2;
  let ad1=req.body.field3;
  let ad2=req.body.field4;

  console.log("asdas");
  console.log(admin_name + " " + admin_password+ad1+ad2);
  console.log(req.body.field1+" "+req.body.field2);
  
  var sql1 =
      "INSERT INTO area (area_id,name,latitude,longitude) VALUES ('" +
      req.body.field1 +
      "','" +
      req.body.field2 +
      "','" +
      req.body.field3+
      "','" +
      req.body.field4+
      "');";

  connection.query(sql1, function(err, result) {
        console.log(sql1);
        if (err) throw err;
        console.log("1 record inserted");
        res.send("Area Added");
      });
});

app.post('/alogin/area_details/alogi3n', function (req, res) {
  let admin_name = req.body.field1;
  let admin_password = req.body.field2;
  let ad1=req.body.field3;
  let ad2=req.body.field4;
 console.log("asdas22");
  console.log(admin_name + " " + admin_password+"  "+ad1+"  "+ad2);
  
  var sql1 =
      "UPDATE area  set name='"+admin_password+"', latitude='"+ad1+"',longitude='"+ad2+"' where area_id='"+admin_name+"';"
     

  connection.query(sql1, function(err, result) {
        console.log(sql1);
        if (err) throw err;
        console.log("1 Area updated");
        res.send("area updated");
      });
});

app.post('/alogin/area_details/alogi4n', function (req, res) {
  let admin_name = req.body.field1;
  
  console.log("asdas22");
  console.log(admin_name );
  
  var sql1 =
      "Delete from area  where area_id='"+admin_name+"';"
     

connection.query(sql1, function(err, result) {
      console.log(sql1);
      if (err) throw err;
      console.log("1Area updated");
      res.send("area Deleted");
    });
});


app.post('/ulogin/waste_produce/wastepro', function (req, res) {
  let admin_name = req.body.id;
  let admin_password = req.body.field2;
  let ad1=req.body.field3;
  let ad2=req.body.field4;

  console.log("asdas");
  console.log(admin_name + " " + admin_password+ad1+ad2);
  console.log(req.body.field1+" "+req.body.field2);
  

  let datetime = new Date();
  let today = datetime.toISOString().slice(0,10);
  console.log(datetime.toISOString().slice(0,10));

  var sql1 =
      "INSERT INTO waste_produced (user_id,w_date,bio_weight,non_bio_weight) VALUES ('" +
      req.body.field1 +
      "','" +
      today +
      "','" +
      req.body.field2+
      "','" +
      req.body.field3+
      "');";

  connection.query(sql1, function(err, result) {
        console.log(sql1);
        if (err) throw err;
        console.log("1 record inserted");
        res.send("Your daily waste details updated");
      });
});


app.post('/ulogin/waste_produce/docomp', upload.single('myFile'), function (req, res) {
  let admin_name = req.body.id;
  let admin_password = req.body.field2;
  let ad1=req.body.field3;
  let ad2=req.body.field4;  

  console.log("asdas");
  console.log(admin_name + " " + admin_password+ad1+ad2);
  console.log(req.body.field1+" "+req.body.field2);
  

  let datetime = new Date();
  let today = datetime.toISOString().slice(0,10);
  let tme = datetime.toISOString().slice(11,16);
  console.log(datetime.toISOString().slice(0,10));

  filePath = './uploads/'+req.file.originalname;
  fileName = req.file.originalname;
  console.log('./uploads/'+req.file.originalname);

  var sql1 =
      "INSERT INTO complaint (user_id,message,image,complaint_status,complaint_date,complaint_time) VALUES ('" +
      req.body.field1 +
      "','" +
      req.body.field2 +
      "','" +
      filePath+
      "','" +
      "Not Resolved"+
      "','" +
      today +
      "','" +
      tme+
      "');";

  connection.query(sql1, function(err, result) {
        console.log(sql1);
        if (err) throw err;
        console.log("1 record inserted");
        res.send("Your Complaint has been registered. We will get back to you soon");
      });
});

app.get('/alogin/compstat', function (req, res) {
  let sql1 = "select complaint_id, user_id,message,image,complaint_status,complaint_date,complaint_time from complaint";
  connection.query(sql1, function(err, result) {
    console.log(sql1);
    if (err) throw err;
    console.log("Result retrieved");
    res.send(result);
  });
  
});


app.post('/ulogin/stat/check', function(req, res) {
  console.log('Checking usage statistics');
  uid = req.body.field1;
  console.log(uid);

  var sql = "select bio_weight, non_bio_weight from waste_produced where user_id='"+uid+"';";

  connection.query(sql, function(err, result, fields) {
    console.log(sql);
    console.log(result);
    if (err) throw err;
    console.log("Result retrieved");

    res.send(result);
  });

});

app.get('/ulogin/stat', function(req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\stat_dash.html");
});

app.get('/ulogin/complaint', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\complaint_dash.html");
});

app.get('/ulogin/waste_produce', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\waste_produce_dash.html");
});

app.get('/ulogin/user_dash', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\dashboard\\user_dash.html");
});

app.get('/alogin/admin_dash', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\dashboard\\admin_dash.html");
});

app.get('/alogin/area_details', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\dashboard\\area_details_dash.html");
});

app.get('/alogin/area_details/add_area', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\add_area_dash.html");
});

app.get('/alogin/area_details/update_area', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\update_area_dash.html");
});

app.get('/alogin/area_details/delete_area', function (req, res) {
  res.sendFile("D:\\cloud\\dbms_app\\newapp\\forms\\delete_area_dash.html");
});

var server = app.listen(3000, function () {
  var datetime = new Date();
  console.log(datetime.toISOString().slice(11,16));
  console.log(datetime.toISOString().slice(0,10));
  console.log('Node server is running on port 3000');
});