import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import newsData from "../data";

const News = (props) => {
  //  console.log("data = ", newsData);
  const [articles, setArticles] = useState([]);
  const [articlesPerPage, setArticlesPerPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(props.pageSize);
  const [totalArticles, setTotalArticles] = useState(0);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let parsedData = newsData[props.category];

  const update = () => {
    props.setProgress(10);
    //const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //let data = await fetch(url);
    props.setProgress(40);
    //let parsedData = await data.json();
    console.log(props.category);
    //let parsedData = newsData[props.category];
    //console.log(parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles);
    setArticlesPerPage(parsedData.articles.slice(0, 6));
    //console.log("slices = ", articlesPerPage);
    //console.log(articles);
    //console.log(parsedData.articles.slice(0, 6));
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - Newszone`;
    update();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = () => {
    //const url = `https://newsapi.org/v2/top-headlines?country=${
    //  props.country
    //}&category=${props.category}&apiKey=${props.apiKey}&page=${
    //  page + 1
    //}&pageSize=${props.pageSize}`;
    //setPage(page + props.pageSize);
    //let data = await fetch(url);
    //let parsedData = await newsData.json();
    //setPage(page + 1);
    //console.log(parsedData);
    //setArticles(articles.concat(parsedData.articles));
    //setInterval(() => {
    setArticlesPerPage(
      articlesPerPage.concat(
        parsedData.articles.slice(page, page + props.pageSize)
      )
    );
    console.log(parsedData.articles.slice(page, page + props.pageSize));
    setTotalArticles(parsedData.totalResults);
    setPage(Math.min(page + props.pageSize, parsedData.totalResults));
    setLoading(false);
    //}, 200);
  };

  return (
    <div>
      <h1
        className="text-center"
        style={{ margin: "30px 0", marginTop: "90px" }}
      >
        Newszone - Top {capitalize(props.category)} Headlines
      </h1>
      {/*{loading && <Spinner />}*/}

      <InfiniteScroll
        dataLength={page}
        next={fetchMoreData}
        hasMore={page !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articlesPerPage.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2021-11/211126-pak-ind-cricket-mb-1439-9a0b46.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general",
};

export default News;
