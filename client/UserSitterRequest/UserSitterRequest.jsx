import React from 'react';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import AddListToRequest from './AddListToRequest.jsx'

export default class UserSitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showAddList: false,
      showAddMessage: false,
      start: {hour: '', min: '', am: ''},
      end: {hour: '', min: '', am: ''}
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowList = this.handleShowList.bind(this);
  }

  componentDidMount(){
    let startHour, startMin, startAm, endHour, endMin, endAm;
    (Math.floor(this.props.start/60) % 12 === 0) ? startHour = 12 : startHour = Math.floor(this.props.start/60) % 12;
    startMin = this.props.start % 60;
    (startMin === 0) ? startMin = '00' : startMin = '30';
    (this.props.start <= 719) ? startAm = 'AM' : startAm = 'PM';

    (Math.floor(this.props.end/60) % 12 === 0) ? endHour = 12 : endHour = Math.floor(this.props.end/60) % 12;
    endMin = this.props.end % 60;
    (endMin === 0) ? endMin = '00' : endMin = '30';
    (this.props.end <= 719) ? endAm = 'AM' : endAm = 'PM';

    this.setState({
      start: {hour: startHour, min: startMin, am: startAm},
      end: {hour: endHour, min: endMin, am: endAm}
    })
  }

  handleClose() {
    this.setState({
      show: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }
  handleShowList() {
    this.setState({
      showAddList: !this.state.showAddList
    });
  }

  render() {
    if (this.props.id === this.props.review.id) {
      var currentDay = this.props.day
        return (
          <div className="request-modal" key={this.props.review.id}>
            <Modal show={this.props.show} onHide={this.props.showOff}>
              <Modal.Header closeButton>
                <Modal.Title>Pending Request</Modal.Title>
              </Modal.Header>
    
              <h3>Name: {this.props.first_name} {this.props.last_name}</h3>
              <h3>Date: {currentDay}</h3>
              <h3>Time: {this.state.start.hour}:{this.state.start.min} {this.state.start.am} to {this.state.end.hour}:{this.state.end.min} {this.state.end.am}</h3>
              <h3>Total Price: $175 </h3>
              <h3>
                List:{' '}
                <a href="#addList" onClick={this.handleShowList}>
                  Add List
                </a>
                <AddListToRequest show={this.state.showAddList} hide={this.handleShowList}/>
              </h3>
              <h3>
                Add Message:{' '}
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    componentClass="textarea"
                    placeholder="Enter Message"
                  />
                </FormGroup>
              </h3>
              <Button bsStyle="primary" bsSize="large" onClick={this.props.showOff}>
                Confirm
              </Button>
              <Button bsStyle="primary" bsSize="large" onClick={this.props.showOff}>
                Go Back
              </Button>
            </Modal>
          </div>
        )
    } else {
      return null
    }
  }
}
