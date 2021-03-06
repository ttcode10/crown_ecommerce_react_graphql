import React from 'react';
import { withRouter } from 'react-router-dom';

import { default as CollectionItem } from './../collection-item/collection-item.container';

import './collection-preview.styles.scss';

const CollectionPreview = ({title, items, history, match}) => {
  return (
  <div className='collection-preview'>
    <div onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}>
      <h1 className='title'>{title.toUpperCase()}</h1>
    </div>
    <div className='preview'>
      {items.filter((item, index) => index < 4).map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  </div>
)};

export default withRouter(CollectionPreview);