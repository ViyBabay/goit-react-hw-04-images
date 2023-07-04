import { useState, useEffect } from 'react';
import { searchImage } from './service/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import style from './App.module.css';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largePhoto, setLargePhoto] = useState('');

  useEffect(() => {
    if (page !== 1 || imageName !== '') {
      setIsLoading(true);
      searchImage(imageName, page)
        .then(data => {
          const newImages = data.hits;
          if (newImages.length === 0) {
            Notiflix.Notify.warning(
              'Sorry, there are no results for your query. Try another query.'
            );
          }
          setImages(prevImages => [...prevImages, ...newImages]);
        })
        .catch(err => {
          console.error('Request error', err);
          Notiflix.Notify.failure('Request error');
        })
        .finally(() => setIsLoading(false));
    }
  }, [page, imageName]);

  const handelFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const onClickModal = url => {
    setLargePhoto(url);
  };

  const onCloseModal = () => {
    setLargePhoto('');
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handelFormSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={onClickModal} />
      )}
      {largePhoto && (
        <Modal largePhotoURL={largePhoto} closeModal={onCloseModal} />
      )}
      {images.length > 0 && <Button onClick={onLoadMore} loading={isLoading} />}
    </div>
  );
};
