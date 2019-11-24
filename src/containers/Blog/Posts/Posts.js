import React, { Component } from "react";
import axios from "../../../axios";
import { Route } from "react-router-dom";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(p => {
          return { ...p, author: "Max" };
        });
        this.setState({ posts: updatedPosts });
        //   console.log(res);
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something Went Wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => {
            this.postSelectedHandler(post.id);
          }}
        />
      ));
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
