import {connect} from 'react-redux'
import Login from "../modules/user/Login";

export const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    errorMessage: state.user.errorMessage,
    data: state.user.data,
  }
}

export default connect(mapStateToProps, null)(Login)


