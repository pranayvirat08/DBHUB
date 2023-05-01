var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var authsRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
const dbRouter = require("./routes/dbRoutes");
const mongoRouter = require("./routes/mongoRoutes");
const connection = require("./db");
const awsConnection = require("./routes/aws");

var app = express();

const { spawn } = require('child_process');
const child_process = require('child_process');
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connection();

app.use("/api/mongo", mongoRouter);
app.use("/api/aws", awsConnection);
app.get('/execute-spark-job', (req, res) => {
  // Define command and arguments
  const command = 'spark-submit';
  const {url, username, password} = req.query;
  const args = ['--class', 'com.postgres.testPostgresConnection', '--driver-class-path','./jars/postgresql-42.3.7.jar', '--master', 'local[*]', './jars/postgresexample_2.12-1.0.jar',url,username,password];
  let stdoutData = '';
  // Spawn child process to execute command
  const sparkJob = spawn(command, args);

  // Log output from child process
  sparkJob.stdout.on('data', (data) => {
    stdoutData += data.toString(); 
    res.send(stdoutData);
    console.log(`stdout: ${data}`);

  });

  // Log errors from child process
  // sparkJob.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // Handle child process exit
  sparkJob.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});


app.get('/execute-spark-retrieve-job', (req, res) => {

  const {url,username,password} = req.query;
  // Define command and arguments
  const command = 'spark-submit';
  const args = ['--class', 'com.jdbc.Postgres.retrieveTables', '--driver-class-path','./jars/postgresql-42.3.7.jar', '--master', 'local[*]', './jars/postgres_2.12-0.1.0-SNAPSHOT.jar',url,username,password];
  let stdoutData = '';
  // Spawn child process to execute command
  const sparkJob = spawn(command, args);

  // Log output from child process
  sparkJob.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    stdoutData += data.toString(); 
    res.send(stdoutData);
  });



  // Handle child process exit
  sparkJob.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    
  });
});

app.get('/execute-spark-job-mysql', (req, res) => {
  // Define command and arguments
  const command = 'spark-submit';
  const {url, username, password} = req.query;
  const args = ['--class', 'com.mysql.checkConnection', '--driver-class-path','./jars/mysql-connector-j-8.0.32.jar', '--master', 'local[*]', './jars/mysql-connection_2.12-1.0.jar',url,username,password];
  let stdoutData = '';
  // Spawn child process to execute command
  const sparkJob = spawn(command, args);

  // Log output from child process
  sparkJob.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    stdoutData += data.toString(); 
    res.send(stdoutData);
  });

  // Handle child process exit
  sparkJob.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    
  });
});

// All Spark api for table retrieval
app.get('/execute-spark-job-all', (req, res) => {
  // Define command and arguments
  const command = 'spark-submit';
  const connections = {
    "postgres":{
      "url":"",
      "username":"",
      "password":""
    },
    "mysql":{
      "url":"",
      "username":"",
      "password":""
    }
  }
 const {table,file} = req.query;
console.log(file)
  //const input1 = '{"postgres":{"url":"jdbc:postgresql://http://34.228.30.99/:5432/postgres","username": "postgres","password":"password"},"mysql":{"url":"jdbc:mysql://http://34.228.30.99/:3307/MySQL","username":"root","password":"root"}}';
  const args = ['--class', 'com.jdbc.getAll','--packages','org.mongodb.spark:mongo-spark-connector_2.12:10.1.1', '--driver-class-path', './jars/mysql-connector-j-8.0.32.jar:./jars/postgresql-42.3.7.jar', '--master', 'local[*]', './jars/getall_2.12-0.1.0-SNAPSHOT.jar',table,file];

  // Spawn child process to execute command
  const sparkJob = spawn(command, args);

  // Store output from child process
  let output = '';

  // Handle stdout data from child process
  sparkJob.stdout.on('data', (data) => {
    const message = data.toString();
    if(!message.includes("loading settings")){

    
    console.log(`stdout: ${data}`);
    output += message;
  }
  });

  sparkJob.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Handle error data from child process
  sparkJob.stderr.on('data', (data) => {
    //console.error(`stderr: ${data}`);
  });

  // When child process exits, check if there were any errors
  sparkJob.on('exit', (code) => {
    if (code !== 0) {
      res.status(500).json({
        message: `Spark job failed with exit code ${code}`,
        output: output
      });
    } else {
      res.json({
        message: 'Spark job completed successfully',
        output: output
      });
    }
  });
});

//Mysql Spark api for table retrieval
app.get('/execute-spark-retrieve-job-mysql', (req, res) => {

  const {url,username,password} = req.query;
  // Define command and arguments
  const command = 'spark-submit';
  const args = ['--class', 'com.mysql.retrieveTables', '--driver-class-path','/home/pranay/Downloads/mysql-connector-j-8.0.32.jar', '--master', 'local[*]', '/home/pranay/SE/sample_projects/jars_updated/mysql-retrieval_2.12-1.0.jar',url,username,password];

  // Spawn child process to execute command
  const sparkJob = spawn(command, args);

  // Log output from child process
  sparkJob.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    res.send(`${data}`);
  });



  // Handle child process exit
  sparkJob.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    
  });
});

/*
app.get('/execute-spark-retrieve-job', (req, res) => {
  const url = 'jdbc:postgresql://http://34.228.30.99/:5432/postgres';


  const sparkSubmitCommand = `spark-submit --class testPostgresConnection --driver-class-path /opt/spark/postgresql-42.2.8 --master local[*] /home/pranay/SE/sample_projects/jars/postgresexample_2.12-1.0.jar`;

  child_process.exec(sparkSubmitCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    console.log(stdout);
    const data = JSON.parse(stdout);

    // Do something with the returned data
    // For example, send it as a response to the client
    res.send(data);
  });
});
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use("/api/users", usersRouter);

app.use("/api/auth", authsRouter);


app.use("/api/db", dbRouter);



app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;