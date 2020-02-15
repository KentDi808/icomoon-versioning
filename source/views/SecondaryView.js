import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconList from '../components/IconList';
import { fetchIcons } from '../state/actions/iconActions';

const mapStateToProps = (state) => {
  return {
    iconData: state.icons.iconData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _fetchIcons: () => dispatch(fetchIcons()),
  };
};

function SecondaryView (props) {
  const { iconData, _fetchIcons } = props;

  useEffect(() => {
    if (iconData === undefined) {
      _fetchIcons();
    }
  }, []);

  if (iconData) {
    return (
      <table className="icon-table">
        <thead>
          <tr>
            <td>Old icon</td>
            <td>New icon</td>
            <td>Details</td>
            <td>Issues</td>
          </tr>
        </thead>
        <IconList
          iconData={ iconData }
        ></IconList>
      </table>
    );
  } else {
    return (
      <div>Waiting</div>
    );
  }
}

SecondaryView.propTypes = {
  iconData: PropTypes.object,
  _fetchIcons: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryView);
// export default connect(null, mapDispatchToProps)(SecondaryView);
