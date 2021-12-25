import { connect } from 'react-redux';

import Tables from './tables';

const mapStateToProps = state => {
  const tables = state.snus.get('tables');
  const supaStruct = state.snus.getIn(['supaStruct', 'tables']);

  return {
    tables,
    supaStruct,
  };
};

export default connect(mapStateToProps)(Tables);
