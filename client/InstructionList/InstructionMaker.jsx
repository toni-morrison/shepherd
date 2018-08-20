import React from 'react';
import moment from 'moment';
import {
  Table,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Modal
} from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_TODO_LIST_NAME = gql`
  mutation updateListName($id: ID!, $name: String!) {
    updateListName(id: $id, name: $name) {
      id
    }
  }
`;

export default class InstructionMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: '',
      time: [],
      start: '',
      end: '',
      dropDownTime: '',
      orgTimes: [],
      renderSave: false,
      newName: ''
    };
    this.intervals = this.intervals.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onHandleSave = this.onHandleSave.bind(this);
    this.onHandleSaveClose = this.onHandleSaveClose.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount() {
    this.setTimes();
    if (this.props.currentInstruction.length > 0) {
      this.setState({
        start: this.props.currentInstruction[0][0],
        end: this.props.currentInstruction[
          this.props.currentInstruction.length - 1
        ][0],
        time: this.props.currentInstruction
      });
    }
  }

  setTimes() {
    this.setState(
      {
        time: this.intervals(
          this.state.start || '6:00 PM',
          this.state.end || '11:45 PM'
        )
      },
      () => {
        this.setState({
          dropDownTime: this.state.start || '6:00 pm',
          orgTimes: this.state.time
        });
      }
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addItem() {
    var ddt = this.state.dropDownTime;
    var idx;
    for (var i = 0; i < this.state.time.length; i++) {
      var timeTup = this.state.time[i];
      if (timeTup.indexOf(ddt) >= 0) {
        idx = i;
      }
    }
    var newTup = [ddt, this.state.instruction];
    var clone = Array.from(this.state.time);
    clone.splice(idx, 1, newTup);
    this.setState({
      time: clone,
      instruction: ''
    });
  }

  intervals(startString, endString) {
    var start = moment(startString, 'hh:mm a');
    var end = moment(endString, 'hh:mm a');
    start.minutes(Math.ceil(start.minutes() / 15) * 15);
    var result = [];
    var current = moment(start);
    while (current <= end) {
      var timeStr = current.format('h:mm a');
      result.push([timeStr]);
      // result.push(current.format('h:mm a'));
      current.add(30, 'minutes');
    }
    return result;
  }
  onHandleSave() {
    this.setState({
      renderSave: true
    });
  }

  onHandleSaveClose() {
    this.setState({
      renderSave: false
    });
  }

  onClear() {
    this.setState({
      time: this.state.orgTimes
    });
  }

  onSave(updateListName) {
    updateListName({
      variables: {
        id: this.props.currentListId,
        name: this.state.newName
      }
    }).then(({ data }) => {
      console.log('dataFromNameChange:', data);
    });
  }

  render() {
    const times = this.state.time.map((time, idx) => {
      return (
        <tr>
          <td key={idx}>{time[0]}</td>
          <td key={idx + ' content'}>{time[1]}</td>
        </tr>
      );
    });

    const dropTimes = this.state.time.map((time, idx) => {
      return <option key={idx}>{time[0]}</option>;
    });
    const startTimes = this.intervals('00:00', '23:45').map((time, idx) => {
      return <option key={idx}>{time}</option>;
    });
    const endTimes = this.intervals('00,00', '23:45').map((time, idx) => {
      return <option key={idx}>{time}</option>;
    });
    return (
      <Mutation mutation={UPDATE_TODO_LIST_NAME}>
        {(updateListName, { loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :(</p>;
          }
          return (
            <div>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Task</th>
                  </tr>
                </thead>
                <tbody>{times}</tbody>
              </Table>

              <div id="full-list">
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Start Time</ControlLabel>
                  <FormControl
                    name="start"
                    value={this.state.start}
                    onChange={this.handleChange}
                    componentClass="select"
                    placeholder="select"
                  >
                    <option value="none">Start Time</option>
                    {startTimes}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>End Time</ControlLabel>
                  <FormControl
                    name="end"
                    value={this.state.end}
                    onChange={this.handleChange}
                    componentClass="select"
                    placeholder="select"
                  >
                    <option value="none">End Time</option>
                    {endTimes}
                  </FormControl>
                  <Button type="button" onClick={this.setTimes}>
                    Set
                  </Button>
                </FormGroup>
                <form id="instruction-list">
                  <ControlLabel>Enter Instruction</ControlLabel>
                  <FormControl
                    id="instructions"
                    name="instruction"
                    type="text"
                    value={this.state.instruction}
                    placeholder="Enter instruction"
                    onChange={this.handleChange}
                  />
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Enter Time</ControlLabel>
                    <FormControl
                      name="dropDownTime"
                      value={this.state.dropDownTime}
                      onChange={this.handleChange}
                      componentClass="select"
                      placeholder="select"
                    >
                      {dropTimes}
                    </FormControl>
                  </FormGroup>

                  <Button type="button" onClick={() => this.addItem()}>
                    Add Instruction
                  </Button>
                  <Button type="button" onClick={() => this.onClear()}>
                    Clear
                  </Button>
                  <Button type="button" onClick={() => this.onHandleSave()}>
                    Save
                  </Button>
                </form>
              </div>
              <Modal
                show={this.state.renderSave}
                onHide={this.onHandleSaveClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Save Instructions</Modal.Title>
                </Modal.Header>
                <div>
                  <ControlLabel>Name Instructions</ControlLabel>
                  <FormControl
                    id="newName"
                    name="newName"
                    type="text"
                    value={this.state.newName}
                    placeholder={this.props.name}
                    onChange={this.handleChange}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      this.props.changeName(this.state.newName);
                      this.onSave(updateListName);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Modal>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
