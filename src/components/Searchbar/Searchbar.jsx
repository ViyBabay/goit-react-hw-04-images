// import { render } from "@testing-library/react";
import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css'
// import  { toast }  from  'react-toastify';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };
  handleNameChange = evt => {
    this.setState({ imageName: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.imageName.trim() === '') {
      Notiflix.Notify.warning('Please, enter your request');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm_button}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"
              alt="seach"
            ></img>
          </button>

          <input
            className={style.SearchForm_input}
            type="text"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
