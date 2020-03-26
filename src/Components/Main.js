import React, { Component } from 'react'
import Hamburger from "../Components/Hamburger.js"
import "../Css/Menu.css"
import "../Css/Phone.css"
class Main extends Component {
    render() {
        return (
            
                <div class="smartphone">
                    <div class="content">
                            <header>
                                <Hamburger />
                                <h1>Quiz Master</h1>
                            </header>
                            <main>
                                <button className="CenterButton">
                                    Start Quiz
                                </button>
                            </main>
                    </div>
                    </div>
        )
    }
}

export default Main




{/* <nav role="navigation">
<div id="menuToggle">

    <input type="checkbox" />

    <span></span>
    <span></span>
    <span></span>
    
    <ul id="menu">
    <a href="#"><li>Home</li></a>
    <a href="#"><li>About</li></a>
    <a href="#"><li>Info</li></a>
    <a href="#"><li>Contact</li></a>
    </ul>
</div>
</nav> */}