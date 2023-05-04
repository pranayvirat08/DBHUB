import React from "react"
import Navbar from "./Navbar"
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import mongo from '.././logos/mongodb.png'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {Table,Alert} from 'react-bootstrap';
import axios from 'axios';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';





function RenderModal(mongoData) {
  const [show, setShow] = useState(true);
  const {data} = mongoData;
 
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{
          width: "2000px",
          height: "100%",
          marginTop: "0px",
          marginRight: "0px",
          marginLeft: "0px",
          marginBottom: "0px",
          overflow: "auto",
          // position: "fixed",
        

        }}
        size = 'xl'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Postgres DATA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
 <Table striped bordered hover style={{
          marginTop: "30px",
          marginRight: "0px",
          width: "100%",
        }}>
          <thead>
            <tr>
              {data && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody style={{

          }}>
            
            {data && data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key, index) => (
                <td key={index}>{row[key]} </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table> 


        </Modal.Body>
      </Modal>
    </>
  );
}

export default function MongoDB() {



  const [temp,setTemp] = useState('');
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [formData, setFormData] = useState({
    uri: '',
    database: '',
    collection: '',
    fileType: ''
  });
  const [checked, setChecked] = useState(false);
  const [connectionOutput, setConnectionOutput] = useState('');
  const [mongoData, setmongoData] = useState([]);
  const [viewData, setViewData] = useState(false);
  const [type, setType] = useState('noFile');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('URL value:', formData.url);
  };
//Handler for CheckConnection button
  const handleClick = (event) => {
    event.preventDefault();
    console.log('URL value:', formData.uri);
    console.log('Database value:', formData.database);
    axios.defaults.baseURL = "http://52.201.238.10:3000"   //http://localhost:3000"
    axios
      .get("/api/mongo/mongoConnection", {
        params: {
          uri: formData.uri,
          database: formData.database,
        },
      })
      .then(async (result) => {
        setConnectionOutput(result.data.output);
        console.log(result.data);
        //  window.alert(connectionOutput)
       
      });
    
  };
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => setShowAlert(false);

//Handler for the get tables button
  const handleTables = (event) => {
    event.preventDefault();
    axios.defaults.baseURL = "http://52.201.238.10:3000"  // "http://localhost:3000"
    axios.get("/api/mongo/mongoCollection", {
      params: {
        uri: formData.uri,
        database: formData.database,
      },
    })
      .then((result) => {
        //  console.log(result.data.output);
        setTables(result.data.output);
        setTemp(result.data.output);
        console.log(temp)
        //console.log(tables);
      });
  };
  //Handler for getData button
  const GetData = (event) => {

    event.preventDefault();
  
      axios.defaults.baseURL =  "http://52.201.238.10:3000"  //"http://localhost:3000"
      axios.get("/api/mongo/mongoData", {
        params: {
          uri: formData.uri,
          database: formData.database,
          collection: formData.collection,
          type: type
        },
      })
        .then((result) => {

          const parsedData = JSON.parse(result.data.output);
          console.log(parsedData)
          setmongoData(parsedData);
          setViewData(true);
          //console.log(result.data);
        

        });
    
  };
  //Handler for the download data
  const handleClick1 = async (event) => {
    try {
      event.preventDefault();
      
      const response = await axios.get('http://52.201.238.10:3000/api/db/downloadMongo',{
       params:{
         fileType: type,
       },
       responseType: 'blob',
      });
     
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.zip');
      document.body.appendChild(link);
      link.click();
      console.log(type)
    } catch (error) {
      console.error(error);
    }
  };



























  
  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEFEFA',
      }}>
        <div style={{
          display: "block",
          margin: "30px"
        }}>
          <h4 style={{
            display: 'flex',
            justifyContent: "start",
          }}>MongoDB</h4>
          <Card style={{ width: '60rem', backgroundColor: '#ffefd5', boxShadow: '0 2px 8px #ccc' }}>
            <Card.Img variant="top" src={mongo} alt="mongo" style={{ width: 250, height: 250 }} />
            <Card.Body>
              <Card.Title>ABOUT</Card.Title>
              <Card.Text>
                MongoDB is a document-oriented NoSQL database system that is designed to be scalable and flexible. MongoDB uses a flexible document data model that can accommodate a wide variety of data types and structures.
                <br />
                Some key features of AWS include:
                <br />
                <ul>
                  <li>Scalability: MongoDB is designed to be highly scalable, allowing businesses to easily scale out their database clusters as needed. This makes it a good choice for applications that need to handle high volumes of data and traffic. </li>
                  <li>Performance: MongoDB is designed for high performance, with features such as automatic sharding, in-memory storage engine, and indexing. These features allow businesses to run their applications faster and more efficiently.</li>
                  <li>Security: MongoDB offers a range of security features, including encryption, access controls, and auditing. These features can help businesses protect their data from unauthorized access and attacks.</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><a href="https://www.mysql.com/" >Learn More</a></ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
   
      <div style={{
        margin: "20px",
      }}>
        <h1 style={{
        }}>MongoDB Form</h1>
        <Form style={{
          border: "1px solid grey",
          padding: "20px",
          borderRadius: "8px",
          width: "50rem",
          // height:"40rem"
        }}>
          <Form.Group>
            <Form.Label style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>URI :</Form.Label>
            <Form.Control type="text" name="uri" value={formData.uri} onChange={handleInputChange}
              placeholder="Enter MongoDB URI" required />
            <br />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>Enter your database name :</Form.Label>
            <Form.Control type="text" name="database"
              placeholder="Enter database name " value = {formData.database} onChange = {handleInputChange} required />
            <br />
          </Form.Group>
       
          <Form.Group>
            <Form.Label style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>Enter your Collection name :</Form.Label>
            <Form.Control type="text" name="collection" value={formData.collection} onChange={handleInputChange}
              placeholder="Enter your Collection" required />
            <br />
          </Form.Group>
          <div style={{
          display: "flex",
          padding: "10px",
          flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
          
       }}>
         <div style={{
            display: "flex",
            padding: "10px",
            flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
      
         }}>
        <Form.Check type="checkbox" label="JSON"  onChange={() => setType("json")} />
        </div>
        <div style={{
            display: "flex",
            padding: "10px",
            flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
      
         }}>
        <Form.Check type="checkbox" label="Parquet" onChange={() => setType("parquet")} />
        </div >
        <div style={{
            display: "flex",
            padding: "10px",
            flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
      
         }}>
        <Form.Check type="checkbox" label="CSV" onChange={() => setType("csv")} />
        </div>
        </div>

          <div style={{
            display: "flex",
            justifyContent: "end",
            padding: "10px"
          }}>
            <Button variant="primary" type="submit" onClick ={handleClick} style={{
              marginRight: "10px",
              backgroundColor: "#00D100",
              border: "none",
              color: "white",

            }}>
              Check Connection
            </Button>
            <div className="d-flex justify-content-end">
            {connectionOutput && (
        <Alert variant="success" style={{
          width: "100%",
          textAlign: "top",
          margin: "0 auto"
        }} show ={showAlert} onClose={handleCloseAlert} dismissible>
          {connectionOutput}
        </Alert>
      )}
      </div>
            <Button variant="primary" type="submit" onClick= {handleTables} >Retrieve collections</Button>
            <Button variant="secondary" type="submit" onClick={GetData} style={{
            backgroundColor: "darkblue",
            color: "white",
            marginLeft: "10px"

          }}>Retrieve Data</Button>
          <Button variant="secondary" type="submit" onClick={handleClick1} style={{
            backgroundColor: "black",
            color: "white",
            marginLeft: "10px"

          }}>Download Data</Button>
          </div>
          <div>
            {viewData && <RenderModal data={mongoData} />}
          </div>

        </Form>
      </div>
      <div style={{
        display: "grid",
        textAlign: "center",
         width: "90%",
        alignItems:"center",
        margin: "0 auto"
      }}>
        <Table striped bordered hover style={{
          marginTop:"30px",
        }}>
          <tbody style={{

          }}>
            <tr>
              <td style={{
                fontWeight:"600",
                letterSpacing:"1px",
                fontSize:"20px"
              }}> </td>
            </tr>
            <tr>
              <td
                style={{
                  fontWeight: "600",
                  letterSpacing: "1px",
                  fontSize: "20px"
                }}>List: {temp}</td>
            </tr>
          
          </tbody>
        </Table>
      </div>
      </div>
    </>

  )
}

