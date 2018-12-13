import React from 'react';

import { PUBLISH_KEY } from '../../server/stripe_config.js';

import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StripeProvider apiKey={PUBLISH_KEY}>
        <div className="example">
          <h1>{this.props.displayTime}</h1>
          <h3>Amount Due: {'$ ' + this.props.price + '.00'}</h3>
          <Elements>
            <CheckoutForm
              id={this.props.id}
              handleClosePayment={this.props.handleClosePayment}
            />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
