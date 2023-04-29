import './App.css';
import Navbar from './components/Navbar'
import Header from './components/header'
import './logos/bg.css'
import bg from './logos/bgImage.jpeg'
function App() {
  return (
    <div >
      
      <div >
        <Navbar style={{
          zIndex:"10000000000000000"
        }}/>
       <div>

       <img src={bg} alt="bg" style={{
            background:"rgba(0,0,0,0.5)",
            // filter:"brightness(0.4)",
            opacity:"0.3",
            width: '100%',
            height: '100%',
            // maxHeight: '40000px',
            // position: 'relative',
            // backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}/>
       
          <div style={{
            position: 'absolute',
            zIndex: '1000000000',
            top: '20px',
            left: '0',
            right: '0',
           
          }}>
        <Header />
        
        <div style={{
          marginLeft: '30px',
          alignItems: 'left',
          width: '100%',

        }}>
     

          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            // alignItems: 'end',
            flexDirection: 'row',
            width: '100%',

          }}>
            <div
              style={{
                width: '50vw',
                margin: '30px 0px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 15px 18px black',
                display: 'flex',
                justifyContent: 'center',
                // width: '100%',
                //hover
                backgroundColor: 'white',
                transition: 'background-color 0.3s ease-out',
                ':hover': {
                  backgroundColor: 'darkblue'
                }
              }}
            >
              <article style={{
                padding: '10px',
                margin: '0 0',
                width: '100%',
                maxWidth: '800px',
                textAlign: 'left',
                fontSize: '1.2rem',
                lineHeight: '1.5',
                letterSpacing: '1px',
                color: '#000000',
                fontWeight: 'bold'


              }}>

                <h1 style={{
                  textAlign: 'left',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'red',
                  letterSpacing: '1px',
                  margin: '0 auto',
                  padding: '10px',
                  width: '100%',

                }}>What is DB HUB?</h1>
                Welcome to our Database Hub web application, built using the MERN stack and Apache Spark! Our application allows you to access and view data from multiple databases all in one place, saving you time and effort.
              </article>
            </div>
          </div>

          <div style={{
            // marginRight: '150px',
            // alignItems: 'left',
            width: '100%'

          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              // alignItems: 'end',
              flexDirection: 'row',
              width: '100%',
              // right: '0',
              // left: '0',
            }}>
              <div style={{
                width: '50vw',
                margin: '30px 30px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 15px 18px black' ,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                //hover
                transition: 'background-color 0.3s ease-out',
                ':hover': {
                  backgroundColor: 'darkblue'
                }
              }}>
                <h1 style={{
                  textAlign: 'right',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#3bb19b',
                  letterSpacing: '1px',
                  margin: '0 auto',
                  padding: '10px'

                }}>Features</h1>
                <ul>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',



                  }}>
                    Access and view data from multiple databases such as MySQL and PostgreSQL, MongoDB and AWS all in one place.
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Simple and easy-to-use UI
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Efficient data retrieval using Apache Spark
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Secure and safe database connections using JDBC drivers
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Export data to CSV, JSON and more for further analysis
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Centralized data at a place.
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div style={{

            alignItems: 'left',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              // alignItems: 'end',
              flexDirection: 'row',
              width: '100%'
            }}>
              <div style={{
                width: '50vw',
                margin: '30px 10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 15px 18px black',
                //hover
                transition: 'background-color 0.3s ease-out',
                ':hover': {
                  backgroundColor: 'darkblue'
                }
              }}>
                <h1 style={{
                  textAlign: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#00D100',
                  letterSpacing: '1px',
                  margin: '0 auto',
                  padding: '10px'

                }}>What So Special</h1>
                <ul>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',



                  }}>
                    <b>Multi-database support</b>: This application supports multiple databases, which could make it more versatile and useful to a wider range of users who work with different database types.
                    It can handle both SQL and NoSQL databases</li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Export functionality: This application provides the ability to export data in various formats, which could save users time and effort by allowing them to easily move data between different systems.
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Integration with Spark: By using Spark, our application can potentially handle large volumes of data more efficiently, which could be beneficial for users with big data needs.
                  </li>
                  <li style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                    Centralized Data: This application provides the ability to access data from common tables across different databases, which could make it easier for users who need to work with data from multiple sources.
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

        </div>

        </div>
      </div>
    </div>
  );
}

export default App;
