import { connect } from 'react-redux';

import { dataFetch } from '../../store/dux/snus';
import Snus from './Snus';

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    dataFetch: () => dispatch(dataFetch()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snus);
