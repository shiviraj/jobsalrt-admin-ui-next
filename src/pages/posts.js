import {connect} from 'react-redux'
import Posts from "../modules/posts";
import {addNewPost, deletePost, getPosts, postsCount, reloadPosts} from "../modules/posts/actions";

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
    reload: state.posts.reload
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    postsCount: (payload) => dispatch(postsCount(payload)),
    getPosts: (payload) => dispatch(getPosts(payload)),
    addNewPost: (payload) => dispatch(addNewPost(payload)),
    reloadPosts: (payload) => dispatch(reloadPosts(payload)),
    deletePost: (url) => dispatch(deletePost(url))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)


