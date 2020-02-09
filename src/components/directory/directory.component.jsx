import React from 'react';

import DIRECTORY_DATA from './directory.data';

import './directory.styles.scss';
import MenuItem from './../menu-item/menu-item.component';

const Directory = () => (
  <div className='directory-menu'>
    {DIRECTORY_DATA.map(({id, ...otherSectionProps}) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;