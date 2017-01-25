import React, { PropTypes } from 'react'

// children is the value inside the HTML tags, e.g. All, Active, Completed
const Link = ({ active, children, onClick }) => {
  if (active) {
    console.log("-------Link: active: " + active + ", children: " + children)
    return <span>{children}</span>
  }

  console.log("-------Link: active: " + active + ", children: " + children)
  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link