import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../Reducers/userReducer";
import ArticleReducer from "../Reducers/ArticleReducer";
import AllUserReducer from "../Reducers/AllUser";
import MyArticlesReducer from "../Reducers/MyArticleReducer";
import commentsReducer from "../Reducers/comments";

const consfigureStore = () => {
  const store = createStore(
    combineReducers({
      users: userReducer,
      articles: ArticleReducer,
      allUsers: AllUserReducer,
      myArticles: MyArticlesReducer,
      comments: commentsReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
export default consfigureStore;
