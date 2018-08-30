import React from 'react';
import { DropdownButton, MenuItem, Col, Row } from 'react-bootstrap';

export default class PetPrice extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.values.includes('pet')) {
      return (
        <div>
        <Row>
        <Col xs={1}>
        <DropdownButton title={this.props.petState} id='pet'>
        <MenuItem key='' onClick={(e) => this.props.setNumber(e, '', 'pets')}>Select Pets</MenuItem>
        {[...Array(10).keys()].map(pets => {
          return(
            <MenuItem key={pets} onClick={(e) => this.props.setNumber(e, pets, 'pets')}>{pets}</MenuItem>
          )
        })}
        </DropdownButton>
        </Col>
        <Col xs={9} xsOffset={1}>
        <h4>Pet: ${this.props.pet_rate}/day | Additional Pets: ${this.props.pet_addl}/day</h4>
        </Col>
        </Row>
        </div>
      )
    } else {
      return null
    }
  }
}