import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { postReview } from '../../../../../actions';
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

    // setTimeout(() => {
    //   this.props.history.push('/dashboard');
    // }, 2000);
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

function validate({ }) {
  const errors = {};

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
})(withRouter(ReviewForm));
