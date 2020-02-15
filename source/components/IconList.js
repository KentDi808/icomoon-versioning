import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import IconItem from './IconItem';

function IconList (props) {
  const { iconData } = props;
  const { icons } = iconData;
  const height = get(iconData, 'height.value');

  function renderIconList () {
    if (iconData && icons) {
      const items = icons.map((icon) => {
        return (
          <IconItem 
            height={ height }
            icon={ icon }
            key={ icon.id }
          />
        );
      });
      return items;
    } else {
      return null;
    }
  }

  return (
    <tbody>
      { renderIconList() }
    </tbody>
  )
}

IconList.propTypes = {
  iconData: PropTypes.object,
};

export default IconList;