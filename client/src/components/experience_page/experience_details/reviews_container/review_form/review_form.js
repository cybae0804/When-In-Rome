import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { postReview, getExperienceDetails } from '../../../../../actions';
import Input from '../../../../shared/input/input';

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: '',
    }
  }

  handlePostReview = async values => {
    const { experience_id } = this.props.match.params;
    
    await this.props.postReview(values, experience_id);

    await this.props.getExperienceDetails(experience_id);

    this.props.reset();
  }

  render() {
    const { props: { handleSubmit }, handlePostReview } = this;

    return (
      <form onSubmit={handleSubmit(handlePostReview)} className="ui form container">
        <Field component={Input} id="review" name="review" label="Review" />
        <Field component={Input} type="number" id="rating" name="rating" label="Rating" />
        <button className="ui positive button">Submit</button>
      </form>
    );
  }
}

function validate({review, rating}) {
  const errors = {};

  if (!review) errors.review = 'Please enter a review';

  if (!rating || rating < 1 || rating > 5) errors.rating = 'Please enter valid rating between 1 and 5';

  return errors;
}

function mapStateToProps(state) {
  return {
    
  };
}

ReviewForm = reduxForm({
  form: 'review-form',
  validate,
})(ReviewForm);

export default connect(mapStateToProps, {
  postReview,
  getExperienceDetails,
})(withRouter(ReviewForm));
