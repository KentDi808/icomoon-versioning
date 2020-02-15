import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import IconDetails from './IconDetails';

function IconItem (props) {
  const { height, icon } = props;
  const { code, info, grid, name, oldPaths, newPaths } = icon;

  function renderInfo () {
    return info.map((inf, i) => {
      return (
        <p key={ i }>{ inf }</p>
      );
    });
  }

  return (
    <tr>
      <td>
        <Icon
          grid={ grid }
          height={ height }
          paths={ oldPaths }
        />
      </td>
      <td>
        <Icon
          grid={ grid }
          height={ height }
          paths={ newPaths }
        />
      </td>
      <td>
        <IconDetails
          code={ code }
          name={ name }
        />
      </td>
      <td className="issues">
        { renderInfo() }
      </td>
    </tr>
  );
}

IconItem.propTypes = {
  height: PropTypes.number,
  icon: PropTypes.object,
};

export default IconItem;