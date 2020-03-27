import React, { Component } from 'react'
import "../Css/Phone.css"
import axios from "axios"

class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             gameStart: false,
             quizz: [],
        }
    }
    
    removeGameButton = () => {
        this.setState({gameStart: true})
    }

    componentDidMount() {
        axios(`https://opentdb.com/api.php?amount=10`)
        .then(res => {
            res.data.results.map(question => {

                const newQuestion = {
                    question: question.question
                };

                
                const choices = [ ...question.incorrect_answers ];

                newQuestion.answer = Math.floor(Math.random() * 3) + 1;

                choices.splice(
                    newQuestion.answer -1,
                    0,
                    question.correct_answer
                )

                choices.forEach((choice, index) => {
                    newQuestion["choice" + (index +1)] = choice;
                })

                let quizArray = this.state.quizz;
                quizArray.push(newQuestion);

                this.setState({ quizz: quizArray})
            })
        })
    }
    render() {
        const {gameStart, quizz} = this.state
        let removeButton = "";
        if (gameStart){
            removeButton = "removeButton"
        } else {
            removeButton = ""
        }
        

        return (
            <>  
                {
                    quizz.map(x => {
                        return (
                            <>
                                <p>{x.question}</p>

                                <ul>
                                <li>{x.choice1}</li>
                                <li>{x.choice2}</li>
                                <li>{x.choice3}</li>
                                <li>{x.choice4}</li>
                                </ul>
                            </>
                        )
                    })
                }
                <button className={removeButton} onClick={this.removeGameButton}>Start Game</button>
            </>
        )
    }
}

export default Quiz
