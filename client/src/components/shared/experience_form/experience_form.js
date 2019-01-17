import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import ImageUpload from '../../shared/image_upload/image_upload';
import { postExperience } from '../../../actions';
import Input from '../input/input';

class ExperienceForm extends Component {
  handleAddExperience = async values => {
    console.log('File info', this.state);
    await this.props.postExperience(values, this.state);

    // this.props.history.push('/');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleAddExperience)} className="ui form container">
        <Field component={Input} id="occupation" name="occupation" label="Occupation" />
        <Field component={Input} id="activity" name="activity" label="Activity" />
        <Field component={Input} id="city" name="city" label="City" />
        <Field component={Input} id="country" name="country" label="Country" />
        <Field component={Input} id="price" name="price" label="Price" />
        <Field component={Input} id="guests" name="guests" label="Guests" />
        <Field component={Input} id="host_info" name="host_info" label="Host Info" />
        <Field component={Input} id="activity_info" name="activity_info" label="Activity Info" />
        <ImageUpload />
        <input type="file"/>
        <div>
          <button>Save</button>
        </div>
      </form>
    );
  }
}

function validate() {

}

function mapStateToProps(state, props) {
  return {};
}

ExperienceForm = connect(mapStateToProps, {
  postExperience,
})(withRouter(ExperienceForm));

export default reduxForm({
  form: 'experience-form',
  validate,
})(ExperienceForm);
