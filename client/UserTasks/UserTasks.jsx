import React from 'react';
import {
  Image,
  Button,
  Thumbnail,
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import instructions from './instructions.js'
import TasksModal from './TasksModal.jsx'
export default class UserTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstruction: {}
    }
  }

  render() {
    return(
      <Grid>
        <Row>
          {
            instructions.map ((instructionSet) => (
              <Col md={4}>
                <Button bsSize = 'large' block>{instructionSet.title}</Button>
              </Col>)
            )
          } 
          <Col md={4}>
            <Button bsSize = 'large' block>+</Button>
          </Col>
        </Row>
      </Grid>
      <TasksModal instructions = {this.state.currentInstruction}/>
    )
  }
}
