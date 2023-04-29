var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');
const child_process = require('child_process');


// --------------------------------------------------------------------- Routes for Postgres ------------------------------------------------------------------------------

//Route to save postgresData
const postgresModel = require('../models/postgres')
router.post('/postgres/add',async (req,res)=>{
    try{
        const postgresItem = new postgresModel({
            url: req.body.url,
            username: req.body.username,
            password: req.body.password
        })

        const itemSaved = await postgresItem.save();
        res.status(200).json("Postgres Connection details added successfully");
    }catch(error){
        res.json(error);
    }

})

//Route to fetch postgresData
router.get('/postgres/getDetails', async(req,res)=>{
    try{
        const wholePostgresData = await postgresModel.find({});
        res.status(200).json(wholePostgresData);
    }catch(error){
        res.json(error);
    }
})

//Route to update postgreData
router.put('/postgres/getDetails/:id', async(req,res)=>{
    try{
    const updatePostgresDetails = await postgresModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json("Postgres Connection details updated");
    }catch(error){
        res.json(error);
    }
})

//Route to delete postgresData
router.delete('/postgres/getDetails/:id', async(req,res)=>{
    try{
        const deletePostgresDetails = await postgresModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Postgres Connection details deleted successfully");
    }catch(error){
        res.json(error);
    }
})



// ---------------------------------------------------------------------- Routes for MySQL ---------------------------------------------------------------------------

//Route to save mySqlData
const mySQLModel = require('../models/mysql')
router.post('/mysql/add',async (req,res)=>{
    try{
        const mySQLItem = new mySQLModel({
            url: req.body.url,
            username: req.body.username,
            password: req.body.password
        })

        const itemSaved = await mySQLItem.save();
        res.status(200).json("MySQL Connection details added successfully");
    }catch(error){
        res.json(error);
    }

})

//Route to fetch mySqlData
router.get('/mysql/getDetails', async(req,res)=>{
    try{
        const wholeMySqlData = await mySQLModel.find({});
        res.status(200).json(wholeMySqlData);
    }catch(error){
        res.json(error);postgres/add
    }
})
//Route to update mySqlData
router.put('/mysql/getDetails/:id', async(req,res)=>{
    try{
    const updateMySQLDetails = await mySQLModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json("MySQL Connection details updated");
    }catch(error){
        res.json(error);
    }
})

//Route to delete mySqlData
router.delete('/mysql/getDetails/:id', async(req,res)=>{
    try{
        const deleteMySQLDetails = await mySQLModel.findByIdAndDelete(req.params.id);
        res.status(200).json("MySQL Connection details deleted successfully");
    }catch(error){
        res.json(error);
    }
})


// ---------------------------------------------------------------------- Routes for Download File ---------------------------------------------------------------------------
const AdmZip = require('adm-zip');
const archiver = require('archiver');
const fs = require('fs');

router.get('/download', (req, res) => {
    const {fileType} = req.query
    const type = fileType;
    const folderPath = `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/data.${type}`; // path of the folder to be zipped
    const zipFilePath =   `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/data.zip` // path where the zip file will be stored
  
    // create a new zip object
    const zip = new AdmZip();
  
    // add the contents of the folder to the zip object
    zip.addLocalFolder(folderPath);
  
    // write the zip file to disk
    //Overwrite the zip file if it already exists
    //Delete the zip file if it already exists
    fs.Dir  = zipFilePath;
    if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
    }

    zip.writeZip(zipFilePath);
    //zip.writeZip(zipFilePath);
  
    // set the response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=download.zip');
    res.setHeader('Content-Type', 'application/zip');
  
    // read the file and send it to the client
    const filestream = fs.createReadStream(zipFilePath);
    filestream.pipe(res);
  });



 // -------------------------------------------------------------- Routes for Postgres Data Retrieval ---------------------------------------------------------------------------

 router.get('/postgresData', (req, res) => {

    const {url,username,password,table,fileType} = req.query;
    // Define command and arguments
    const command = 'spark-submit';
    const args = ['--class', 'com.jdbc.postgresData', '--driver-class-path','/home/pranay/Downloads/mysql-connector-j-8.0.32.jar:/opt/spark/postgresql-42.3.7.jar','--jars','/home/pranay/Downloads/mysql-connector-j-8.0.32.jar', '--master', 'local[*]', '/home/pranay/SE/sample_projects/jars/getall_2.12-0.1.0-SNAPSHOT.jar',url,username,password,table,fileType];
  
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
    // Handle child process exit
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



// -------------------------------------------------------------------------------Routes for MySQL Data Retrieval ---------------------------------------------------------------------------

router.get('/mysqlData', (req, res) => {

    const {url,username,password,table,fileType} = req.query;
    // Define command and arguments
    const command = 'spark-submit';
    const args = ['--class', 'com.jdbc.mysqlData', '--driver-class-path','/home/pranay/Downloads/mysql-connector-j-8.0.32.jar:/opt/spark/postgresql-42.3.7.jar','--jars','/home/pranay/Downloads/mysql-connector-j-8.0.32.jar', '--master', 'local[*]', '/home/pranay/SE/sample_projects/jars/getall_2.12-0.1.0-SNAPSHOT.jar',url,username,password,table,fileType];
  
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
   res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
   res.setHeader('Pragma', 'no-cache');
   res.setHeader('Expires', '0');
  
    // Handle child process exit
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
    

// ------------------------------------------------------- Route to download Postgres Data -----------------

router.get('/downloadPostgres', (req, res) => {
    const {fileType} = req.query
    const type = fileType;
    const folderPath = `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/postgres/data.${type}`; // path of the folder to be zipped
    const zipFilePath =   `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/postgres/data.zip` // path where the zip file will be stored
  
    // create a new zip object
    const zip = new AdmZip();
  
    // add the contents of the folder to the zip object
    zip.addLocalFolder(folderPath);
  
    // write the zip file to disk
    //Overwrite the zip file if it already exists
    //Delete the zip file if it already exists
    fs.Dir  = zipFilePath;
    if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
    }

    zip.writeZip(zipFilePath);
    //zip.writeZip(zipFilePath);
  
    // set the response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=download.zip');
    res.setHeader('Content-Type', 'application/zip');
  
    // read the file and send it to the client
    const filestream = fs.createReadStream(zipFilePath);
    filestream.pipe(res);
  });

  router.get('/downloadMySQL', (req, res) => {
    const {fileType} = req.query
    const type = fileType;
    const folderPath = `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/mysql/data.${type}`; // path of the folder to be zipped
    const zipFilePath =   `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/mysql/data.zip` // path where the zip file will be stored
  
    // create a new zip object
    const zip = new AdmZip();
  
    // add the contents of the folder to the zip object
    zip.addLocalFolder(folderPath);
  
    // write the zip file to disk
    //Overwrite the zip file if it already exists
    //Delete the zip file if it already exists
    fs.Dir  = zipFilePath;
    if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
    }

    zip.writeZip(zipFilePath);
    //zip.writeZip(zipFilePath);
  
    // set the response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=download.zip');
    res.setHeader('Content-Type', 'application/zip');
  
    // read the file and send it to the client
    const filestream = fs.createReadStream(zipFilePath);
    filestream.pipe(res);
  });



  router.get('/downloadMongo', (req, res) => {
    const {fileType} = req.query
    const type = fileType;
    const folderPath = `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/mongo/data.${type}`; // path of the folder to be zipped
    const zipFilePath =   `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/mongo/data.zip` // path where the zip file will be stored
  
    // create a new zip object
    const zip = new AdmZip();
  
    // add the contents of the folder to the zip object
    zip.addLocalFolder(folderPath);
  
    // write the zip file to disk
    //Overwrite the zip file if it already exists
    //Delete the zip file if it already exists
    fs.Dir  = zipFilePath;
    if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
    }

    zip.writeZip(zipFilePath);
    //zip.writeZip(zipFilePath);
  
    // set the response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=download.zip');
    res.setHeader('Content-Type', 'application/zip');
  
    // read the file and send it to the client
    const filestream = fs.createReadStream(zipFilePath);
    filestream.pipe(res);
  });
module.exports = router;