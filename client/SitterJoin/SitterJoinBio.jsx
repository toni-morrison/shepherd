import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Well,
  Button
} from 'react-bootstrap';

export default class SitterJoinBio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <center>
          <h3>Bio</h3>
        </center>
        <Well bsSize="large" style={{ width: '100%' }}>
          <form>
            <Row>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Bio*</ControlLabel>
                <FormControl
                  name="bio"
                  type="text"
                  value={this.props.bio}
                  placeholder="Enter bio here"
                  onChange={this.props.handleInput}
                />
              </FormGroup>
            </Row>
            <Button
              name="bio"
              bsStyle="default"
              type="button"
              disabled
            >
              Prev
            </Button>
            <Button
              name="bio"
              bsStyle="primary"
              type="button"
              disabled={this.props.bio.length === 0}
              onClick={this.props.handleNavNext}
            >
              Next
            </Button>
          </form>
        </Well>
      </div>
    );
  }
}
