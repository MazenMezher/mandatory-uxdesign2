import React, { Component } from 'react'
import Quiz from "../Components/Quiz.js"
import "../Css/Menu.css"
import "../Css/Phone.css"
import "../App.css"

class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            clickedAbout: false,
            clickedStats: false,
            
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
            this.setState({clickedAbout: false})
            this.setState({clickedStats: false})
        }
    }

    clickedAbout = () => {
        this.setState({clickedAbout: true})
        this.setState({clickedStats: false})
    }
    
    clickedStats = () => {
        this.setState({clickedStats: true})
        this.setState({clickedAbout: false})
    }

    exitButton = () => {
        this.setState({clickedAbout: false})
        this.setState({clickedStats: false})
        
    }

    render() {
        const {clickedAbout, clickedStats} = this.state;


        let shownAbout = "";
        if(clickedAbout){
            shownAbout = "clickedAbout";
        } else if (!clickedAbout){
            shownAbout = "notClicked"
        }

        let showStats = "";
        if(clickedStats){
            showStats = "clickedStats"
        } else {
            showStats = "notClicked"
        }

        let totalRounds = JSON.parse(localStorage.getItem("totalRounds"));
        let totalScore = JSON.parse(localStorage.getItem("totalScore"));

        let wrongAnswers = totalRounds * 10 - totalScore;

        return (
                <div className="smartphone">
                    <div className="content">
                        <header>
                            <div id="nav">
                                <input type="checkbox" checked={this.state.checked} onChange={this.checkBoxOnChange.bind(this)} />
                                <span></span>
                                <span></span>
                                <span></span>
                                    
                                <ul id="menu">
                                    <li onClick={this.checkBoxOnChange}>Home</li>
                                    <li onClick={this.clickedStats}>Statistics</li>
                                    <li onClick={this.clickedAbout}>About</li>
                                </ul>
                            </div>
                                <h1>Quiz Master</h1>
                        </header>
                            <main>
                                <Quiz />
                                <div className={shownAbout}>
                                    <p>
                                        <button onClick={this.exitButton} >X</button>
                                        This is my product of a quiz game where you get to answer ten random quiz questions and get feedback on how well you did.
                                    </p>
                                </div>

                                <div className={showStats}>
                                <button onClick={this.exitButton}>X</button>
                                    <p>Games Played = {totalRounds}</p>
                                    <br/>
                                    <p>Correct Answers = {totalScore}</p>
                                    <br/>
                                    <p>Incorrect Answers = {wrongAnswers}</p>
                                </div>
                            </main>
                    </div>
                    </div>
        )
    }
}

export default Main