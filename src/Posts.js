
import React, { Component } from 'react';
import logo from './reddit-logo.svg';
import './Posts.css';
const Timestamp = require('react-timestamp');

  function Post(props) {
    return (
      <div className='well'>
        <div className='media'>
          <img src={logo} className='Reddit-logo' alt='logo' />
          <div className='media-body'>
            <a href={props.url}><h1 className='media-heading'>{props.title}</h1></a>
            <p className='text-right author'>Posted by <b>{props.author}</b></p>
            <h4>{props.text}</h4>
            <ul className='list-inline'>
              <li><span><i className='glyphicon glyphicon-calendar'></i>&nbsp;<Timestamp time={props.created} format='full' /></span></li>
              <li>|</li>
              <span><i className='glyphicon glyphicon-thumbs-up'></i> {props.score}</span>
              <li>|</li>
              <span><i className='glyphicon glyphicon-comment'></i> 354 comments</span>
            </ul>
          </div>
        </div>
      </div> 
    );
  }

export default class Posts extends Component {
  render() {
      let posts = this.props.posts.map((post, index) => {
        
        //Long posts dont display well, in that case we'll make a preview of the first 500 characters.
        let text = post.text ? post.text.slice(0,500) : '';

        //If the text got 'previewed' add suspension points.  
        if(text && post.text.length > 500 ) {
          text = text + '...';
        }

        //Edge case for posts with 1 vote.
        let score = (post.score === 1 || post.score === -1) ? post.score + ' vote' : post.score + ' votes';

        return (
          <div key={index}>
            <Post
              title={post.title}
              author={post.author}
              created={post.created}
              url={post.url}
              score={score}
              text={text}
            />
          </div> 
      );
    })
    return (
      <div className='container'>
          {posts}
      </div>
    );
  }
}