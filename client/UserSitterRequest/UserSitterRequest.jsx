import React from 'react';
import { Button, Modal, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import AddListToRequest from './AddListToRequest.jsx'
import BabyPrice from './BabyPrice.jsx'
import PetPrice from './PetPrice.jsx'
import HomePrice from './HomePrice.jsx'

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
      date: '',
      children: 'Children',
      pets: 'Pets',
      home: 0,
      total: 0
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowList = this.handleShowList.bind(this);
    this.addList = this.addList.bind(this)
    this.setChildren = this.setChildren.bind(this)
    this.setPets = this.setPets.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
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

    if (this.props.startDate === this.props.endDate) {
      this.setState({
        start: {hour: startHour, min: startMin, am: startAm},
        end: {hour: endHour, min: endMin, am: endAm},
        date: this.props.startDate
      })
    } else {
      this.setState({
        start: {hour: startHour, min: startMin, am: startAm},
        end: {hour: endHour, min: endMin, am: endAm},
        date: this.props.startDate + 'to' + this.props.endDate
      })
    }

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

  setChildren(e, num) {
    this.setState({
      children: num
    }, this.updateTotal())
  }

  setPets(e, num) {
    this.setState({
      pets: num
    }, this.updateTotal())
  }

  updateTotal() {
    var total = 0
    if (this.state.home === 1) {
      total += this.props.home_rate
    }
    if (this.state.children !== 'Select Children') {
      var parsed = parseInt(this.state.children)
      if (parsed === 1) {
        total += this.props.child_rate
      } else if (parsed > 1) {
        total += this.props.child_rate
        total += (this.props.child_addl * (parsed - 1))
      }
    }
    if (this.state.pets !== 'Select Pets') {
      var parsed = parseInt(this.state.pets)
      if (parsed === 1) {
        total += this.props.pet_rate
      } else if (parsed > 1) {
        total += this.props.pet_rate
        total += (this.props.pet_addl * (parsed - 1))
      }
    }
    this.setState({
      total: total
    })
  }

  render() {
    if (this.props.id === this.props.review.id) {
        return (
          <div className="request-modal" key={this.props.review.id}>
            <Modal show={this.props.show} onHide={this.props.showOff}>
              <Modal.Header closeButton>
                <Modal.Title>Pending Request</Modal.Title>
              </Modal.Header>

              <h3>Name: {this.props.first_name} {this.props.last_name}</h3>
              
              <h3>Date: {this.props.day} {this.state.date}</h3>

              <h3>Time: {this.state.start.hour}:{this.state.start.min} {this.state.start.am} to {this.state.end.hour}:{this.state.end.min} {this.state.end.am}</h3>

              <h3>Total Price: ${this.state.total} </h3>
              <HomePrice
                home_rate={this.props.home_rate}
                values={this.props.values}/>

              <BabyPrice
                child_rate={this.props.child_rate}
                child_addl={this.props.child_addl}
                values={this.props.values}
                setChildren={this.setChildren}
                childState={this.state.children}/>

                <PetPrice
                  pet_rate={this.props.pet_rate}
                  pet_addl={this.props.pet_addl}
                  values={this.props.values}
                  setPets={this.setPets}
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
