// import logo from './logo.svg';
import './App.css';
import {  Component } from 'react'
// import React from 'react'

// class App extends React.Component {
  class App extends Component {

    state = {
      posts: [
        {
          id: 1,
          title: 'O título 1',
          body: 'O corpo 1'
        },
        {
          id: 2,
          title: 'O título 2',
          body: 'O corpo 2'
        },
        {
          id: 3,
          title: 'O título 3',
          body: 'O corpo 3'
        }
      ],
      counter: 0
    }

  // constructor(props) {
  //   super(props);
    // this.handlePClick = this.handlePClick.bind(this) // Dizendo que essa função vai ter o this
    // state = {
    //   name: 'Lucas Lima',
    //   counter: 0
    // }
  // }

  // handlePClick() {
  //   console.log('p clicado')
  // }

  // handlePClick = () => { // Usar arrow function quando quiser utilizar o this
  //   this.setState({name: 'Júnior'})
  // }

  // handleAClick = (event) => { // Arrow function não tem this
  //   event.preventDefault();
  //   const { counter } = this.state
  //   this.setState({counter: counter + 1 })
  // }

  timeoutUpdate = null;

    componentDidMount() {
      this.handleTimeout();
  }

  componentDidUpdate() {
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate)
  }

  handleTimeout = () => {
        const { posts, counter } = this.state
    posts[0].title = 'O título mudou';
      this.timeoutUpdate = setTimeout(() => {
        this.setState({ posts, counter: counter + 1 });
      }, 1000)
  }



  render() {
    // const name = this.state.name
    // const { name, counter } = this.state
    const { posts, counter } = this.state
  return (
    <div className="App">
      
       <h1>{counter}</h1>
      {
        posts.map(post => (  // os parênteres indicam que vou retornar um elemento .jsx
        <div key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        </div>
        ))}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        {/* <p onClick={() => console.log('<p> clicado!')}>
          {name}
        </p> 
        <a
        onClick={this.handleAClick}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
  }

}


export default App;
