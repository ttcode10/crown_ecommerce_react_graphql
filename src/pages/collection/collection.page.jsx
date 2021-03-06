import React from 'react';

import './collection.page.styles.scss';
import { default as  CollectionItem } from './../../components/collection-item/collection-item.container';

const CollectionPage = ({collection}) => {
  const {title, items} = collection;
  return(
      <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
          {items.map(item => (<CollectionItem className='collection-item' key={item.id} item={item} />))}
        </div>
      </div>
  )
};

export default CollectionPage;
