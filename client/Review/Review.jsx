import React from 'react';
import StarRatings from 'react-star-ratings';
import { fiveStar, fourStar, threeStar, twoStar, oneStar } from './Synonyms.js';
import { wordJumble } from './ReviewHelper.js';
import { ToggleButtonGroup, ToggleButton, FormControl } from 'react-bootstrap';
import ReviewButton from './ReviewButton.jsx';

const stars = {
  1: oneStar,
  2: twoStar,
  3: threeStar,
  4: fourStar,
  5: fiveStar
};

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      renderWords: [],
      value: [],
      textarea: '',
      user: '',
      sitter: '',
      //hardcoded appt id for testing
      id: 'cjl9gl6hrqesx07849oag4k6u'
    };
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    //maybe assign the user/sitter/appt ID to the state to pass to the DB
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
    this.setState({ rating: 3, renderWords: [], value: [], textarea: '' });
  }

  render() {
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
          <h3>What did you think of your sitter? </h3>
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
          reviewWords={this.state.value}
          userReview={this.state.textarea}
        />
      </div>
    );
  }
}
