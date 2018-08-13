import React from 'react';

const SitterRequest = props => (
  <div className="request-modal">
    //will add tooltip on hover //of name;
    <h3>name: (props.name)</h3>
    <h3>date: (props.date)</h3>
    <h3>time: (props.time)</h3>
    <h3>total price: (props.price)</h3>
    <h3>lists: (props.list)</h3>
    <h3>message: (props.message)</h3>
    <button type="button">Accept</button>
    <button type="button">Decline</button>
  </div>
);

export default SitterRequest;
