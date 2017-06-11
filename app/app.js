import React from 'react';
import { render } from 'react-dom';
import Axios from 'axios';
import _ from 'underscore';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Whoops404 } from './Whoops404';
import { Articles } from './Articles';
import FaNewsPaperO from 'react-icons/lib/fa/newspaper-o';

// Main class component for the app
export class App extends React.Component {

    // Define app state
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <NavBar/>
                <MainContainer/>
                <Footer/>
            </div>
        )
    }
}


// class component for Main Container
class MainContainer extends React.Component {

    // Define component state
    constructor(props) {
        super(props);
        this.state = {sources : [], filter: '', activeFilter: 'all'};
    }

    // Get all the News Sources from News API
    componentWillMount() {
        this._fetchSources();
    }

    _fetchSources() {
        const apiKey = '374c72675fbf452297caf055174956f7';
        Axios.get('https://newsapi.org/v1/sources', {
                  headers: { "X-Api-Key": apiKey }
                }).then( response =>  {
                    console.log(response.data.sources);
                    this.setState({sources: response.data.sources});

                })
                .catch(function (error) {
                    console.log(error);
                }); 
    }

    // set the filter state and render the page with news sources
    _filterSources(evt, source) {
        this.setState({filter: source, activeFilter: source});
    }

    componentDidMount() {

    }

    render() {

        const sources = this.state.sources.map((result,index) => {
            if (this.state.filter && this.state.filter !== "all") {
                // set the filter state to All and display all sources by default
                if (this.state.filter === result.category) {
                    return <Source key={index} sourceVal={ result } />
                }
            } else {
                return <Source key={index} sourceVal={ result } />
            }
        });

        // Nav pills with the filters for news sources
        return (
            <div className="container">
                <div className="col-md-12">
                    <ul className="nav nav-pills well navPills">
                      <li><a href="#" className={this.state.activeFilter === 'all' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "all")}><b>All</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'general' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt,"general")}><b>General</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'business' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "business")}><b>Business</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'entertainment' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "entertainment")}><b>Entertainment</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'gaming' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "gaming")}><b>Gaming</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'sport' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "sport")}><b>Sports</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'music' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "music")}><b>Music</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'technology' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "technology")}><b>Technology</b></a></li>
                      <li><a href="#" className={this.state.activeFilter === 'science-and-nature' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "science-and-nature")}><b>Nature</b></a></li>
                    </ul>
                </div>
                <br/>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    {sources}
                </div>
            </div>
        );
    }

}


// News Source function component
const Source = (props) => {
    let source = props.sourceVal;
    let divStyle = {"backgroundImage": `url("https://icons.better-idea.org/icon?url=${source.url}&size=70..120..200")`};

    return (
        <div className="col-md-2 col-sm-3 col-xs-6">
            <div className="source hovereffect">
                <Link to={`/${source.id}/articles`}>
                    <div className="img" style={divStyle} alt="Source image"> </div>
                    <div className="overlay">
                        <h2>{source.name}</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
}

// Navbar function component
export const  NavBar = (props) => {
    return(
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/trendingnews"> <span className="logo"> <FaNewsPaperO/> </span> Trending News </a>
            </div>
          </div>
        </nav>
    ) 
}

// Footer function component
export const Footer = (props) => {
    return(
        <footer className="footer"> 
            <div className="powered"> <b> Powered by <a href="https://newsapi.org" target="_blank"> NewsAPI.org </a> </b> </div> 
        </footer>
    )
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/:sourceId/articles" component={Articles}/>
        <Route path="*" component={Whoops404}/>
    </Router>, 
    document.getElementById('app')
);