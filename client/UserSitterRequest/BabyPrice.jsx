import React from 'react';
import { DropdownButton, MenuItem, Col, Row } from 'react-bootstrap';

export default class BabyPrice extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.values.includes('baby')){
      return (
        <div>
        <Row>
        <Col xs={1}>
        <DropdownButton title={this.props.childState} id='children'>
        <MenuItem key='' onClick={(e) => this.props.setNumber(e, '', 'children')}>Select Children</MenuItem>
        {[...Array(10).keys()].map(children => {
          return(
            <MenuItem key={children} onClick={(e) => this.props.setNumber(e, children, 'children')}>{children}</MenuItem>
          )
        })}
        </DropdownButton>
        </Col>
        <Col xs={9} xsOffset={1}>
        <h4>Child: ${this.props.child_rate}/hour | Additional Child: ${this.props.child_addl}/hour</h4>
        </Col>
        </Row>
        </div>
      )
    } else {
      return null
    }
  }
}