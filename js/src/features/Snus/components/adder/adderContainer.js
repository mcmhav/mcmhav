import { connect } from 'react-redux';
import { addItem } from '../../../../store/dux/snus';

import Adder from './adder';

const mapStateToProps = state => {
  const notesCounts = state.snus.get('notesCounts');
  const isSignedIn = state.gapi.get('isSignedIn');

  return {
    notesCounts,
    isSignedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addItem: notes => dispatch(addItem(notes)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Adder);
