import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Grid, Col, Row, Button, Jumbotron, Image } from 'react-bootstrap';
import Login from '../Login/Login.jsx';
import Signup from '../Signup/Signup.jsx';

let fullpageOptions = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  autoScrolling: true,
  scrollHorizontally: true
};

export default class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactFullpage
        {...fullpageOptions}
        render={({ state, fullpageApi }) => {
          return (
            <div>
              <div className="section" id="section0">
                <div style={{ position: 'absolute', right: '1em', top: '1em' }}>
                  <Button>Log In</Button>
                  <Button bsStyle="info">Sign Up</Button>
                </div>
                <Jumbotron
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    textAlign: 'center'
                  }}
                >
                  <h1>Shepherd</h1>
                  <p>Peace of mind for you</p>
                  <Button
                    bsStyle="primary"
                    onClick={() => fullpageApi.moveSectionDown()}
                  >
                    Learn More
                  </Button>
                </Jumbotron>
              </div>
              <div className="section" id="section1">
                <Jumbotron style={{ backgroundColor: 'rgba(255,255,255,1.0)' }}>
                  <Grid>
                    <Row style={{ alignItems: 'center', display: 'flex' }}>
                      <Col md={9}>
                        <h1>Easy to Use</h1>
                        <p>
                          Shepherd makes finding a housesitter, petsitter, or
                          babysitter easy.
                        </p>
                        <Button bsStyle="primary">Sign Up Now</Button>
                      </Col>
                      <Col md={3}>
                        <Image
                          src="https://i.imgur.com/S1hQpzk.png"
                          responsive
                          id="splashImg0"
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Jumbotron>
              </div>
            </div>
          );
        }}
      />
    );
  }
}
