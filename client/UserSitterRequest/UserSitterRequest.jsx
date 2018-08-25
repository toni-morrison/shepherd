import React from 'react';
import { Button, Modal, Popover, OverlayTrigger, FormGroup, FormControl } from 'react-bootstrap';


export default class UserSitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showAddList: false,
      showAddMessage: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowList = this.handleShowList.bind(this);
  }

  componentDidMount(){
    if (this.props.showUserSitterRequest) {
      this.setState({
        show: true
      })
    }
    console.log(this.props.day)
    // is an array of objects
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
    //all information will passed to this component, for now dummy data
    const sitterPic = (
      <img
        id="userPicture"
        src="https://d7n0myfi538ky.cloudfront.net/production/users/2971/small/image1_1491361573.JPG?1491361573"
      />
    );

    const listPopover1 = (
      <Popover id="modal-popover" title="Instructions List 1">
        <div>
          <ul>
            <li>Take out the dog</li>
            <li>Give Mikey medicine</li>
            <li>Take the kids to the park with the dog</li>
            <li>Watch TV </li>
            <li>Put Mikey to bed at 8:30</li>
            <li>Put Tracey to bed at 9:30</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover2 = (
      <Popover id="modal-popover" title="Instructions List 2">
        <div>
          <ul>
            <li>Make some sandwiches for the kids</li>
            <li>Anything but fish sandwiches</li>
            <li>Feed the kids some doritos</li>
            <li>Feed the kids some cheese</li>
            <li>Feed the kids some whipped cream</li>
            <li>Feed the kids some candy</li>
            <li>Gosh darn our genetics</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover3 = (
      <Popover id="modal-popover" title="Instructions List 3">
        <div>
          <ul>
            <li>Something something that things</li>
            <li>Give me a high five</li>
            <li>Find my children</li>
            <li>If you cant thats fine also</li>
            <li>I am 90% sure I have children somewhere</li>
            <li>Dont set our house on fire</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover4 = (
      <Popover id="modal-popover" title="Instructions List 4">
        <div>
          <ul>
            <li>Hello? Can you hear me?</li>
            <li>I am trapped, help please.</li>
            <li>Where? in the computer i think.</li>
            <li>Dont worry about it actually, its nice here.</li>
          </ul>
        </div>
      </Popover>
    );

    const addList = (
      <Modal show={this.state.showAddList} onHide={this.handleShowList}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <div>
          <ul>
            <OverlayTrigger overlay={listPopover1}>
              <li>
                <a href="#popover">Instructions 1</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover2}>
              <li>
                <a href="#popover">Instructions 2</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover3}>
              <li>
                <a href="#popover">Instructions 3</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover4}>
              <li>
                <a href="#popover">Instructions 4</a>
              </li>
            </OverlayTrigger>
          </ul>
        </div>
      </Modal>
    );

    const namePopover = (
      <Popover id="modal-popover" title="Joana BabbyCarer">
        {sitterPic}
        <br />
        Other users have rated her 4.5/5
      </Popover>
    );

    if (this.props.show) {
      var currentDay = this.props.day
      var currentStart = this.props.start
      var currentEnd = this.props.end
      return this.props.reviews.map((review, index) => {
        return (
          <div className="request-modal" key={index}>
            {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
              Send Request
            </Button> */}
            <Modal show={this.props.show} onHide={this.props.showOff}>
              <Modal.Header closeButton>
                <Modal.Title>Pending Request</Modal.Title>
              </Modal.Header>
    
              <h3>
                Name:{' '}
                <OverlayTrigger overlay={namePopover}>
                  <a href="#popover">{review.user.first_name} {review.user.last_name}</a>
                </OverlayTrigger>
              </h3>
              <h3>Date: {currentDay}</h3>
              <h3>Time: {currentStart} to {currentEnd}</h3>
              <h3>Total Price: $175 </h3>
              <h3>
                List:{' '}
                <a href="#addList" onClick={this.handleShowList}>
                  Add List
                </a>
                {addList}
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
      })
    } else {
      return null
    }
  }
}
