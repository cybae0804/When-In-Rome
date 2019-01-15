import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import ImageUpload from '../../shared/image_upload/image_upload';
import { postExperience } from '../../../actions';

class ExperienceForm extends Component {
  renderInput(props) {
    return (
      <Fragment>
        <label htmlFor={props.id}>{props.label}</label>
        <input {...props.input} type="text" autoComplete="off" />
      </Fragment>
    );
  }

  handleAddExperience = async values => {
    console.log(values);
    await this.props.postExperience(values);

    this.props.history.push('/');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleAddExperience)} className="ui form container">
        <div className="field">
          <Field component={this.renderInput} id="occupation" name="occupation" label="Occupation" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="activity" name="activity" label="Activity" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="city" name="city" label="City" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="country" name="country" label="Country" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="price" name="price" label="Price" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="guests" name="guests" label="Guests" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="host_info" name="host_info" label="Host Info" />
        </div>
        <div className="field">
          <Field component={this.renderInput} id="activity_info" name="activity_info" label="Activity Info" />
        </div>
        <ImageUpload />
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
