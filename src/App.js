import React, { Component } from 'react';
import './App.css';

import PlayButton from './components/PlayButton';
import TextDisplay from './components/TextDisplay';
import Poem from './components/Poem.js';

import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poemLines: '',
            poemTitle: '',
            poemAuthor: '',
            errorMessage: '',
            searchErrorMessage: '',
            searchTitle: '',
            seachAuthor: ''
        }; 
        this.searchClick = this.searchClick.bind(this);
        this.randomSearch = this.randomSearch.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    }

    componentDidMount() {
        this.randomSearch();
    }

    searchClick() {
        let searchUrl = '';
        if(this.state.searchAuthor && this.state.searchTitle) {
            searchUrl = `https://poetrydb.org/author,title/${this.state.searchAuthor};${this.state.searchTitle}`;
        } else if(this.state.searchAuthor) {
            searchUrl = `https://poetrydb.org/author/${this.state.searchAuthor}`;
        } else if(this.state.searchTitle) {
            searchUrl = `https://poetrydb.org/title/${this.state.searchTitle}`;
        }

        axios({
            method: 'get',
            url: searchUrl,
            responseType: 'json'
          })
            .then((response) => { 
                const poemResultRandom = Math.floor(Math.random() * (response.data.length - 1));
                this.setState({
                    errorMessage: '',
                    searchErrorMessage: '',
                    poemAuthor: response.data[poemResultRandom].author,
                    poemLines: response.data[poemResultRandom].lines,
                    poemTitle: response.data[poemResultRandom].title
                });
            })
            .catch(() => {
                this.setState({
                    searchErrorMessage: `We didn't find your poem. Here's a random one.`
                });
                this.randomSearch();
            });
    }

    randomSearch() {
        let searchUrl = `https://poetrydb.org/random`;

        axios({
            method: 'get',
            url: searchUrl,
            responseType: 'json'
          })
            .then((response) => { 
                const poemResultRandom = Math.floor(Math.random() * (response.data.length - 1));
                this.setState({
                    errorMessage: '',
                    poemAuthor: response.data[poemResultRandom].author,
                    poemLines: response.data[poemResultRandom].lines,
                    poemTitle: response.data[poemResultRandom].title
                });
            })
            .catch((err) => {
                this.setState({
                    searchErrorMessage: '',
                    errorMessage: `We didn't find anything and the reason is: ${err}. Click random (again) or search for a different poem.`
                });
            });
    }

    handleChangeTitle(event) {
        this.setState({searchTitle: event.target.value});
    }

    handleChangeAuthor(event) {
        this.setState({searchAuthor: event.target.value});
    }

    render() {
        return (
            <div className="app">
                <div className='searchSideBar'>
                    <PlayButton onClick={this.randomSearch} />
                    <hr />
                    <h3>Search For Poem</h3>
                    <label htmlFor='title'>
                        Poem Title
                        <input type='text' id='title' value={this.state.searchTitle || ''} onChange={this.handleChangeTitle}></input>
                    </label>
                    <label htmlFor='author'>
                        Poem Author
                        <input type='text' id='author' value={this.state.searchAuthor || ''} onChange={this.handleChangeAuthor}></input>
                    </label>
                    <button className='searchButton' onClick={this.searchClick}>Search</button>
                </div>
                <TextDisplay error={this.state.errorMessage} searchError={this.state.searchErrorMessage}>
                    <Poem author={this.state.poemAuthor} lines={this.state.poemLines} title={this.state.poemTitle} />
                </TextDisplay>
            </div>
        );
    }
}

export default App;
