import React from 'react';
import { Button, Grid, Row, Col, Well, FormControl } from 'react-bootstrap';

export default class SitterSetPrices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Row>
          <Col xs={12}>
            <center><h3>Pricing</h3></center>
              <Well bsSize="large" style={{ width:'100%' }}>
                <Row>
                  <Col xs={1}>
                  <h4>Child:</h4> 
                  </Col>

                  <Col xs={3}>
                    <FormControl
                    type="number"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount per hour' />
                  </Col>

                  <Col xs={2} xsOffset={2}>
                  <h4>Additional Child:</h4><br/>
                  </Col>

                  <Col xs={3}>
                    <FormControl
                    type="number"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount per hour' />
                  </Col>
                </Row>

                <Row>
                  <Col xs={1}>
                  <h4>Pet:</h4> 
                  </Col>

                  <Col xs={3}>
                    <FormControl
                    type="number"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount per day' />
                  </Col>

                  <Col xs={2} xsOffset={2}>
                  <h4>Additional Pet:</h4><br/>
                  </Col>

                  <Col xs={3}>
                    <FormControl
                    type="number"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount per day' />
                  </Col>
                </Row>


                <Row>
                  <Col xs={1}>
                  <h4>House:</h4> 
                  </Col>

                  <Col xs={3}>
                    <FormControl
                    type="number"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount per day' />
                  </Col>
                </Row>
                <br/>
                <Button>Click to Update</Button>
              </Well>
          </Col>
        </Row>
      </div>
    )
  }
}
