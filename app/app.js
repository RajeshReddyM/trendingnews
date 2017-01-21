import React from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Axios from 'axios';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Whoops404 } from './Whoops404';
import { Articles } from './Articles';


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sources : []};
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
                    this.setState({sources: response.data.sources})

                })
                .catch(function (error) {
                    console.log(error);
                }); 
    }

    componentDidMount() {

    }

    render() {

        const sources = this.state.sources.map(function(result,index){
            return <Source key={index} propval={ result } />
        });;

        return (
            <div className="container">
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
            <div className="col-md-3 col-sm-3">
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