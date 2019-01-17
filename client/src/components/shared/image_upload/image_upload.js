import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { resetImageUpload, uploadImage } from '../../../actions';
import Input from '../input/input';

class ImageUpload extends Component {
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
    const { file, name, caption } = this.state;

    uploadImage({ name, caption }, file);
  }

  renderImage(src) {
    return (
      <div>
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

  renderForm() {
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
        <Field component={Input} id="image" name="image" label="Image Upload" type="file" accept="image/*" onChange={this.onFileChange} />
        <div>
          <h5>{src && 'Preview'}</h5>
          {this.renderImage(src)}
        </div>
        <div>
          {src && <button onClick={this.handleUpload}>Upload Image</button>}
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => ({ status: images.uploadStatus });

export default connect(mapStateToProps, { resetImageUpload, uploadImage })(ImageUpload);
