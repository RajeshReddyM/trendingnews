import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'underscore';
import FaClock from 'react-icons/lib/fa/clock-o';
import {NavBar, Footer} from './app';

// class component of Articles
export class Articles extends React.Component {

    // Define state object
    constructor(props) {
        super(props);
        this.state = {sourceId: props.routeParams.sourceId, sourceUrl: props.location.state.sourceUrl, articles: []};
    }

    componentWillMount() {
        this._fetchArticles();
    }

    // Fetch all the articles of specific news source
    _fetchArticles() {
        const apiKey = '374c72675fbf452297caf055174956f7';
        const url = `https://newsapi.org/v1/articles?source=${this.state.sourceId}&apiKey=${apiKey}`;
        Axios.get(url)
                .then( response =>  {
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

    // fetch new articles from the news source every 30 seconds
    _startPolling() {
        this._timer = setInterval(this._fetchArticles.bind(this), 30000);
    }

    // clear the polling once the component is about to unmount
    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    render() {
        const articles = this.state.articles.map(function(result,index){
            return <Article key={index} articleVal={ result } />
        });

        let divStyle = {"backgroundImage": `url("https://icons.better-idea.org/icon?url=${this.state.sourceUrl}&size=70..120..200")`};

        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="col-md-12">
                        <div className="sourceImg" style={divStyle}> </div>
                    </div>
                    <div className="col-md-12">
                        {articles}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

// Article function component
const Article =  (props) => {
    let article = props.articleVal;
    let divStyle = {"backgroundImage": article.urlToImage? `url(${article.urlToImage})` : "url(images/noimage.png)"};
    return(
        <div className="panel panel-default z-depth">
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