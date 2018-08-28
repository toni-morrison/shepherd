import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button } from 'react-bootstrap';
import { MAKE_PAYMENT } from './PaymentHelper.js';
import { Mutation } from 'react-apollo';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.handleSendPayment = this.handleSendPayment.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleSendPayment(updateAppointment) {
    updateAppointment({ variables: { id: this.props.id, status: 'Paid' } });
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token);
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });
    if (response.ok) console.log('Purchase Complete!');
  }

  render() {
    return (
      <Mutation mutation={MAKE_PAYMENT}>
        {(updateAppointment, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          return (
            <div className="checkout">
              <p>Would you like to complete the purchase?</p>
              <div className="card-field">
                <CardElement />
              </div>
              <Button
                type="button"
                onClick={() => {
                  this.submit;
                  this.props.handleClosePayment();
                  this.handleSendPayment(updateAppointment);
                }}
              >
                Send
              </Button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default injectStripe(CheckoutForm);
