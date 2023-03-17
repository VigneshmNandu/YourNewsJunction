import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize: 10,
        category:'general'
    }

    static propTypes = {
        country: PropTypes.string ,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("newsItem constructor")
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        }
    }

    async updateNews(){
        
        let url = this.props.url + `&country=${this.props.country}` + `&page=${this.state.page}` + `&pageSize=${this.props.pageSize}` + `&category=${this.props.category}`
        this.setState({ loading: true })
        console.log(this.state.page)
        let parsedJsonData = await fetch(url).then(res => res.json())
        console.log(parsedJsonData);
        this.setState({
            articles: parsedJsonData.articles,
            totalResults: parsedJsonData.totalResults,
            loading: false
        })

    }

    async componentDidMount() {
        try {
            this.updateNews();
        } catch (error) {
            console.log(error)
        }
    }

    handleNextPage = async () => {
        this.setState({page: this.state.page + 1});
        console.log(this.state.page)
        this.updateNews();

        // console.log("next page")

        //check if next page is present
       
            // let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-02-16&sortBy=publishedAt&apiKey=8488cba818a44e7c81c45cac2b4a9834&page=${this.state.page + 1}&pageSize=15`;
            // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8488cba818a44e7c81c45cac2b4a9834&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

            // let url = this.props.url + `&country=${this.props.country}` + `&page=${this.state.page + 1}` + `&pageSize=${this.props.pageSize}` + `&category=${this.props.category}`
            // this.setState({ loading: true })
            // let parsedJsonData = await fetch(url).then(res => res.json())
            // console.log(parsedJsonData);
            // console.log(this.state.page)
            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parsedJsonData.articles,
            //     loading: false
            // })
            // console.log(this.state.page)

    }

    handlePrevPage = async () => {

        this.setState({page: this.state.page - 1});
        this.updateNews();


        // console.log("prev page")   
        // let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-02-16&sortBy=publishedAt&apiKey=8488cba818a44e7c81c45cac2b4a9834&page=${this.state.page + 1}&pageSize=15`;
        // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8488cba818a44e7c81c45cac2b4a9834&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        // let url = this.props.url + `&country=${this.props.country}` + `&page=${this.state.page - 1}` + `&pageSize=${this.props.pageSize}` + `&category=${this.props.category}`
        // this.setState({ loading: true })
        // let parsedJsonData = await fetch(url).then(res => res.json())
        // console.log(parsedJsonData);
        // console.log(this.state.page)

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedJsonData.articles,
        //     loading: false
        // })

    }

    render() {
        return (
            <div className="container my-5">
                {console.log("render")}
                <h2 className="text-center my-4">YourNewsJunction - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {

                        // here as we use map() we need to give a unique key in the return (parent element here <div>)
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevPage}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextPage}>Next &raquo; </button>
                </div>
            </div>
        )
    }
}

export default News