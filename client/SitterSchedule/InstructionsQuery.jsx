import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'react-bootstrap';
import InstructionsModal from './InstructionsModal.jsx';

const GET_INSTRUCTIONS = gql`
  query findInstructions($id: ID!) {
    findInstructions(id: $id) {
      time
      desc
    }
  }
`;

class InstructionsQuery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instructions: [],
      showModal: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleClick(data) {
    this.setState({
      instructions: data,
      showModal: true
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div>
              <Button
                onClick={async () => {
                  const { data } = await client.query({
                    query: GET_INSTRUCTIONS,
                    variables: {
                      id: this.props.id
                    }
                  });
                  this.handleClick(data.findInstructions);
                }}
              >
                {this.props.name}
              </Button>
              <InstructionsModal
                showModal={this.state.showModal}
                instructions={this.state.instructions}
                name={this.props.name}
                toggleModal={this.toggleModal}
              />
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default InstructionsQuery;
