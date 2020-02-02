import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionLoaded } from './../../redux/shop/shop.selector';

import CollectionPage from './collection.page';
import WithSpinner from './../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);


export default CollectionPageContainer;