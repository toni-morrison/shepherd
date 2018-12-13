import React from 'react';
import StarRatings from 'react-star-ratings';
import { fiveStar, fourStar, threeStar, twoStar, oneStar } from './Synonyms.js';
import { wordJumble } from './ReviewHelper.js';
import { ToggleButtonGroup, ToggleButton, FormControl } from 'react-bootstrap';
import ReviewButton from './ReviewButton.jsx';
import UpdateSitter from './UpdateSitter.js';

import Payment from '../Payment/Payment.jsx';

import { Row, Col, Tab, Nav, NavItem, Modal, Button } from 'react-bootstrap';

const stars = {
  1: oneStar,
  2: twoStar,
  3: threeStar,
  4: fourStar,
  5: fiveStar
};

export default class UserReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      renderWords: [],
      value: [],
      textarea: '',
      user: this.props.user,
      sitterId: '',
      id: this.props.id,
      renderPayment: false,
      paid: false
    };
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClosePayment = this.handleClosePayment.bind(this);
  }

  componentDidMount() {
    //maybe assign the user/Id/appt ID to the state to pass to the DB
  }

  onChangeRating(newRating) {
    this.setState({
      rating: newRating,
      renderWords: wordJumble(stars[newRating]),
      value: []
    });
  }
  onHandleClick(e) {
    this.setState({
      value: e
    });
  }
  handleChange(e) {
    this.setState({
      textarea: e.target.value
    });
  }
  handleSave() {
    this.setState(
      {
        rating: 3,
        renderWords: [],
        value: [],
        textarea: ''
      },
      () => {
        this.setState({
          renderPayment: true
        });
      }
    );
  }

  handleClosePayment() {
    this.setState(
      {
        renderPayment: false,
        paid: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            paid: false
          });
          this.props.closeReviewModal();
        }, 1500);
      }
    );
  }

  render() {
    // if (this.props.sitterName.length === 0) {
    //   let sitterName = 'Your Sitter';
    // } else {
    //   let sitterName = this.props.sitterName;
    // }
    const buttons = this.state.renderWords.map(word => {
      return (
        <ToggleButton className="review-toggle-button" value={word}>
          {word}
        </ToggleButton>
      );
    });
    return (
      <div className="review">
        <div className="review-stars">
          <StarRatings
            rating={this.state.rating}
            starRatedColor="Gold"
            starHoverColor="SpringGreen"
            changeRating={this.onChangeRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <div className="review-title">
          <h3>What did you think of {this.props.sitterName}? </h3>
          <img id="sitterPic" src={this.props.sitterPic} />
        </div>
        <div className="review-buttons">
          <ToggleButtonGroup
            onChange={this.onHandleClick}
            value={this.state.value}
            type="checkbox"
          >
            {buttons}
          </ToggleButtonGroup>
        </div>
        <br />
        <div className="review-text">
          <FormControl
            onChange={this.handleChange}
            value={this.state.textarea}
            componentClass="textarea"
            placeholder="Enter a review!"
          />
        </div>
        <ReviewButton
          handleSave={this.handleSave}
          id={this.state.id}
          userRating={this.state.rating}
          userWords={this.state.value}
          userReview={this.state.textarea}
        />
        <Modal className="payment-modal" show={this.state.renderPayment}>
          <Modal.Header>
            <Modal.Title>Make A Payment!</Modal.Title>
          </Modal.Header>
          <Payment
            price={this.props.price}
            displayTime={this.props.displayTime}
            handleClosePayment={this.handleClosePayment}
            user={this.props.user}
            id={this.state.id}
          />
        </Modal>

        {this.state.paid && (
          <div id="running-cash">
            <img
              id="running-cash"
              src="https://78.media.tumblr.com/bd0e0030518c3ede2f96a698ef89ed14/tumblr_okblpveg9I1u6w1edo1_500.gif"
            />
          </div>
        )}
      </div>
    );
  }
}
