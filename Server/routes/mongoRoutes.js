var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');
const child_process = require('child_process');

router.get('/mongoConnection', (req, res) => {

    const {uri,database} = req.query;
    // Define command and arguments
    const command = 'spark-submit';
    const args = ['--class', 'com.jdbc.mongoConnection', '--packages', 'org.mongodb.spark:mongo-spark-connector_2.12:10.1.1','--master', 'local[*]', './jars/mongowhole_2.12-0.1.0-SNAPSHOT.jar',uri,database];
    const sparkJob = spawn(command, args);
  
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



    router.get('/mongoCollection', (req, res) => {

        const {uri,database} = req.query;
        // Define command and arguments
        const command = 'spark-submit';
        const args = ['--class', 'com.jdbc.mongoCollections', '--packages', 'org.mongodb.spark:mongo-spark-connector_2.12:10.1.1','--master', 'local[*]', './jars/mongowhole_2.12-0.1.0-SNAPSHOT.jar',uri,database];
        const sparkJob = spawn(command, args);
      
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


        router.get('/mongoData', (req, res) => {

            const {uri,database,collection,type} = req.query;
            // Define command and arguments
            const command = 'spark-submit';
            const args = ['--class', 'com.jdbc.mongoData', '--packages', 'org.mongodb.spark:mongo-spark-connector_2.12:10.1.1','--master', 'local[*]', './jars/mongowhole_2.12-0.1.0-SNAPSHOT.jar',uri,database,collection,type];
            const sparkJob = spawn(command, args);
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




       



module.exports = router;