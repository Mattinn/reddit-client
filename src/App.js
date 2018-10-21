import React, { Component } from 'react';
import './App.css';
import { getCategories } from './Subreddits.js'
import { Button } from 'reactstrap';
import Header from './Header';
import Posts from './Posts';

const subreddits = getCategories().sort((a, b) => a.localeCompare(b));

class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      posts: [],
      categories: [],
      selectedCategory: 'AskReddit'
    }
  }

  handleClick(i) {
    this.setState({selectedCategory: i.target.value}, () => {
      this.navigate();
    });
  }

  componentDidMount() {
    const categories = subreddits.map((i) => {
      return (
        <Button className='btn btn-lg btn-outline-success waves-effect' value={i} key={i} onClick={(i) => this.handleClick(i)}>{i}</Button>
      )
    });

    this.setState({categories: categories}, () => {
      this.navigate();
    });
  }

  navigate = () => {
    let url = 'https://www.reddit.com/r/' + this.state.selectedCategory + '.json?limit=50';
    let posts;

    fetch(url).then(data => {
      return data.json();
    }).then(result => {
      posts = result.data.children.map((res) => {
        return ({
          title: res.data.title, score: res.data.score, author: res.data.author, url: res.data.url, img: res.data.thumbnail, 
          created: res.data.created, text: res.data.selftext
        });
      })

      this.setState({posts: posts});
    });
  };

  render() {
    return (
      <div className='App'>
        <Header buttons={this.state.categories} /> 
        <h2 className="selectedCategory">You are browsing r/{this.state.selectedCategory}</h2>
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
