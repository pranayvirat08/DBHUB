var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');
const child_process = require('child_process');




router.get('/awsRetrieval', (req, res) => {
    const {accessKey,secretKey,bucketName,filePath,fileType} = req.query;

    console.log(fileType)
    // Define command and arguments
    const command = 'spark-submit';
    const args = ['--class', 'com.jdbc.awsRetrieval', '--packages','org.apache.hadoop:hadoop-aws:3.3.1', '--master', 'local[*]', './jars/aws_2.12-0.1.0-SNAPSHOT.jar',accessKey,secretKey,bucketName,filePath,fileType];
  
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





    const AdmZip = require('adm-zip');
const archiver = require('archiver');
const fs = require('fs');

router.get('/aws/download', (req, res) => {
    const {fileType} = req.query
    const type = fileType;
    const folderPath = `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/aws/data.${type}`; // path of the folder to be zipped
    const zipFilePath =   `/home/pranay/SE/sample_projects/stable copies/DBHUB_latest/Server/downloadedFiles/aws/data.zip` // path where the zip file will be stored
  
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