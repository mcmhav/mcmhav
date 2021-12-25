import { connect } from 'react-redux';
import { push } from 'redux-first-history';

import Navigator from './Navigator';

export default connect(null, { push })(Navigator);
