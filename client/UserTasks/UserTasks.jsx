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
      currentInstruction: [],
      currentInstructionID: '',
      modalShow: false
    }
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleTasksSelect = this.handleTasksSelect.bind(this);
    this.handleTasksEdit = this.handleTasksEdit.bind(this);
  }

  handleTasksSelect (instructions, ID) {
    this.setState ({
      modalShow : true,
      currentInstruction: instructions,
      currentInstructionID: ID
    })

  }
  
  handleTasksEdit () {
    console.log ('Editing Tasks ID: ', this.state.currentInstructionID)
  }
  
  handleModalClose () {
    this.setState ({
      modalShow: false
    })
  }
  render() {
    return(
      <div>
        <Grid>
          <Row>
            {
              instructions.map ((instructionSet) => (
                <Col md={4}>
                  <Button bsSize = 'large' block 
                    onClick = {function (){this.handleTasksSelect(instructionSet.instructions, instructionSet.instructionID)}.bind(this)}>{instructionSet.title}</Button>
                </Col>)
              )
            } 
            <Col md={4}>
              <Button bsSize = 'large' block>+</Button>
            </Col>
          </Row>
        </Grid>
        <TasksModal 
          instructions = {this.state.currentInstruction} 
          handleClose = {this.handleModalClose} 
          show = {this.state.modalShow}
          handleEdit = {this.handleTasksEdit}/>
      </div>
    )
  }
}
