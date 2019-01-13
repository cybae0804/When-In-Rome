import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { resetImageUpload, uploadImage } from '../../../actions';

class ImageUpload extends Component {
  state = {
    file: null,
    src: '',
    name: '',
    caption: ''
  }

  backToImages = () => {
    const { history, resetImageUpload } = this.props;

    resetImageUpload();

    history.push('/');
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
      src: '',
      name: '',
      caption: ''
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
          <button onClick={this.resetUpload}>Upload New Image</button>
          <button onClick={this.backToImages}>Back to Images</button>
        </div>
      );
    }

    return (
      <form onSubmit={this.handleUpload}>
        <div>
          <input type="file" accept="image/*" onChange={this.onFileChange} />
        </div>
        <div>
          <input type="text" id="name" onChange={({ target }) => this.setState({ name: target.value })} autoComplete="off" />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="text" id="caption" onChange={({ target }) => this.setState({ caption: target.value })} autoComplete="off" />
          <label htmlFor="caption">Caption</label>
        </div>
        <div>
          <h5>{src && 'Preview'}</h5>
          {this.renderImage(src)}
        </div>
        <div>
          {src && <button>Upload Image</button>}
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <h3>Upload an Image</h3>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => ({ status: images.uploadStatus });

export default connect(mapStateToProps, { resetImageUpload, uploadImage })(ImageUpload);
