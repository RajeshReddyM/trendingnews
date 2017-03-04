import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'underscore';
import FaClock from 'react-icons/lib/fa/clock-o';

export class Articles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {sourceId: props.routeParams.sourceId, articles: []};
    }

    componentWillMount() {
        this._fetchArticles();
    }

    _fetchArticles() {
        const apiKey = '374c72675fbf452297caf055174956f7';
        const url = `https://newsapi.org/v1/articles?source=${this.state.sourceId}`;
        Axios.get(url, {
                  headers: { "X-Api-Key": apiKey }
                }).then( response =>  {
                    console.log(response.data.articles);
                    this.setState({articles: response.data.articles});
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    componentDidMount() {
        this._startPolling();
    }

    _startPolling() {
        this._timer = setInterval(this._fetchArticles.bind(this), 5000);
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    render() {

        const articles = this.state.articles.map(function(result,index){
            return <Article key={index} propval={ result } />
        });

        return (
            <div className="container">
                <div className="col-md-12">
                    <h1 className="text-center"> {`${this.state.sourceId}'s articles`} </h1>
                </div>
                <div className="col-md-12">
                    {articles}
                </div>
            </div>
        );
    }
}

class Article extends React.Component {

    constructor(props) {
        super(props)
    }

    render(){
        const article = this.props.propval;
        const divStyle = {"backgroundImage": article.urlToImage? `url(${article.urlToImage})` : "url(images/noimage.png)"};
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"> {article.title} </h4>
                </div>
                <div className="panel-body">
                    <div className="col-md-3 col-sm-3">
                        <a href={`${article.url}`} target="_blank">
                          <div className="article-img img-responsive" style={divStyle} alt="Article image"> </div>
                        </a>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div>
                            <p className="text-justify"> {article.description} </p>
                        </div>
                        <div>
                            <kbd> Author : </kbd>
                            <span className="author"> {article.author ? article.author : "Not Available"} </span>
                        </div>
                        <div className="publishedAt">
                            <span> <FaClock/>  <i> {moment(article.publishedAt).fromNow()} </i> </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}