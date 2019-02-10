import { connect } from 'react-redux';

import Dev from './Dev';

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    resetApp: () => dispatch({ type: 'RESET_APP' }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dev);
