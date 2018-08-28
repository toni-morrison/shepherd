import React from 'react'
import { Popover, Modal, OverlayTrigger, Button } from 'react-bootstrap';
import { FIND_INSTRUCTIONS } from '../UserTasks/ApolloHelper.jsx';
import { Query } from 'react-apollo';



export default class AddListToRequest extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Query
        query={FIND_INSTRUCTIONS}
        variables={{ id: this.props.listId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span />;
          }
          if (error) {
            console.log('error: ', error);
            return <span />;
          }
          return(
            <Modal show={this.props.show} onHide={this.props.hide}>
              <Modal.Header closeButton>
                <Modal.Title>Instructions</Modal.Title>
              </Modal.Header>
              <ul>
              {data.findInstructions.map(instruction => {
                return <li key={instruction.id}>{instruction.desc}</li>
              })}
              </ul>
            </Modal>
          )
        }}
        </Query>
      </div>
    )
  }
}