import {connect} from 'react-redux'
import EditPost from "../../modules/editPost";
import {getPost, savePost} from "../../modules/editPost/actions";

export const mapStateToProps = state => {
  return {
    loading: state.post.loading,
    error: state.post.error,
    errorMessage: state.post.errorMessage,
    post: state.post.data,
    url: state.post.url
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getPost: (url) => dispatch(getPost(url)),
    savePost: (payload) => dispatch(savePost(payload)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPost)


