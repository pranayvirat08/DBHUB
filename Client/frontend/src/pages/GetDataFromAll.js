import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function RenderTable(fullData){
  const {data} = fullData;

  return(
<div style={{
        display: "grid",
        textAlign: "center",
         width: "90%",
        alignItems:"center",
        margin: "0 auto",
        padding: "20px",
        bottom: "50%",
      }}>

        <h4 style={{
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}>
        Centralized data</h4>
        <Table striped bordered hover style={{
          marginTop:"30px",
        }}>
         
           <thead>
            <tr>
              {data && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>

          
          <tbody style={{
            textAlign: "center",
            

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
        
      </div> 

  )
}

const GetData = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState("");
  const [checkedJSON, setCheckedJSON] = useState(false);
  const [checkedParquet, setCheckedParquet] = useState(false);
  const [checkedCSV, setCheckedCSV] = useState(false);
  const [type, setType] = useState("noFile");
  const [showTable, setShowTable] = useState(false);
  
   

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData(value);
  };

const handleClick6 = (event) => {
  if(checkedJSON){
    setType("json");
   }
   else if(checkedParquet){
     setType("parquet");
   }
  else if(checkedCSV){
     setType("csv");
   }
   else{
    setType("noFile");
   }
      //console.log('Table name:', formData);
      axios.defaults.baseURL = "http://34.228.30.99:3000"
      axios.get('/execute-spark-job-all',{
        params: {
          table: formData,
          file: type,
        },} ).then(response => {
        
        const parsedData = JSON.parse(response.data.output);
        console.log(parsedData);
        if(parsedData.length === 0){
          alert("No such table exists");
        }
        else{
        setTableData(parsedData);
        setShowTable(true);
       
        }
        
      })  .catch(error => {
        console.log(error);
      } );
}

  const handleSubmit = (event) => {
    event.preventDefault();
      //Reload the page
      
  }


 const handleClick = async (event) => {
   try {
     event.preventDefault();
     const response = await axios.get('http://34.228.30.99:3000/api/db/download',{
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
   } catch (error) {
     console.error(error);
   }
 };
 
  return (
    <div>

      <Navbar />
      
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
      <Form onSubmit={handleSubmit} style={{
        border: "1px solid grey",
        padding: "20px",
        borderRadius: "8px",
        width: "50rem",
        top: "50%",
        left: "50%",
        

      }}>
        <Form.Group>
          <Form.Label style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}>Enter table name:</Form.Label>
          <Form.Control type="text" name="url" onChange={handleChange}
            placeholder="Enter Table name " required />
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
        <Form.Check type="checkbox" label="JSON" checked={checkedJSON} onChange={() => {setCheckedJSON(!checkedJSON);
          setType("json")
        } } />
        </div>
        <div style={{
            display: "flex",
            padding: "10px",
            flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
      
         }}>
        <Form.Check type="checkbox" label="Parquet" checked={checkedParquet} onChange={() => {setCheckedParquet(!checkedParquet);
         setType("parquet")}} />
        </div >
        <div style={{
            display: "flex",
            padding: "10px",
            flexDirection: 'row',
      alignItems: 'left',
      justifyContent: 'left',
      
         }}>
        <Form.Check type="checkbox" label="CSV" checked={checkedCSV} onChange={() => {setCheckedCSV(!checkedCSV);
         setType("csv")}} />
        </div>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "end",
          padding: "10px"
        }}>
          <Button variant="primary" type="submit"  style={{
            marginRight: "10px",
            backgroundColor: "#00D100",
            border: "none",
            color: "white"

          }} onClick={handleClick6}>
            Get Data
          </Button>
         <button style={{
            backgroundColor: "#00D100",
            border: "none",
            color: "white",
            borderRadius: "8px",
            padding: "10px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            

            
          }}onClick={handleClick}>
            Download
            </button>
            
            
          
        </div>
      </Form>
      </div>
      </div>
      <div>
            { showTable && <RenderTable data={tableData} />}
            </div>


       
    </div>
  );
};



export default GetData;