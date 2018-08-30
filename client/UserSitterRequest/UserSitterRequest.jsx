import React from 'react';
import { Button, Modal, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import AddListToRequest from './AddListToRequest.jsx'
import BabyPrice from './BabyPrice.jsx'
import PetPrice from './PetPrice.jsx'
import HomePrice from './HomePrice.jsx'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'

const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $email: String!
    $id: ID!
    $pets: Int
    $children: Int
    $price: Float!
    $comment: String!
    $set: [String!]!
    $todoListId: ID!
    $day: String
    $start: Int!
    $end: Int!
  ) {
    createAppointment(
      email: $email
      id: $id
      pets: $pets
      children: $children
      price: $price
      comment: $comment
      set: $set
      todoListId: $todoListId
      day: $day
      start: $start
      end: $end
    ) {
      id
    }
  }
`

export default class UserSitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showAddList: false,
      start: {hour: '', min: '', am: ''},
      end: {hour: '', min: '', am: ''},
      listName: 'Select List',
      listId: '123',
      children: 'Children',
      pets: 'Pets',
      home: 0,
      price: 0,
      message: '',
      appointmentId: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowList = this.handleShowList.bind(this);
    this.addList = this.addList.bind(this)
    this.setNumber = this.setNumber.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.handleMutation = this.handleMutation.bind(this)
  }

  componentDidMount(){
    //formats start and end times
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
      end: {hour: endHour, min: endMin, am: endAm},
    })

    if (this.props.values.includes('house')) {
      this.setState({
        home: 1
      })
    }
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

  addList(e, id) {
    this.setState({
      listName: e.target.text,
      listId: id
    })
  }

  setNumber(e, num, type) {
    this.setState({
      [type]: num
    }, () => {this.updateTotal()})
  }

  updateTotal() {
    var total = 0
    if (this.state.home === 1) {
      total += this.props.home_rate
    }
    if (this.state.children !== 'Children') {
      var parsed = parseInt(this.state.children)
      if (parsed === 1) {
        total += this.props.child_rate
      } else if (parsed > 1) {
        total += this.props.child_rate
        total += (this.props.child_addl * (parsed - 1))
      }
    }
    if (this.state.pets !== 'Pets') {
      var parsed = parseInt(this.state.pets)
      if (parsed === 1) {
        total += this.props.pet_rate
      } else if (parsed > 1) {
        total += this.props.pet_rate
        total += (this.props.pet_addl * (parsed - 1))
      }
    }
    var hours = (parseInt(this.props.end) - parseInt(this.props.start))/60;
    total = total * hours;
    this.setState({
      price: total
    })
  }

  setMessage(e) {
    this.setState({
      message: e.target.value
    })
  }


  handleMutation(createAppointment) {
    let pets, children;
    if (this.state.pets === 'Pets') {
      pets = 0
    } else {
      pets = this.state.pets
    }

    if (this.state.children === 'Children') {
      children = 0
    } else {
      children = this.state.children
    }

    if (this.state.price !== 0) {
      createAppointment({
        variables: {
          email: this.props.user,
          id: this.props.id,
          pets: pets,
          children: children,
          price: this.state.price,
          comment: this.state.message,
          set: this.props.values,
          todoListId: this.state.listId,
          day: this.props.startDate,
          start: this.props.start,
          end: this.props.end
        }
      }).then(({ data }) => {
        console.log(data)
        this.showOff();
      })
    }
  }

  render() {
    if (this.props.id === this.props.review.id) {
        return (
          <Mutation mutation={CREATE_APPOINTMENT}>
          {(createAppointment, { loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error :(</p>;
            }

            return (
              <div className="request-modal" key={this.props.review.id}>
                <Modal show={this.props.show} onHide={this.props.showOff}>
                  <Modal.Header closeButton>
                    <Modal.Title>Pending Request</Modal.Title>
                  </Modal.Header>

                  <h3>Name: {this.props.first_name} {this.props.last_name}</h3>

                  <h3>Date: {this.props.day} {this.state.date}</h3>

                  <h3>Time: {this.state.start.hour}:{this.state.start.min} {this.state.start.am} to {this.state.end.hour}:{this.state.end.min} {this.state.end.am}</h3>

                  <h3>Total Price: ${this.state.price} </h3>
                  <HomePrice
                    home_rate={this.props.home_rate}
                    values={this.props.values}/>

                  <BabyPrice
                    child_rate={this.props.child_rate}
                    child_addl={this.props.child_addl}
                    values={this.props.values}
                    setNumber={this.setNumber}
                    childState={this.state.children}/>

                    <PetPrice
                      pet_rate={this.props.pet_rate}
                      pet_addl={this.props.pet_addl}
                      values={this.props.values}
                      setNumber={this.setNumber}
                      petState={this.state.pets}/>

                  <h3>Instruction List: (optional)<br/>
                    <DropdownButton title={this.state.listName} id='dropdown'>
                      <MenuItem key='' onClick={(e) => this.addList(e, '')}>Select List</MenuItem>
                      {this.props.lists.findTodoLists.map((list) => {
                        return(
                          <MenuItem key={list.id} onClick={(e) => this.addList(e, list.id)}>{list.name}</MenuItem>
                        )
                      })}
                    </DropdownButton>{' '}<Button onClick={this.handleShowList}>View</Button>

                    <AddListToRequest
                      show={this.state.showAddList}
                      hide={this.handleShowList}
                      listId={this.state.listId}/>
                  </h3>
                  <h3>
                    Add Message:{' '}
                    <FormGroup controlId="formControlsTextarea">
                      <FormControl
                        componentClass="textarea"
                        placeholder="Enter Message"
                        onChange={this.setMessage}
                      />
                    </FormGroup>
                  </h3>
                  <Button bsStyle="primary" bsSize="large" onClick={() => this.handleMutation(createAppointment)}>
                    Confirm
                  </Button>
                  <Button bsStyle="primary" bsSize="large" onClick={this.props.showOff}>
                    Go Back
                  </Button>
                </Modal>
              </div>
                )
              }}
          </Mutation>
        )
    } else {
      return null
    }
  }
}
