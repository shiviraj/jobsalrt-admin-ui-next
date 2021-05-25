import {connect} from 'react-redux'
import Posts from "../../modules/posts";
import {getPosts, postsCount} from "../../modules/posts/actions";

export const mapStateToProps = state => {
  return {
    loading: state.posts.loading,
    error: state.posts.error,
    errorMessage: state.posts.errorMessage,
    posts: state.posts.data,
    filters: state.posts.filters,
    currentPage: state.posts.currentPage,
    totalPage: state.posts.totalPage,
    totalPosts: state.posts.totalPosts,
    sortBy: state.posts.sortBy,
    sortOrder: state.posts.sortOrder,
    search: state.posts.search
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    postsCount: (payload) => dispatch(postsCount(payload)),
    getPosts: (payload) => dispatch(getPosts(payload)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)


