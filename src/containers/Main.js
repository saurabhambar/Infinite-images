//abhishek360

import React, { Component, Suspense } from 'react';
import imageFile from './../assests/imageLoading.png';
import {
  Grid,
} from '@material-ui/core';
import FullImagePopup from './../components/FullImagePopup';
import RequestService from '../services/RequestService';

const ImageHolder = React.lazy(() => import('../components/ImageHolder'));

class Main extends Component {
  state = {
      imageList: [],
      isLoading: false,
      page: 1,
      displayFullImage: false,
      selctedIndex: 0
  }

  constructor(){
    super();
    this.requestService = new RequestService('photos', 'UNSPLASH');
  }

  componentDidMount(){
    this.fetchData();
		window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const {isLoading} = this.state;
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement;

    //console.log(scrollHeight, scrollTop, clientHeight);
		if(Math.ceil(scrollHeight - scrollTop - clientHeight) <= 100  && !isLoading ){
        this.setState({isLoading: true}, this.fetchData);
    }
	};

  fetchData = async () => {
    const {page, imageList} = this.state;
    const result = await this.requestService.get("?page="+page+"&per_page=28");
		//const result = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=32`);
		//const data = await result.json();

    console.log('list: ', result);
    this.setState({
      page: page+1,
      imageList: [...imageList, ...result],
      isLoading: false
    })
	};

  toggleFullImage = (index) => {
    const displayFullImage = this.state.displayFullImage;

    this.setState({
      displayFullImage: !displayFullImage,
      selctedIndex: index,
    });
  }

  changeSelectedImage = (index) => {
    const {imageList} = this.state;

    if(index>-1&&index<imageList.length){
      this.setState({
        selctedIndex: index,
      });
    }
  }

  render() {
    const {isLoading, imageList, selctedIndex } = this.state;

    return (
      <div>
        {this.state.displayFullImage &&
          <FullImagePopup
            selctedIndex = {selctedIndex}
            imageDetails = {imageList[selctedIndex]}
            toggleFullImage = {this.toggleFullImage}
            changeImage = {this.changeSelectedImage}
          />
        }
        <Grid container spacing={0}>
          {imageList.map((listItem, index) => {
            //const imgUrl = "https://picsum.photos/id/"+listItem.id+"/320/240"
            return (
              <Grid item xs={12} sm={3} key={listItem.id}>
                <div className='card'>
                  <Suspense fallback={<img src={imageFile} alt='Avatar' style={{ width: '50%' }}/>}>
                    <ImageHolder onClick = {()=>this.toggleFullImage(index)} src={listItem.urls.small}/>
                  </Suspense>
                </div>
              </Grid>
            )
          })}
        </Grid>
        {isLoading && <h1 align = "center">Fetching more image...</h1>}
      </div>
    );
  }
}

export default Main;
