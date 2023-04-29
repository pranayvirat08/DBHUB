import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import MySQL from '.././logos/MySQL.png'
import { useState } from 'react';
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function RenderModal(mysqlData) {
  const [show, setShow] = useState(true);
  const {data} = mysqlData;

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            MYSQL DATA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
 <Table striped bordered hover style={{
          marginTop: "30px",
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
            {/* <tr>
              <td style={{
                fontWeight: "600",
                letterSpacing: "1px",
                fontSize: "20px"
              }}> Tables list</td>
            </tr> */}
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

export default function Details() {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [formData, setFormData] = useState({
    url: '',
    username: '',
    password: '',
    tablename: ''
  });
     
  const [viewData, setViewData] = useState(false);

  const [checked, setChecked] = useState(false);
  const [resultB, setResult] = useState('');
  const [mySQLData, setMySQLData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('URL value:', formData.url);
  };


  const handleClick = (event) => {
    event.preventDefault();
    const check_url = formData.url
    const check_username = formData.username
    const check_password = formData.password
    if (check_url.trim() === "" || check_username.trim() === "" || check_password.trim() === "") {
      alert("Please specify values")
    } else {

      axios.defaults.baseURL = "http://localhost:3000"
      axios
        .get("/execute-spark-job-mysql", {
          params: {
            url: formData.url,
            username: formData.username,
            password: formData.password,
          },
        })
        .then(async (result) => {
          setResult(result.data);
          console.log(resultB);
          if (checked) {
            try {
              const result = await axios.post("/api/db/mysql/add", {

                url: formData.url,
                username: formData.username,
                password: formData.password
              })
              setFormData({
                url: '',
                username: '',
                password: ''
              })

            } catch (error) {
              console.error(error);
            }
          }
        });
    }
  };

  const HandleTables = (event) => {
    event.preventDefault();
    const check_url = formData.url
    const check_username = formData.username
    const check_password = formData.password

    if (check_url.trim() === "" || check_username.trim() === "" || check_password.trim() === "") {
      alert("Please specify values")
    } else {
      axios.defaults.baseURL = "http://localhost:3000"
      axios.get("/execute-spark-retrieve-job-mysql", {
        params: {
          url: formData.url,
          username: formData.username,
          password: formData.password,
        },
      })
        .then((result) => {
          console.log(result);
          setTables(result.data);
          console.log(tables);

        });
    }
  };

  const GetData = (event) => {

    event.preventDefault();
    const check_url = formData.url
    const check_username = formData.username
    const check_password = formData.password
    const check_tablename = formData.tablename
    if (check_url.trim() === "" || check_username.trim() === "" || check_password.trim() === "" || check_tablename.trim() === "") {
      alert("Please specify values")
    } else {
      axios.defaults.baseURL = "http://localhost:3000"
      axios.get("/api/db/mysqlData", {
        params: {
          url: formData.url,
          username: formData.username,
          password: formData.password,
          table: formData.tablename,
          fileType: type,
        },
      })
        .then((result) => {

          const parsedData = JSON.parse(result.data.output);

          setMySQLData(parsedData);
          setViewData(true);
          console.log(result.data);
        

        });
    }
  };

  const handleClick1 = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.get('http://localhost:3000/api/db/downloadMySQL',{
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


  const [showAlert, setShowAlert] = useState(true);
  const [type, setType] = useState('noFile');

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div style={{
      display: 'flex',
      // width: 700,
      // padding: 30
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEFEFA',
    }}>
      <div style={{
        display: 'block',
        margin: 30,
      }}>
        <h4 style={{
          display: 'flex',
          justifyContent: 'start',
        }}>MySQL</h4>

        <Card style={{ width: '60rem', backgroundColor: '#C3EEFA' }}>
          <Card.Img variant="top" src={MySQL} alt="MySQL" style={{ width: 250, height: 250 }} />
          <Card.Body>
            <Card.Title>ABOUT</Card.Title>
            <Card.Text>
              MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL). It was created in 1995 and is now owned by Oracle Corporation. MySQL is widely used in web applications and is the most popular open-source database system in the world.
              <br />
              Some key features of MySQL include:
              <br />
              <ul>
                <li>Support for multiple platforms, including Windows, Linux, and macOS</li>
                <li>Scalability, with the ability to handle databases ranging from small to large</li>
                <li>High performance and fast data processing</li>
                <li>Data security, including encryption and access control</li>
                <li>Support for a wide range of programming languages, including PHP, Python, and Java</li>
              </ul>

              <h4>Parameters</h4>
              <ul>
                <li><b>URL:</b><p>JDBC URL: The JDBC URL for MySQL usually looks like this: <b>jdbc:mysql://localhost:3306/dbname </b>, where localhost is the name of the server where MySQL is running, 3306 is the port number, and dbname is the name of the database you want to connect to. You will need to replace localhost and dbname with the appropriate values for your MySQL setup.</p></li>
                <li><b>Username: </b><p>The username you use to connect to MySQL will depend on your specific MySQL setup. By default, the username is root, but it may be different if you are connecting to a MySQL server that is managed by a third party (e.g., a web host).</p></li>
                <li><b>Password: </b><p>You will need to provide the password associated with the MySQL user you are connecting as.</p></li>
              </ul>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><a href="https://www.mysql.com/" >Learn More</a></ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div style={{
        margin: "20px"
      }}>
        <h1>MySQL Form</h1>
      </div>
      <Form onSubmit={handleSubmit} style={{
        border: "1px solid grey",
        padding: "20px",
        borderRadius: "8px",
        width: "50rem",
      }}>
        <Form.Group>
          <Form.Label style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}>URL:</Form.Label>
          <Form.Control type="text" name="url" value={formData.url} onChange={handleInputChange}
            placeholder="Enter MySQL URL" required />
          <br />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}>Enter your username:</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange}
            placeholder="Enter your your username " required />
          <br />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}>Enter your password:</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
          <br />
          
        </Form.Group>
        <Form.Group>
          <Form.Label style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}>Enter table name:</Form.Label>
          <Form.Control type="text" name="tablename" value={formData.tablename} onChange={handleInputChange} placeholder="Enter table name" required />
          <br />
          <Form.Check type="checkbox" label="Add Connection" checked={checked} onChange={() => setChecked(!checked)} />
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
          <Button variant="primary" type="submit" onClick={handleClick} style={{
            marginRight: "10px",
            backgroundColor: "#00D100",
            border: "none",
            color: "white"

          }}>
            Check Connection
          </Button>
          <div className="d-flex justify-content-end">
            {resultB && (
              <Alert variant="success" style={{
                width: "100%",
                textAlign: "top",
                margin: "0 auto"
              }} show={showAlert} onClose={handleCloseAlert} dismissible>
                {resultB}
              </Alert>
            )}
          </div>
          <Button variant="secondary" type="submit" onClick={HandleTables} style={{
            backgroundColor: "blue",
            color: "white"

          }}>Retrieve tables</Button>
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
      {
        viewData && <RenderModal data={mySQLData}/>
      }
      </div>
      </Form>
      <div style={{
        display: "grid",
        textAlign: "center",
        width: "70%",
        alignItems: "center",
        margin: "0 auto"
      }}>
        <Table striped bordered hover style={{
          marginTop: "30px",
        }}>
          <tbody style={{

          }}>
            <tr>
              <td style={{
                fontWeight: "600",
                letterSpacing: "1px",
                fontSize: "20px"
              }}> Tables list</td>
            </tr>
            {tables.map((row, index) => (
              <tr key={index}>
                <td>{row.table_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
     
    </div>
  );
}