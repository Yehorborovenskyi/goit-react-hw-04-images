import React from 'react';
import { useState, useEffect } from 'react';
import  css from 'App.module.css'

import  SearchBar  from './Searchbar/Searchbar';
import  ImagesApiService from './services/api'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';



const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

export  function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  const firstRender = search === '' && status === STATUS.idle;
  const emptyLineSomeSearch = search==='' && status !== STATUS.idle

  useEffect(()=>{
    if(firstRender){
    return
    }
    if(emptyLineSomeSearch){
      setStatus(STATUS.resolved);
      setImages(images=>[...images]);
    }
    async function fetchData() {
      try {
        const imagesApiService = new ImagesApiService();
        console.log(imagesApiService)
        imagesApiService.query = search;
        const imagesObject = await imagesApiService.getImages(page);
        const hits = imagesObject.hits;
        setImages(i => [...i, ...hits]);
        setSearch(search);
        setStatus(STATUS.resolved);
      } catch (error) {
        setError(error);
        setStatus(STATUS.rejected);
      }
    }
    fetchData();
  }
  ,[emptyLineSomeSearch, firstRender, page, search])

  const handleSubmit = async query => {
    if (search !== query.input) {
      setImages([]);
      setPage(1);
      setSearch(query.input);
      setStatus(STATUS.pending);
    } else {
      return alert(
        `You have already watched images by search of key word "${search}"`
      );
    }
  };

  const loadMore = () => {
    setStatus(STATUS.pending);
    setPage(page + 1);
  };


  const bigGallery =
  status === STATUS.resolved && images.length > 0 && images.length >= 12;
  const smallGallery =
  status === STATUS.resolved && images.length > 0 && images.length < 12;
  const badRequest = status === STATUS.resolved && images.length === 0;


  return (
    <div className={css.Section}>

    <SearchBar onSubmit={handleSubmit}/>

    {status === STATUS.idle && (<p>Search some images above...</p>)}{emptyLineSomeSearch &&  <><p>Search some images above...</p>{' '}<p>Default images without search below...</p></>}

    {status === STATUS.pending && (<><ImageGallery images={images} /> <Loader /></>)}

    {status === STATUS.rejected && (<p>Something went wrong... More details about error: {error.message}</p>)}

    {bigGallery && (<><ImageGallery images={images} /><Button onClick={loadMore} /></>)}

    {smallGallery && <ImageGallery images={images} />}

    {badRequest && (<><p>No images found by search.</p><p>Try typing something different in the search box.</p></>)}
    
    </div> 
    )

}





