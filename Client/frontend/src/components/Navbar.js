import {useState} from "react"
import "../navbar.css"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"

export default function Navbar(){
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    return(
        <nav className="navigation" style={{
            backgroundColor:"#D2FBA4",
            padding:"10px",
            position:"static",
        }}>
            <a href="/" className="brand-name" style={{
                fontWeight:"bold",
                // boxShadow:  '0 2px 5px #ccc',
               
            }}>
                DBHUB
            </a>
            <button className="hamburger" onClick={() => { setIsNavExpanded(!isNavExpanded)}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
            </button>
            <button className={styles.white_btn} onClick={handleLogout} style={{
                marginLeft:"20px",
                // padding:"5px",
                
            }}>
					Logout
				</button>
            <div 
             className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"} >
                <ul>
                    <li>
                        <Link to="/" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>Home</Link>
                    </li>
                    {/* <li>
                        <Link style={{
                            textDecoration:"none",
                            color:"black"
                        }} to="/about">About</Link>
                    </li> */}
                    <li>
                        <a href="/postgresql" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>PostgreSQL</a>
                    </li>
                    <li>
                        <a href="/mysql" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>MySQL</a>
                    </li>
                    <li>
                        <a href="/aws" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>AWS</a>
                    </li>
                    <li>
                        <a href="/mongodb" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>MongoDB</a>
                    </li>
                    <li>
                        <a href="/manageConnections" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>Manage Connections</a>
                    </li>
                    <li>
                        <a href="/getData" style={{
                            textDecoration:"none",
                            color:"black"
                        }}>Centralized Data</a>
                    </li>
                </ul>
             </div>
        </nav>
    );
}