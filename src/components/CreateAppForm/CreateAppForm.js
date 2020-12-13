import { Component } from 'react';

import { createApp } from '../../services/appsApi';

// Image preview
// https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

export default class CreateAppForm extends Component {
  state = {
    image: null,
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleCreateApp = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', 'My App 1');
    formData.append('description', 'Very cool app');
    formData.append('link', 'https://google.com');
    formData.append('image', this.state.image);

    createApp(formData)
      .then((res) => console.log(res))
      .catch((error) => console.dir(error));
  };

  render() {
    return (
      <form onSubmit={this.handleCreateApp}>
        <input type="file" accept="image/*" onChange={this.handleImageChange} />
        <button type="submit">Create App</button>
      </form>
    );
  }
}
