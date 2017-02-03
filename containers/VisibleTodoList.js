import React, { Component } from  'react';
import { connect } from 'react-redux'
import { withRouter }  from 'react-router'  // allow inject params directly to component not pass through App
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching } from '../reducers'
import TodoList from '../components/TodoList'
//import { fetchTodos } from '../api';  // fetch todos inside component

 // add this component so that can have life cycle hooks
 // It adds data fetching logic to presentation component Todolist
class VisibleTodoList extends Component {
  componentDidMount() {  // only runs once
   this.fetchData();
  }

  // if props.filter changed, it means user has changed state that connect is watching
  componentDidUpdate(prevProps) {   
    if (this.props.filter !== prevProps.filter) {      
     this.fetchData();
    }
  }

  fetchData() {
     const { filter, fetchTodos } = this.props;  // fetchTodos is injected by connect from action

     //requestTodos(filter);  // send off action to set fetching to true

    // returns a promise that resolves to an action
     fetchTodos(filter);
      
    // const { filter, receiveTodos } = this.props;

    // // want fetchtodos to be part of state, so need to dispatch action
    //  fetchTodos(filter).then(todos => 
    //     //console.log(filter, todos)
    //     receiveTodos(filter, todos)
    //   );
  }

  render() { 
    const { toggleTodo, todos, isFetching } = this.props;  

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return ( 
      <TodoList 
        todos={todos}
        //{...rest} 
        onTodoClick={toggleTodo} 
      /> 
    ); 
  }
}


// same as ownParams, now becomes ownProps.params passed in directly from router :filter arg
const mapStateToProps = (state, {params}) => {   

  const filter = params.filter || 'all';

  console.log("mapStateToProps state: " + JSON.stringify(state) + " params: " + JSON.stringify(params))
  return {
    todos: getVisibleTodos(state, filter),  
    isFetching: getIsFetching(state, filter),
    filter  // so it will be available inside our component VisibleTodoList   
  }
}

// const mapStateToProps = (state, {params}) => {   // same as ownParams, then refer ownProps.params

//   const filter

//   console.log("mapStateToProps state: " + JSON.stringify(state) + " params: " + JSON.stringify(params))
//   return {
//     todos: getVisibleTodos(
//       state, // pass entire state and let selector filter on state to get state.todos only
//       //state.visibilityFilter  // read from the store
//       params.filter || 'all'
//     ) 
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {   // same as onTodoClick(id) { ... }
//       dispatch(toggleTodo(id))
//     }
//   }
// }

// component genereated by connect subscribes to the store and pass state to 
// the component we wrote VisitbleTodoList, and call render of VisibleTodoList
// withRouter subscribe to router change, so mapStateToProps has acess to params.filter in the URL
VisibleTodoList = withRouter(connect(  
  mapStateToProps,
  //mapDispatchToProps
  actions
  //{ onTodoClick: toggleTodo, receiveTodos} // shorthand for mapDispatchToProps(map presentation click to action) when the params are the same
)(VisibleTodoList))

// Note 1: Use connect to transform the current Redux store state & action callback 
// into the props you want to pass to a presentational component
// Note 2: Wrap withRouter around connect so that params is passed to connect as prop
// const VisibleTodoList = withRouter(connect(
//   mapStateToProps,
//   //mapDispatchToProps
//   { onTodoClick: toggleTodo } // shorthand for mapDispatchToProps(map presentation click to action) when the params are the same
// )(TodoList))



export default VisibleTodoList