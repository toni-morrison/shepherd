import React from 'react';
import {
  Button,
  Row,
  Col,
  Well,
  FormGroup,
  InputGroup,
  ControlLabel,
  FormControl,
  Alert
} from 'react-bootstrap';

export default class SitterJoinPrices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showErr: false
    };

    this.checkValid = this.checkValid.bind(this);
  }

  checkValid(e) {
    var decRegex = /^$|^\d+\.?\d{0,2}$/;
    if (
      this.props.child.match(decRegex) &&
      this.props.childAddl.match(decRegex) &&
      this.props.pet.match(decRegex) &&
      this.props.petAddl.match(decRegex) &&
      this.props.house.match(decRegex) &&
      (this.props.child || this.props.pet || this.props.house) &&
      !(this.props.childAddl && !this.props.child) &&
      !(this.props.petAddl && !this.props.pet)
    ) {
      this.setState({ showErr: false });
      this.props.handleNavNext(e);
    } else {
      this.setState({ showErr: true });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <center>
              <h3>Pricing</h3>
            </center>
            {this.state.showErr ? (
              <Alert bsStyle="warning">
                Please make sure that all of your inputs are valid dollar
                amounts!
              </Alert>
            ) : (
              ''
            )}
            <Well bsSize="large" style={{ width: '100%' }}>
              <Row>
                <Col xs={5}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Child Rate</ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <FormControl
                        name="child"
                        type="text"
                        value={this.props.child}
                        placeholder="Enter rate for babysitting per Hour"
                        onChange={this.props.handleInput}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col xs={5} xsOffset={1}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Additional Child Rate</ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <FormControl
                        name="childAddl"
                        type="text"
                        value={this.props.childAddl}
                        placeholder="Enter rate for babysitting additional children per Hour"
                        onChange={this.props.handleInput}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={5}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Pet Rate</ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <FormControl
                        name="pet"
                        type="text"
                        value={this.props.pet}
                        placeholder="Enter rate for petsitting per Hour"
                        onChange={this.props.handleInput}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col xs={5} xsOffset={1}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Additional Pet Rate</ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <FormControl
                        name="petAddl"
                        type="text"
                        value={this.props.petAddl}
                        placeholder="Enter rate for petsitting additional pets per Hour"
                        onChange={this.props.handleInput}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={5}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>House Rate</ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <FormControl
                        name="house"
                        type="text"
                        value={this.props.house}
                        placeholder="Enter rate for housesitting per Hour"
                        onChange={this.props.handleInput}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Button
                name="pricing"
                bsStyle="default"
                type="button"
                onClick={this.props.handleNavPrev}
              >
                Prev
              </Button>
              <Button
                name="pricing"
                bsStyle="primary"
                type="button"
                onClick={this.checkValid}
                style={{ float: 'right' }}
              >
                Next
              </Button>
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}
