import React, { Component } from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";

import "./FullPost.css";

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount() {
        this.loadPost();
    }
    componentDidUpdate() {
        this.loadPost();
    }

    loadPost = () => {
        if(this.props.match.params.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ){
                Axios.get('/posts/' + this.props.match.params.id)
                .then(res => {
                    this.setState({loadedPost: res.data})
                })
            }
        }
    }

    deletePostHandler = () => {
        Axios.delete('/posts/' + this.props.match.params.id)
            .then(res => {
                console.log(res);
            })
    }

  render() {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.match.params.id) {
        post = "loading...";
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                  <h1>{this.state.loadedPost.title}</h1>
                  <p>{this.state.loadedPost.body}</p>
                  <div className="Edit">
                    <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                  </div>
                </div>
              );
        }
    }

    return post;
  }
}

export default withRouter(FullPost);
