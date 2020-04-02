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
            focusTrap: false,
        }
    }
// Keeps track on the checkbox if its checked or unchecked
    checkBoxOnChange = (e) => {
        if(this.state.checked !== e.target.checked) {
            this.setState({
                checked:e.target.checked,
                focusTrap: e.target.checked,
            })
        }
    }

    changeFocusTrap = () => {
        this.setState({
            focusTrap: !this.state.focusTrap,
        })
    }
    
    uncheck = () => {
        this.setState({checked: true}) 
    }

    clearLocalStorage = () => {
        localStorage.clear()
    }
    render() {
        return (
                <div className="smartphone">
                    <div className="content">
                        <header>
                            <div id="nav" >
                            <FocusTrap active={this.state.focusTrap}>
                                <div aria-label={"Menu Button"}>
                                <input aria-label={"Close Menu Button"} type="checkbox" checked={this.state.checked} onChange={this.checkBoxOnChange.bind(this)} className="focusNavItems" />
                                <span></span>
                                <span></span>
                                <span></span>

                                <ul id="menu">
                                    <Stats changeFocusTrap={this.changeFocusTrap} />
                                    <About changeFocusTrap={this.changeFocusTrap} />
                                </ul>
                                </div>
                            </FocusTrap> 
                            </div>
                                <h1 tabIndex="0" aria-label={"Game title"}>Quiz Master</h1>
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