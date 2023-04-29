import React,{useState,useContext} from 'react';
import PsqlConnections from '../components/ManageConnections/postgresConnections';
import MySQLConnections from '../components/ManageConnections/mysqlConnections';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from '../components/Navbar';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Connections = () => {
    return (
        <div>
              <Navbar />
           <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                width:'100%'
           }}>
            <div
                style={{
                    width: '40vw',
                    margin: '30px 30px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow:  '0 2px 8px #ccc',
                    //hover
                    transition: 'background-color 0.3s ease-out',
        ':hover': {
          backgroundColor: 'darkblue'
        }
                }}
            >
               
                <PsqlConnections/>
            </div>
            <div style={{
                    width: '40vw',
                    margin: '30px 30px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow:  '0 2px 8px #ccc',
                    //hover
                }}>
            <MySQLConnections/>
            </div>
           </div>

        </div>
    )

}

export default Connections;