import { Component } from "react";
import NewSingle from "./NewSingle";
import Error from "./Error";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      error: false
    };
  }

  componentDidMount() {
    const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&from=2021-10-10&sortBy=publishedAt&apiKey=79adda32a5cf45808b845fae49caa120`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          news: data.articles,
        });
      })
      .catch((error) => {
        this.setState({
            error: true
        });
      });
  }

  renderItems() {
    if (!this.state.error) {
    return this.state.news.map((item) => (
      <NewSingle key={item.url} item={item} />
    ));
    } else {
        return <Error />
    }
  }

  render() {
    return <div className="row">{this.renderItems()}</div>;
  }
}

export default News;
