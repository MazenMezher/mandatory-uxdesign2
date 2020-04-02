import React, { Component } from 'react'
import axios from "axios"
import { Button, Modal } from 'react-bootstrap';

import "../Css/Phone.css"
import "../Css/RadioButtons.css"

let rightAnswer = 0;
let totalGames = 0;
class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
            quizz: [],
            answered: [],
            rightAnswers: [],

            correctAnswers: '',
            showmodalBox: false,
            gameStart: false,
        }
    }
    
    removeGameButton = () => {
        this.setState({gameStart: true})
    }

    checkAnswers = (correctChoice, myChoice) => {
    
        let answer
    
        if (correctChoice === myChoice) {
          rightAnswer++;
          answer = myChoice;
        } else {
          answer = null;
        }
      }

    setGameBoard = () => {
        this.setState({ gameStart: true });
    this.setState({ showmodalBox: false });

    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
    this.setState({ correctAnswers: '' });
    
    totalGames++

    let totalRounds = JSON.parse(localStorage.getItem("totalRounds"));

    if (totalRounds !== null) {
      if (totalRounds === 0) {
        localStorage.setItem("totalRounds", JSON.stringify(1));
      }
      else if (totalRounds >= 1) {
        let played = JSON.parse(localStorage.getItem("totalRounds"));
        let updatePlayed = played += 1;
        localStorage.setItem("totalRounds", JSON.stringify(updatePlayed));
      }
    }
    else {
      localStorage.setItem("totalRounds", JSON.stringify(1));
    }

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => {
      res.data.results.map(q => {

        const newQuestion = {
          question: q.question
        };

        const answerChoises = [ ...q.incorrect_answers ];

        newQuestion.answer = Math.floor(Math.random() * 3) + 1;
        newQuestion.realAnswer = q.correct_answer;

        answerChoises.splice(
          newQuestion.answer -1,
          0,
          q.correct_answer
        );

        answerChoises.forEach((choice, index) => {
          newQuestion['choice' + (index + 1)] = choice;
        });
        let myQuizzArr = this.state.quizz;
        myQuizzArr.push(newQuestion);

        this.setState({ quizz: myQuizzArr });
    })
      })
}

clearGame = () => {
    this.setState({ gameStart: false });
    this.setState({ showmodalBox: false });
    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
    this.setState({ correctAnswers: '' });
  }

  onChange = (correctChoice, myChoice) => {

    let myRightAnswers = this.state.rightAnswers;
    myRightAnswers.push(correctChoice);
    this.setState({ rightAnswers: myRightAnswers });

    let myAnswers = this.state.answered;
    myAnswers.push(myChoice);
    this.setState({ answered: myAnswers });
  }

  handleModal = () => {
    this.setState({ showmodalBox: !this.state.showmodalBox });
    this.setState({ openDialog: true });

    let allAnswers = this.state.answered;
    let allrightAnswers = this.state.rightAnswers;

    let answers = 0;

    for (let i = 0; i < allAnswers.length; i++) {
      if (allrightAnswers[i] === allAnswers[i]) {
        answers++
      }
    }

    let totalScore = JSON.parse(localStorage.getItem("totalScore"));

    if (totalScore !== null) {
      if (totalScore === 0) {
        localStorage.setItem("totalScore", JSON.stringify(answers));
      } else if (totalScore >= 1) {
        let newScore = JSON.parse(localStorage.getItem("totalScore"));
        let totalUpdatedScore = newScore + answers;
        localStorage.setItem("totalScore", JSON.stringify(totalUpdatedScore));
      }
    }
    else {
      localStorage.setItem("totalScore", JSON.stringify(answers));
    }
    
    this.setState({ correctAnswers: answers });
  }

    render() {
      // Logic to hide the button once the game starts
        const {gameStart, quizz, showmodalBox, correctAnswers} = this.state
        let removeButton = "";
        let hideModalButton = ""
        if (gameStart){
            removeButton = "removeButton"
            hideModalButton = ""
        } else {
            hideModalButton = "HideModalButton"
            removeButton = ""
        }

        return (
            <>
            {/* A button that fetches 10 random questions and maps them out and on the onclick this button becomes hidden */}
            <button onClick={this.setGameBoard} className={removeButton} >Start Game</button>  
                {
                    quizz.map(x => {
                        const entities = {
                            '&#039;': "'",
                            '&quot;': '"',
                            '&ldquo;': '“',
                            '&rdquo;': '”',
                            "&ntilde;": "ñ",
                            "&eacute;": "é",
                            "&amp;": "&" ,
                            "&uuml;": "ü"
                        }
                // Replacing random wierd symbols
                        let correctChoice = x.realAnswer.replace(/&#?\w+;/g, match => entities[match]);
                        let questions = x.question.replace(/&#?\w+;/g, match => entities[match]);
                        let choice1 = x.choice1.replace(/&#?\w+;/g, match => entities[match]);
                        let choice2 = x.choice2.replace(/&#?\w+;/g, match => entities[match]);
                        let choice3 = x.choice3.replace(/&#?\w+;/g, match => entities[match]);
                        let choice4 = x.choice4.replace(/&#?\w+;/g, match => entities[match]);
                
                        return (
                            <>
            {/* A form used to render in my questions with four answer choices that has a radio button each as a choice */}
            <form>
            <p className="question" aria-label={"The question is" + questions} tabIndex="0">{questions}</p>
            <ul className="answer-ul">
              
            <div className="answers-div">
                <input aria-label={"Choice 1 is" + choice1} type="radio" id={choice1} className="radioStyle" name="question" value={choice1} onChange={() => this.onChange(correctChoice, choice1)} />
                <label htmlFor={choice1} className="labelSize">{choice1}</label>
            </div>

            <div className="answers-div">
                <input aria-label={"Choice 2 is" + choice2}  type="radio" id={choice2} className="radioStyle" name="question" value={choice2} onChange={() => this.onChange(correctChoice, choice2)} />
                <label htmlFor={choice2} className="labelSize">{choice2}</label>
            </div>

            <div className="answers-div">
                <input aria-label={"Choice 3 is" + choice3}  type="radio" id={choice3} className="radioStyle" name="question" value={choice3} onChange={() => this.onChange(correctChoice, choice3)} />
                <label htmlFor={choice3} className="labelSize">{choice3}</label>
            </div>

            <div className="answers-div">
                <input aria-label={"Choice 4 is" + choice4} type="radio" id={choice4} className="radioStyle" name="question" value={choice4} onChange={() => this.onChange(correctChoice, choice4)} />
                <label htmlFor={choice4} className="labelSize">{choice4}</label>
            </div>
            </ul>
            </form>
            </>
                    )
                    })
                }
                {/* Bootstrap button to submit my answers and get a feedback on how well you did aswell questions to play again or quit */}
                <div className={hideModalButton}>
                <Button onClick={this.handleModal}>Submit answers</Button>
                <Modal show={showmodalBox} onHide={this.handleModal} backdrop="static">
                    <Modal.Header closeButton><b tabIndex="0">Finished Score</b></Modal.Header>
                    <Modal.Body tabIndex="0">
                    <h1>Your score is:</h1>
                    <h3>{correctAnswers} / 10</h3>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.setGameBoard} >
                        Restart Game
                    </Button>
                    <Button onClick={this.clearGame}>
                        Return to Main
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </>
        )
    }
}

export default Quiz