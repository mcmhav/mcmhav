import { connect } from 'react-redux';
import { addItem } from '../../../../store/dux/snus';
import { gapiSignedIn } from '../../../../store/dux/gapi';

import Adder from './adder';

const mapStateToProps = state => {
  const notesCounts = state.snus.get('notesCounts');
  const isFetching = state.snus.get('isFetching');

  const isSignedIn = state.gapi.get('isSignedIn');

  return {
    notesCounts,
    isSignedIn,
    isFetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addItem: notes => dispatch(addItem(notes)),
    gapiSignedIn: status => dispatch(gapiSignedIn(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Adder);
