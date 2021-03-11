import React from 'react'
import {Link} from 'react-router-dom'
import '../header.css'

export default function Header({user}) {

    

    return (
        <header className="header">
            <h1 className="victory"><span className="victory-v">G</span>rupetto</h1>
            <nav>
                
                <Link to="/signup" className="logout">Logout</Link>
                
            </nav>
        </header>
    )
}
