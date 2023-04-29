import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import './style.css';
const PostgresConnection = () =>{

    const [connectionList, setConnectionList] = useState([]);
    const [isUpdated, setIsUpdated] = useState('');
    const [updatedUrl, setUpdatedUrl] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
//Function to fetch connections
    const getConnections = async() =>{
        try{
            const result = await axios.get("http://localhost:3000/api/db/postgres/getDetails");
            setConnectionList(result.data);
            console.log(setConnectionList);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        getConnections();
    },[]);


    //Update Form

    const renderUpdateForm = (e) =>(
        <Form onSubmit={(e)=>{updateConnections(e)}}> 
      <Form.Group>
          <Form.Label className='uH'>URL:</Form.Label>
          <Form.Control type="text" name="url" value={updatedUrl} className='input' onChange={e=>(setUpdatedUrl(e.target.value))}
                        placeholder="Enter you new PostgreSQL URL" />
                        <br />
        </Form.Group>
        <Form.Group>
          <Form.Label className='uH'>Enter your username :</Form.Label>
          <Form.Control type="text"  name="username" value={updatedUsername} className='input' onChange={e=>(setUpdatedUsername(e.target.value))}
                        placeholder="Enter your new username "/>
                        <br />
        </Form.Group>
        <Form.Group>
          <Form.Label className='uH'>Enter your password :</Form.Label>
          <Form.Control type="password"  name="password" value={updatePassword} className='input' onChange={e=>{setUpdatePassword(e.target.value)}} placeholder="Enter your new password" />
          <br />
        </Form.Group>
        <Button variant="primary" type="submit" className='uBotton'>
           Update Details
        </Button>
        </Form>
    )


    //Function to update connections
    const updateConnections = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.put(`http://localhost:3000/api/db/postgres/getDetails/${isUpdated}`,{url: updatedUrl, username: updatedUsername, password: updatePassword} )
            const updatedConnectionIndex = connectionList.findIndex(connection => connection._id === isUpdated);
            const updatedConnectionUrl = connectionList[updatedConnectionIndex].url = updatedUrl;
            const updatedConnectionUsername = connectionList[updatedConnectionIndex].username = updatedUsername;
            const updatedConnectionPassword = connectionList[updatedConnectionIndex].password = updatePassword;


            setUpdatedUrl('');
            setUpdatePassword('');
            setUpdatedUsername('');
            console.log(res.data);
            getConnections();
        }catch(error){
            console.error(error);
        }
    }


    //Function to delete connections

    const deleteConnections = async(id) =>{
        try{
        const res = await axios.delete(`http://localhost:3000/api/db/postgres/getDetails/${id}`);
        const newConnectionList = connectionList.filter(connection => connection._id !==id);
        setConnectionList(newConnectionList);
        }catch(err){
            console.error(err);
        }
    }
    return(
        <>
      
        <h1 className='h1'>PostgresConnections</h1>
        <div>{
            connectionList.map(connection =>(<div>
                 {
                isUpdated === connection._id
                ?
                renderUpdateForm()
                :
                <>
                <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td className='tdH'>
                            URL
                        </td>
                        <td>
                            {connection.url}
                        </td>
                    </tr>
                    <tr>
                        <td className='tdH'>User Name</td>
                        <td>
                            {connection.username}
                        </td>
                    </tr>
                    <tr>
                        <td className='tdH' > 
                            Password 
                        </td>
                        <td>
                            {connection.password}
                        </td>
                    </tr>

                </tbody>
            </Table>
            <button onClick={()=>{setIsUpdated(connection._id)}} className='bottons' style={{
                color: 'white',
                backgroundColor: 'green',
                border: 'none',
                marginRight: '25px'
            }}>
            Update</button>
            <button onClick={() => deleteConnections(connection._id)} className='bottons' style={{
                color: 'white',
                backgroundColor: 'red',
                border: 'none',

            }}>Delete</button>
           </>  } </div>))
        }
            </div>
            </>
    )
 
}

export default PostgresConnection;