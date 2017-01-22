import React from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Axios from 'axios';
import _ from 'underscore';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Whoops404 } from './Whoops404';
import { Articles } from './Articles';



export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sources : [], filter: '', activeFilter: 'all'};
    }

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

    _filterSources(evt, source) {
        this.setState({filter: source, activeFilter: source});
    }

    componentDidMount() {

    }

    render() {

        const sources = this.state.sources.map((result,index) => {
            if (this.state.filter && this.state.filter !== "all") {
                if (this.state.filter === result.category) {
                    return <Source key={index} propval={ result } />   
                }
            } else {
                return <Source key={index} propval={ result } />
            }
        });

        return (
            <div className="container">
                <div className="col-md-12">
                    <ul className="nav nav-pills navPills">
                      <li><a href="#" className={this.state.activeFilter === 'all' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "all")}>All</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'general' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt,"general")}>General</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'business' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "business")}>Business</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'entertainment' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "entertainment")}>Entertanment</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'gaming' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "gaming")}>Gaming</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'sport' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "sport")}>Sports</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'music' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "music")}>Music</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'technology' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "technology")}>Technology</a></li>
                      <li><a href="#" className={this.state.activeFilter === 'science-and-nature' ? 'activePill' : ''} onClick={(evt) => this._filterSources(evt, "science-and-nature")}>Nature</a></li>
                    </ul>
                </div>
                <br/>
                <div className="col-md-12">
                    {sources}
                </div>
            </div>
        );
    }

}

class Source extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    render() {

        const source = this.props.propval;
        const divStyle = {"backgroundImage": `url(${source.urlsToLogos.medium})`};

        return (
            <div className="col-md-3">
                <div className="source">
                    <Link to={`/${source.id}/articles`}>
                        <div className="img" style={divStyle} alt="Source image"> </div>
                        <kbd> {source.id} </kbd>
                    </Link>
                </div>
            </div>
        );
    }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/:sourceId/articles" component={Articles}/>
        <Route path="*" component={Whoops404}/>

    </Router>, 
    document.getElementById('app')
);