import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { postExperience } from '../../../actions';
import Input from '../input/input';
import { resetImageUpload, uploadImage } from '../../../actions';
import './experience_form.css';

class ExperienceForm extends Component {
  state = {
    file: null,
  }

  onFileChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = e => this.setState({ src: e.target.result });

    reader.readAsDataURL(file);

    this.setState({ file });
  }

  handleUpload = e => {
    e.preventDefault();

    const { uploadImage } = this.props;
    const { file, name } = this.state;

    uploadImage(name, file);
  }

  renderImage(src) {
    return (
      <div className="image-container">
        {src && <img src={src} style={{ maxWidth: '100%' }} alt="Uploaded image preview" />}
      </div>
    );
  }

  resetUpload = () => {
    this.setState({
      file: null,
    });

    this.props.resetImageUpload();
  }

  renderImageStatus() {
    const { src } = this.state;
    const { status } = this.props;

    if (status === 'in-progress') {
      return <h4>Image Uploading</h4>;
    }

    if (status === 'complete') {
      return (
        <div>
          <h4>Image Upload Successful</h4>
          {this.renderImage(src)}
          <button onClick={this.resetUpload}>Re-upload</button>
        </div>
      );
    }

    return (
      <Fragment>
        <input type="file" accept="image/*" onChange={this.onFileChange} />
        <div>
          {this.renderImage(src)}
        </div>
      </Fragment>
    );
  }

  handleAddExperience = async values => {
    const { file } = this.state;

    await this.props.postExperience(values, file);

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
        <Field component={Input} id="host" name="host" label="Host" />
        <Field component={Input} id="host_info" name="host_info" label="Host Info" />
        <Field component={Input} id="activity_info" name="activity_info" label="Activity Info" />
          {this.renderImageStatus()}
          <button>Save</button>
      </form>
    );
  }
}

function validate() {

}

const mapStateToProps = ({ images }) => ({ status: images.uploadStatus });

ExperienceForm = connect(mapStateToProps, {
  postExperience,
  uploadImage,
  resetImageUpload,
})(withRouter(ExperienceForm));

export default reduxForm({
  form: 'experience-form',
  validate,
})(ExperienceForm);
