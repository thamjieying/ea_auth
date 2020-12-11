import React from "react"
import Notification from "../components/Notification"

import { render, getByTestId } from "@testing-library/react";

describe('Notification', () => {
  it('should display positive notification', () => {
    const { container } = render(<Notification
      status="positive"
      message="I am a positive message"
    />)
    const messageHeader = getByTestId(container, 'messageHeader')
    const message = getByTestId(container, 'message')
    expect(messageHeader.textContent).toBe('Success')
    expect(message.textContent).toMatch(/I am a positive message/)
    
  })

  it('should display negative notification', () => {
    const { container } = render(<Notification
      status="error"
      message="I am a error message"
    />)
    const messageHeader = getByTestId(container, 'messageHeader')
    const message = getByTestId(container, 'message')
    expect(messageHeader.textContent).toBe('Error!')
    expect(message.textContent).toMatch(/I am a error message/)
  })

  it('should display warning notification', () => {
    const { container } = render(<Notification
      status="warning"
      message="I am a warning message"
    />)
    const messageHeader = getByTestId(container, 'messageHeader')
    const message = getByTestId(container, 'message')
    expect(messageHeader.textContent).toBe('Warning!')
    expect(message.textContent).toMatch(/I am a warning message/)
  })
})