import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default class HomePrice extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.values.includes('house')) {
      return (
        <div>
          <Row>
          <Col xs={5} xsOffset={2}>
          <h4>Home: ${this.props.home_rate}/day</h4>
          </Col>
          </Row>
        </div>
      )
    } else {
      return null
    }
  }
}