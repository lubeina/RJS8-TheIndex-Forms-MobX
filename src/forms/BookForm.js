import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors: [this.props.author.id]
  };

  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state, this.props.author);
    if (!bookStore.errors) {
      this.props.closeModal();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <label htmlFor="exampleFormControlSelect1">Choose a color:</label>

          <select
            className="form-control"
            id="exampleFormControlSelect1"
            name="color"
            onChange={this.handleChange}
          >
            <option value="">Color</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
