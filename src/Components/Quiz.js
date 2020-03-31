import React, { Component } from 'react'
import axios from "axios"
import { Button, Modal } from 'react-bootstrap';

import "../Css/Phone.css"
import "../Css/RadioButtons.css"


let rightAnswer = 0;
class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            gameStart: false,
            quizz: [],

            answered: [],
            rightAnswers: [],
            correctAnswers: '',

            showmodalBox: false
        }
    }
    
    removeGameButton = () => {
        this.setState({gameStart: true})
    }

    onInputClick = (e) => {
        console.log(e.target)
    }

    checkAnswers = (svar, myChoice) => {
        // console.log(svar);
        // console.log(myChoice);
    
        let answer
    
        if (svar === myChoice) {
        console.log('rätt svar');
          rightAnswer++;
          answer = myChoice;
        } else {
        //   console.log('fel svar!');
          answer = null;
        }
    
        console.log(rightAnswer);
        // console.log(answer);
      }

    setGameBoard = () => {
        this.setState({ gameStart: true });
    this.setState({ showmodalBox: false });

    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
    this.setState({ correctAnswers: '' });

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => {
      res.data.results.map(q => {
        // console.log(q);

        const newQuestion = {
          question: q.question
        };

        const answerChoises = [ ...q.incorrect_answers ];
        // console.log(answerChoises);

        newQuestion.answer = Math.floor(Math.random() * 3) + 1;
        newQuestion.realAnswer = q.correct_answer;
        // console.log(newQuestion);


        answerChoises.splice(
          newQuestion.answer -1,
          0,
          q.correct_answer
        );
        // console.log(answerChoises);

        answerChoises.forEach((choice, index) => {
          newQuestion['choice' + (index + 1)] = choice;
        });

        // console.log(answerChoises);
        // console.log(newQuestion);

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

  onChange = (svar, myChoice) => {

    let myAnswers = this.state.answered;
    myAnswers.push(myChoice);
    this.setState({ answered: myAnswers });

    let myRightAnswers = this.state.rightAnswers;
    myRightAnswers.push(svar);
    this.setState({ rightAnswers: myRightAnswers });
  }

  handleModal = () => {
    this.setState({ showmodalBox: !this.state.showmodalBox });

    this.setState({ openDialog: true });

    let allAnswers = this.state.answered;
    let allrightAnswers = this.state.rightAnswers;

    let answers = 0;

    for (let i = 0; i < allAnswers.length; i++) {
      // console.log(allAnswers[i]);
      // console.log(i);
      if (allrightAnswers[i] === allAnswers[i]) {
        console.log('right answer');
        answers++
      } else {
        console.log('false answer');
      }
    }

    console.log(answers);
    this.setState({ correctAnswers: answers });
  }


    render() {
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
        // console.log(quizz)
        
        return (
            <>
            <button onClick={this.setGameBoard} className={removeButton}>Start Game</button>  
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
                
                          let svar = x.realAnswer.replace(/&#?\w+;/g, match => entities[match]);
                
                          let questions = x.question.replace(/&#?\w+;/g, match => entities[match]);
                          let choice1 = x.choice1.replace(/&#?\w+;/g, match => entities[match]);
                          let choice2 = x.choice2.replace(/&#?\w+;/g, match => entities[match]);
                          let choice3 = x.choice3.replace(/&#?\w+;/g, match => entities[match]);
                          let choice4 = x.choice4.replace(/&#?\w+;/g, match => entities[match]);
                
                        return (
                            <>
            {/* <form> */}
            <p className="question">{questions}</p>
            <ul className="answer-ul">
              <div className="answers-div">
                <input type="radio" id={choice1} className="radioStyle" name="question" value={choice1} onChange={() => this.onChange(svar, choice1)} />
                <label htmlFor={choice1} className="labelSize">{choice1}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice2} className="radioStyle" name="question" value={choice2} onChange={() => this.onChange(svar, choice2)} />
                <label htmlFor={choice2} className="labelSize">{choice2}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice3} className="radioStyle" name="question" value={choice3} onChange={() => this.onChange(svar, choice3)} />
                <label htmlFor={choice3} className="labelSize">{choice3}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice4} className="radioStyle" name="question" value={choice4} onChange={() => this.onChange(svar, choice4)} />
                <label htmlFor={choice4} className="labelSize">{choice4}</label>
              </div>
            </ul>
            {/* </form> */}
            {/* <button className={doneBtnClass} onClick={() => this.doneBtn(x)}>{doneBtnTxt}</button> */}
            </>
                        )
                    })
                }
                <div className={hideModalButton}>
                <Button onClick={this.handleModal}>Open Modal</Button>
                <Modal show={showmodalBox} onHide={this.handleModal} backdrop="static">
                    <Modal.Header closeButton>Modal Head</Modal.Header>
                    <Modal.Body>
                    <h1>Your score is:</h1>
                    <h3>{correctAnswers} / 10</h3>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.setGameBoard}>
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

// lägga in radio buttons i li och sedan använda onclick logik för kolla om det är === correct_answer