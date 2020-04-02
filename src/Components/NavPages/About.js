import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';


class About extends Component {
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


    render() {
        return (
            <>
            <Button onClick={this.handleModal}>About</Button>
            <Modal show={this.state.show} onHide={this.handleModal} backdrop="static">
            <Modal.Header closeButton><h2 tabIndex="0">About</h2></Modal.Header>
            <Modal.Body style={{ margin: '0 auto' }} >
                <p tabIndex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptas quaerat qui eaque, mollitia similique quisquam, alias officia possimus facilis totam a, sed eius obcaecati sapiente quia tenetur quas rem.</p>
            </Modal.Body>
            </Modal>
      </>
        )
    }
}

export default About
