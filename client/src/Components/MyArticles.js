import React, { Component } from "react";
import { connect } from "react-redux";
import {
  startGetMyArticle,
  startDeleteArticle,
} from "../Actions/MyAricleAction";

// import MyArticle from '../../../app/controllers/MyArticleController'

class MyArticles extends Component {
  AddPost = () => {
    this.props.history.push("/user/AddArticle");
  };

  AllPost = () => {
    this.props.history.push("/");
  };
  DeleteArticle = (id) => {
    this.props.dispatch(startDeleteArticle(id));
  };
  EditArticle = (id) => {
    this.props.history.push(`/users/EditArticle/${id}`);
  };

  componentDidMount() {
    this.props.dispatch(startGetMyArticle());
  }
  render() {
    console.log("my", this.props.myarticle);
    return (
      <div style={{ marginTop: "12px" }} style={{ padding: "12px" }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "12px" }}
          onClick={this.AddPost}
        >
          ADD POST
        </button>{" "}
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "12px" }}
          onClick={this.AllPost}
        >
          {" "}
          ALL ARTICLES
        </button>
        {this.props.myarticle.map((ele) => {
          // console.log("name",selectUser(this.props.allusers,ele.userId))
          // console.log( "name",name)
          return (
            <div
              className="card mb-3 shadow-lg p-3 bg-white rounded"
              style={{ width: 1000 }}
            >
              <div class="card-body">
                <h5 class="card-title"> {ele.title} </h5>
                <p class="card-text">{ele.body}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.EditArticle(ele._id);
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    this.DeleteArticle(ele._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myarticle: state.myArticles,
  };
};
export default connect(mapStateToProps)(MyArticles);
