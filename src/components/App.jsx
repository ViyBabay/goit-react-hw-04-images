import { Component } from 'react';
import { searchImage } from './service/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import style from './App.module.css';

// import { ToastContainer } from 'react-toastify';

export class App extends Component {
 state = {
    imageName: '',
    images: [],
    isLoading: false,
    page: 1,
    largePhoto: '',
  };

componentDidUpdate(_, prevState) {
    const { page, imageName } = this.state;
    if (prevState.page !== page || prevState.imageName !== imageName) {
      this.setState({ isLoading: true });
      searchImage(imageName, page)
        .then(images => {
          if (images.hits.length === 0) {
            Notiflix.Notify.warning(
              'Sorry, there are no results for your query. Try another query.'
            );
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));
        })
        .catch(err => new Error(Notiflix.Notify.failure(`Request error`)))
        .finally(() => this.setState({ isLoading: false }));
    }
    return;
  }

  handelFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };
  onClickModal = url => {
    this.setState({ largePhoto: url });
  };
  onCloseModal = () => {
    this.setState({
      largePhoto: '',
    });
  };
  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handelFormSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onClick={this.onClickModal}
          ></ImageGallery>
        )}
        {this.state.largePhoto && (
          <Modal
            largePhotoURL={this.state.largePhoto}
            closeModal={this.onCloseModal}
          />
        )}
        {this.state.images.length > 0 && (
          <Button onClick={this.onLoadMore} loading={this.state.isLoading} />
        )}
      </div>
    );
  }
}
