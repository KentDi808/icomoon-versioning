import React from 'react';
import PropTypes from 'prop-types';

function IconDetails (props) {
  const { code, name } = props;

  return (
    <div className="icon-details">
      <p>Code: { code.toString(16) }</p>
      <p>Name: { name }</p>
    </div>

  );
}

IconDetails.propTypes = {
  code: PropTypes.number,
  name: PropTypes.string,
};

export default IconDetails;
