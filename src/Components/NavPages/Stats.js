import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';


class Stats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false,
        }
    }
    
    handleModal = () => {
        this.setState({ show: !this.state.show });
        this.props.changeFocusTrap()
      }

      clearLocalStorage = () => {
        localStorage.clear()
    }
    render() {
        let totalRounds = JSON.parse(localStorage.getItem("totalRounds"));
        let totalScore = JSON.parse(localStorage.getItem("totalScore"));

        let wrongAnswers = totalRounds * 10 - totalScore;
        return (
            <>
            {/* Bootstrap modal dialog for my stat page */}
            <Button  onClick={this.handleModal}>Stats</Button>
            <Modal show={this.state.show} onHide={this.handleModal} backdrop="static">
            <Modal.Header closeButton><h2 tabIndex="0">Stats</h2></Modal.Header>
            <Modal.Body style={{ margin: '0 auto' }} >
            <h4 tabIndex="0">Total Game Rounds: <b>{totalRounds}</b></h4>
            <h4 tabIndex="0">Total Correct Score: <b>{totalScore}</b></h4>
            <h4 tabIndex="0">Total Incorrect Score: <b>{wrongAnswers}</b></h4>
            <button tabIndex="0" onClick={this.clearLocalStorage} aria-label={"Clear Score Button"}>Clear Score</button>
            </Modal.Body>
            </Modal>
      </>
        )
    }
}

export default Stats
