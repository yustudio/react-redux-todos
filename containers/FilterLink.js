import React from 'react';
import { Link } from 'react-router';  // want router to be in control of the url link

// {filter}: accepts filter as a prop, es6 destructuring assignment
const FilterLink = ({filter, children}) => (
  <Link 
    to={filter === 'all' ? '/' : filter}  // the URL path
    activeStyle={{  // link styles when 'to' prop matches current path 
      textDecoration: 'none',
      color: 'green'
    }}
    >
    {children}
    </Link>
);

export default FilterLink;

// import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
// import Link from '../components/Link'

// // state: cstore's current state
// const mapStateToProps = (state, ownProps) => {
//   return {
//     active: ownProps.filter === state.visibilityFilter
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     // if onClick is triggered in presentation components, dispatch 
//     // set visibility filter action
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter))
//     }
//   }
// }

// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link)

// export default FilterLink