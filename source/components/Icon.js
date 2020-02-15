import React from 'react';
import PropTypes from 'prop-types';

function Icon (props) {
  const { grid, height, paths } = props;

  function renderPaths () {
    if (paths && paths.length > 0) {
      return paths.map((path, i) => {
        return (
          <path
            d={ path }
            key={ i }
          />
        )
      });
    } else {
      return null;
    }
  }

  return (
    <svg
      height={ grid }
      viewBox={ `0 0 ${height} ${height}` }
      width={ grid }
    >
      { renderPaths() }
    </svg>
  ) 
}

Icon.propTypes = {
  grid: PropTypes.number,
  height: PropTypes.number,
  paths: PropTypes.array,
};

export default Icon;