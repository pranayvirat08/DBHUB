import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PostgreSQL from '.././logos/Postgresql.png'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
            Postgres DATA
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
  const [formData, setFormData] = useState({
    url: '',
    username: '',
    password: '',
    tablename: ''

  });
  const [checked, setChecked] = useState(false);
  const [connectionOutput, setConnectionOutput] = useState('');
  const [psqlData, setPsqlData] = useState([]);
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
  const handleClick = (event) => {
    event.preventDefault();
    const check_url = formData.url
    const check_username = formData.username
    const check_password = formData.password
    if (check_url.trim() === "" || check_username.trim() === "" || check_password.trim() === "") {
      alert("Please specify values")
    } else {
    axios.defaults.baseURL = "http://52.201.238.10:3000"
    axios
      .get("/execute-spark-job", {
        params: {
          url: formData.url,
          username: formData.username,
          password: formData.password,
        },
      })
      .then(async (result) => {
        setConnectionOutput(result.data);
        console.log(result.data);
        if (checked) {
          try {
            const result = await axios.post("/api/db/postgres/add", {

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
        //  window.alert(connectionOutput)
       
      });
    }
  };
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => setShowAlert(false);

  const handleTables = (event) => {
    event.preventDefault();
    axios.defaults.baseURL = "http://52.201.238.10:3000"
    axios.get("/execute-spark-retrieve-job", {
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
      axios.defaults.baseURL = "http://52.201.238.10:3000"
      axios.get("/api/db/postgresData", {
        params: {
          url: formData.url,
          username: formData.username,
          password: formData.password,
          table: formData.tablename,
          fileType: type
        },
      })
        .then((result) => {

          const parsedData = JSON.parse(result.data.output);

          setPsqlData(parsedData);
          setViewData(true);
          console.log(result.data);
        

        });
    }
  };

  const handleClick1 = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.get('http://52.201.238.10:3000/api/db/downloadPostgres',{
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
    <div style={{
      display: 'flex',
      // width: "100%",
      // padding: 30,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEFEFA',
    }}>
      <div className='postsql'
        style={{
          display: "block",
          margin: "30px"
        }}
      >
        <h4 style={{
          // alignItems:'left',
          display: 'flex',
          justifyContent: "start",
        }}>PostgreSQL</h4>

        <Card style={{
          width: '60rem', backgroundColor: '#ffefd5',
          boxShadow: '0 2px 8px #ccc',
        }}>
          <Card.Img variant="top" src={PostgreSQL} alt="PostgreSQL" style={{ width: 250, height: 250 }} />
          <Card.Body>
            <Card.Title>ABOUT</Card.Title>
            <Card.Text>
              PostgreSQL is an open-source object-relational database management system (ORDBMS) that uses SQL. It was created in 1986 and is now maintained by the PostgreSQL Global Development Group. PostgreSQL is commonly referred to as "Postgres".
              <br />
              Some key features of PostgreSQL include:
              <br />
              <ul>
                <li>Support for multiple platforms, including Windows, Linux, and macOS</li>
                <li>Ability to handle complex queries and large amounts of data</li>
                <li>High concurrency and scalability, with support for multiple users and transactions</li>
                <li>ACID compliance, which ensures data integrity and reliability</li>
                <li>Extensibility, with the ability to add custom data types, functions, and operators</li>
                <li>Advanced indexing and query optimization capabilities</li>
              </ul>
              PostgreSQL is also known for its robustness, reliability, and data integrity, making it a popular choice for applications that require high levels of data security and transactional consistency.
              <br />
              PostgreSQL has a large and active community of developers and users, who contribute to its ongoing development and maintenance. It is used by many large organizations and is a popular choice for enterprise-level applications.
              <br />
              <h4>Parameters</h4>
              <ul>
                <li><b>URL: </b> <p>The JDBC URL for PostgreSQL is a string that specifies the address of the database server, along with any necessary parameters for connecting to the database. Here is an example JDBC URL for connecting to a PostgreSQL database:<b>jdbc:postgresql://http://52.201.238.10/:5432/mydatabase</b></p><p>In this example, http://52.201.238.10/ is the hostname or IP address of the server where the PostgreSQL database is running, 5432 is the port number on which the database is listening for connections, and mydatabase is the name of the database you want to connect to. You may need to replace http://52.201.238.10/ with the actual hostname or IP address of your server, and mydatabase with the name of your own database. 
                </p></li>
                <li><b>Username: </b><p> When connecting to a PostgreSQL database, you need to provide a valid username</p></li>
                <li><b>Password: </b><p> When connecting to a PostgreSQL database, you need to provide a valid password</p></li>
              </ul>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><a href="https://www.postgresql.org/" >Learn More</a></ListGroup.Item>
          </ListGroup>
        </Card>
        <br />
      </div>

      <div style={{
        margin: "20px",
      }}>
        <h1 style={{
        }}>PostgreSQL Form</h1>
        <Form onSubmit={handleSubmit} style={{
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
            }}>URL :</Form.Label>
            <Form.Control type="text" name="url" value={formData.url} onChange={handleInputChange}
              placeholder="Enter PostgreSQL URL" required />
            <br />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>Enter your username :</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange}
              placeholder="Enter your your username " required />
            <br />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>Enter your password :</Form.Label>
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
            <Button variant="primary" type="submit" onClick={handleTables}>Retrieve tables</Button>
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
            {viewData && <RenderModal data={psqlData} />}
          </div>
        </Form>
      </div>

      <div style={{
        display: "grid",
        textAlign: "center",
        width: "90%",
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

      {/* <div>
        <h1>Table List</h1>
        <ul>
          {tables.map(table => (
            <li key={table.table_name}>{table.table_name}</li>
          ))}
        </ul>

      </div> */}
    </div>
  );
}