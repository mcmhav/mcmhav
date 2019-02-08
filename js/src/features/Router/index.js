import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Router from './Router';

export default connect(
  null,
  { push },
)(Router);
