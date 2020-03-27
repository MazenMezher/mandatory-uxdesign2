import React, { Component } from 'react'

export class Hamburger extends Component {
    render() {
        return (
            <>
                <div id="nav">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    
                    <ul id="menu">
                        <li>Home</li>
                        <li>About</li>
                        <li>Info</li>
                        <li>Contact</li>
                    </ul>
            </div>
            </>
            
        )
    }
}

export default Hamburger
