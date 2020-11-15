import React, { Component } from 'react';
import {
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Close,
  ArrowBackIos,
  ArrowForwardIos
} from '@material-ui/icons';
import './style.css';

class FullImagePopup extends Component {
  state = {
    visible: true,
  }

  componentDidMount() {
    this.fadeOutTime();
  }

  handleImgClick = () => {
    const visible = this.state.visible;
    this.setState({
      visible: !visible
    })
  }

  fadeOutTime  = () => {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 2000);
  }

  render() {
    const visible = this.state.visible;
    const { alt_description, user, urls } = this.props.imageDetails;
    const {selctedIndex} =  this.props;
    return (
      <div className = 'popup'>
        <div className = 'popup_close_image'>
          <IconButton
            style = {{backgroundColor: 'white'}}
            onClick={() => this.props.toggleFullImage({})}
          >
            <Close/>
          </IconButton>
        </div>
        <div className = 'popup_inner_image'>
          <div align = 'center' style = {styles.dropzone}>
            <img
              onClick = {this.handleImgClick}
              src = {urls.regular}
              alt=""
              style = {styles.image}
            />
            <div
              className={visible ? 'fadeIn': 'fadeOut'}
              align = 'left'
              style = {styles.details}
            >
              <Typography
                style = {{ margin: '10px 20px 10px 20px', fontSize: 20}}
              >
                <b>{alt_description}</b>
              </Typography>
              <Typography
                style = {{ margin: '10px 20px 10px 20px', fontSize: 20}}
              >
                Credits: <b>{user.name}</b>
              </Typography>
            </div>
          </div>
          <div onClick = {()=> this.props.changeImage(selctedIndex-1)} className = 'left_nav'>
            <ArrowBackIos style ={{fontSize: 50}}/>
          </div>
          <div onClick = {()=> this.props.changeImage(selctedIndex+1)} className = 'right_nav'>
            <ArrowForwardIos style ={{fontSize: 50}}/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '16px',
    width: '100%',
  },
  caption: {
    width: '100%',
    color: 'white',
    top: 0,
    backgroundColor: "rgba(0,0,0, 0.7)",
    position: 'absolute'
  },
  details: {
    color: 'white',
    width: '100%',
    height: '15%',
    bottom: 0,
    backgroundColor: "rgba(0,0,0, 0.7)",
    position: 'absolute'
  },
  dropzone: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '80vh',
    borderRadius: 5,
    alignItems: 'center',
  },
}


export default FullImagePopup;
