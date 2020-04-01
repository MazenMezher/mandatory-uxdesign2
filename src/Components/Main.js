import React, { Component, useRef } from 'react'
import Quiz from "../Components/Quiz.js"
import About from "../Components/NavPages/About.js"
import Stats from "../Components/NavPages/Stats.js"
import FocusTrap from 'focus-trap-react'
import "../Css/Menu.css"
import "../Css/Phone.css"
import "../App.css"

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        }
    }
    
    uncheck = () => {
        this.setState({checked: true}) 
    }

    checkBoxOnChange = (e) => {
        if(this.state.checked !== e.target.checked) {
            this.setState({
                checked:e.target.checked
            })
        }
    }
    
    render() {

        return (
                <div className="smartphone">
                    <div className="content">
                        <header>
                            <div id="nav">
                                
                            <FocusTrap active={this.state.checked}>
                                <div>
                                <input type="checkbox" checked={this.state.checked} onChange={this.checkBoxOnChange.bind(this)} className="focusNavItems" />
                                <span></span>
                                <span></span>
                                <span></span>

                                <ul id="menu">
                                    <Stats />
                                    <About />
                                </ul>
                                
                                </div>
                            </FocusTrap> 
                        
                                
                            </div>
                                <h1>Quiz Master</h1>
                        </header>
                            <main>
                                <Quiz />
                            </main>
                    </div>
                    </div>
        )
    }
}

export default Main