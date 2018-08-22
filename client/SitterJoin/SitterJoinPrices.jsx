import React from 'react';
import { Button, Grid, Row, Col, Well, FormControl } from 'react-bootstrap';

export default class SitterJoinPrices extends React.Component {
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

                  <Col xs={2}>
                    <FormControl
                    type="text"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount' />
                  </Col>

                  <Col xs={2} xsOffset={2}>
                  <h4>Additional Child:</h4><br/>
                  </Col>

                  <Col xs={2}>
                    <FormControl
                    type="text"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount' />
                  </Col>
                </Row>

                <Row>
                  <Col xs={1}>
                  <h4>Pet:</h4> 
                  </Col>

                  <Col xs={2}>
                    <FormControl
                    type="text"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount' />
                  </Col>

                  <Col xs={2} xsOffset={2}>
                  <h4>Additional Pet:</h4><br/>
                  </Col>

                  <Col xs={2}>
                    <FormControl
                    type="text"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount' />
                  </Col>
                </Row>


                <Row>
                  <Col xs={1}>
                  <h4>House:</h4> 
                  </Col>

                  <Col xs={2}>
                    <FormControl
                    type="text"
                    // value={}
                    // onChange={SUMFUNCTION}
                    placeholder='Enter dollar amount' />
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
