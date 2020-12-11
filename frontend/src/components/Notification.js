import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  const { status, message } = props
  const statusAttribute = () => {
    if(status === 'positive' || status === 'warning' || status ==='error') {
      return {
        [status]: true
      }
    }
    return {}
  }
  const headerMessage = () => {
    let header
    switch (status) {
      case 'positive':
        header = 'Success'
        break
      case 'error':
        header = 'Error!'
        break
      case 'warning':
        header = 'Warning!'
        break
      default:
        break
    }
    return header
  }

  return (
    <Message {...statusAttribute()} data-testid="message">
      <Message.Header
        data-testid="messageHeader"
      >
        {headerMessage()}
      </Message.Header>
      {message}
    </Message>
  )
}

export default Notification