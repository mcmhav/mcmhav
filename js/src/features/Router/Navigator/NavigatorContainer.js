import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Navigator from './Navigator';

export default connect(
  null,
  { push },
)(Navigator);
