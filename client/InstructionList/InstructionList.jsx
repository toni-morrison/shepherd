import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  FieldGroup
} from 'react-bootstrap';

export default class IntructionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      time: '',
      instruction: '',
      title: '',
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clearList = this.clearList.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.disableText = this.disableText.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addItem() {
    console.log('addItem fired');
    var item = this.state.time + ': ' + this.state.instruction;
    if (this.state.title !== '') {
      this.setState({
        list: [...this.state.list, item],
        time: '',
        instruction: ''
      });
    } else {
      this.setState({
        list: [...this.state.list, item],
        time: '',
        instruction: '',
        title: this.state.value,
        value: ''
      });
    }
  }
  clearList() {
    this.setState({
      list: [],
      title: ''
    });
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        title: this.state.value,
        value: ''
      });
    }
  }
  disableText() {
    return this.state.title === '';
  }

  render() {
    //ill add the time array to a helperfile and import it
    //Or more likely i will use the start and end times to render the
    //time in 15 min increments from start to end, instead of this. but this is for preMVP
    const timeFrame = [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30'
    ];

    const list = this.state.list.map(item => {
      return <ListGroupItem>{item}</ListGroupItem>;
    });

    const times = timeFrame.map(time => {
      return <option>{time}</option>;
    });

    return (
      <div id="full-list">
        <div id="list-render">
          <ControlLabel>Add Instructions</ControlLabel>
          <h3>{this.state.title}</h3>
          <FormGroup controlId="formControlsSelect">
            <ListGroup>{list}</ListGroup>
          </FormGroup>
        </div>

        <form id="instruction-list">
          <ControlLabel>Enter Title</ControlLabel>
          <FormControl
            disabled={!this.disableText()}
            name="value"
            type="text"
            value={this.state.value}
            placeholder="Enter Title"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <ControlLabel>Enter Instruction</ControlLabel>
          <FormControl
            name="instruction"
            type="text"
            value={this.state.instruction}
            placeholder="Enter instruction"
            onChange={this.handleChange}
          />

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Enter Time</ControlLabel>
            <FormControl
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
              componentClass="select"
              placeholder="select"
            >
              {times}
            </FormControl>
          </FormGroup>
          <Button type="button" onClick={() => this.addItem()}>
            Add Instruction
          </Button>
          <Button type="button" onClick={() => this.clearList()}>
            Clear
          </Button>
        </form>
      </div>
    );
  }
}
