import React, { Component } from "react";
import { startGetAllUsers } from "../Actions/userAction";
import { selectCmtUser } from "../selectors/selectComtUser";
import { startGetArticle } from "../Actions/ArticlActions";

import { connect } from "react-redux";
import {
  startDeleteComment,
  startGetAllComments,
} from "../Actions/commentAction";

class Show extends Component {
  DeleteCmt = (id) => {
    //  const redirect=()=>{
    //     this.props.history.push('/')
    //  }

    this.props.dispatch(startDeleteComment(id));
  };

  componentDidMount() {
    this.props.dispatch(startGetAllUsers());

    this.props.dispatch(startGetArticle());
    this.props.dispatch(startGetAllComments());
  }
  AllPost = () => {
    this.props.history.push("/");
  };

  render() {
    console.log("show in cmp", this.props.allusers);
    console.log("show in art", this.props.article?.comments);
    console.log("show commennst", this.props.comments);
    return (
      <div>
        number of comments
        {this.props.article?.comments.map((ele) => {
          let names = selectCmtUser(this.props.allusers, ele.userId);
          let comments = this.props.comments.find((cmt) => cmt._id == ele._id);
          if (comments?.body) {
            return (
              <div
                className="card border-secondary mb-3"
                style={{ width: "18rem" }}
              >
                <div className="card-body text-secondary">
                  <h5 class="card-title">@{names?.email}</h5>
                  <p class="card-text">{comments?.body}</p>
                  {/* <p class="card-text"> CreatedOn--{moment(ele.createdAt).format('l')}</p> */}
                  {this.props.user._id == ele.userId ? (
                    <div>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => {
                          this.DeleteCmt(ele._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          }
        })}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.AllPost}
        >
          {" "}
          back
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    allusers: state.allUsers,
    article: state.articles.find((ele) => ele._id == props.match.params.id),
    user: state.users,
    comments: state.comments,
  };
};
export default connect(mapStateToProps)(Show);
