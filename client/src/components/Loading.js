import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return ( <Spinner animation="grow" variant="warning">
  <span className="visually-hidden">Loading...</span>
</Spinner>
  )
}

export default Loading