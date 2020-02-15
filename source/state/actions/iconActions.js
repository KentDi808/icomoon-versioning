import clonedeep from 'lodash.clonedeep';
import get from "lodash.get";

import { FETCH_ICONS } from '../constants/action-types';
import selectionJsonOld from '../../resources/old/selection.json';
import selectionJsonNew from '../../resources/new/selection.json';
import set from 'lodash.set';

export const fetchIcons = () => {
  function getItem (item) {
    const { code, id, name } = item.properties;
    const { grid, paths } = item.icon;

    return {
      code,
      grid,
      id,
      info: [],
      isCodeError: false,
      isDeletedError: false,
      isPathError: false,
      isSizeError: false,
      isNew: false,
      name,
      oldPaths: paths,
      size: 0,
      newPaths: [],
    };
  }

  function processSelectionJson () {
    const copy = { icons: [] };

    copy.prefix = {
      value: get(selectionJsonOld, 'preferences.fontPref.prefix', ''),
      error: get(selectionJsonOld, 'preferences.fontPref.prefix', '') !== get(selectionJsonNew, 'preferences.fontPref.prefix', ''),
      label: 'Prefix',
    };

    copy.fontName = {
      value: get(selectionJsonOld, 'metadata.nane', ''),
      error: get(selectionJsonOld, 'metadata.nane', '') !== get(selectionJsonNew, 'metadata.nane', ''),
      label: 'Font Name',
    };

    copy.height = {
      value: get(selectionJsonOld, 'height', ''),
      error: get(selectionJsonOld, 'height', '') !== get(selectionJsonNew, 'height', ''),
      label: 'Height',
    };

    selectionJsonOld.icons.forEach((item) => {
      const { name } = item.properties;
      let names = [name];
      if (name.indexOf(',') >= 0) {
        names = name.split(',');
      }
      names.forEach((newName) => {
        const clonedItem = clonedeep(item);
        set(clonedItem, 'properties.name', newName.trim());
        copy.icons.push(getItem(clonedItem));
      })
    });

    selectionJsonNew.icons.forEach((item) => {
      const { properties } = item;
      const { code, name } = properties;
      let names = [name];
      if (name.indexOf(',') >= 0) {
        names = name.split(',');
      }

      names.forEach((newName) => {
        const found = copy.icons.find(ico => ico.name === newName.trim());

        if (found) {
          if (found.code !== code) {
            found.isCodeError = true;
            found.info.push(`Expected ${found.code.toString(16)} got ${code.toString(16)}`);
          }

          found.newPaths = item.icon.paths;

          if (found.oldPaths.length !== found.newPaths.length) {
            found.isPathError = true;
            found.info.push('The glyph has changed');
          } else {
            found.oldPaths.forEach((path, i) => {
              if (path !== found.newPaths[i] && !found.isPathError) {
                found.isPathError = true;
                found.info.push('The glyph has changed');
              }
            })
          }

          if (found.grid !== item.icon.grid) {
            found.isSizeError = true;
            found.info.push('The grid size has changed');
          }
        } else {
          const clonedItem = clonedeep(item);
          set(clonedItem, 'properties.name', newName);
          const newIcon = getItem(clonedItem);
          newIcon.oldPaths = [];
          newIcon.newPaths = clonedItem.icon.paths;
          newIcon.isNew = true;
          newIcon.info.push('Icon is new');

          copy.icons.push(newIcon);
        }
      });
    });

    return copy;

    // const height = get(selectionJsonOld, 'height', 1024);
    // const prefix = get(selectionJsonOld, 'preferences.fontPref.prefix', 'unknown');
    // const name = get(selectionJsonOld, 'metadata.name', 'unknown');
    // const metadata = {
    //   name,
    //   height,
    //   prefix,
    // };

    // const icons = selectionJsonOld.icons.map((icon) => {
    //   const glyphName = get(icon, 'properties.name');
    //   const foundIcon = selectionJsonNew.icons.find(ico => ico.properties.name === glyphName);
    //   const newIcon = {
    //     code: icon.icon.defaultCode.toString(16),
    //     id: icon.properties.id,
    //     grid: icon.icon.grid,
    //     name: glyphName,
    //     paths: icon.icon.paths,
    //   }

    //   if (foundIcon) {
    //     newIcon.newPaths = foundIcon.icon.paths;
    //   }

    //   return newIcon;
    // });
    // return { icons, metadata };
  }

  return (dispatch) => {
    const iconData = processSelectionJson();

    dispatch({ type: FETCH_ICONS, payload: iconData });
  }
}