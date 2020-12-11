import React from "react"
import HomePage from "../containers/HomePage"

import { render, getByTestId, queryByTestId, fireEvent } from "@testing-library/react";

describe('Switching Login and Signup Page', ()=> {
  it('should show login form on load', ()=> {
    const { container } = render(<HomePage />)    
    const signUpToogle = getByTestId(container, 'signuptoggle')
    expect(signUpToogle.textContent).toBe('Sign Up')
  })

  it('should toggle to signup page when toggle', ()=> {
    const { container, rerender } = render(<HomePage />)   
    const signUpToogle = getByTestId(container, 'signuptoggle')
    
    fireEvent.click(signUpToogle)
    rerender(<HomePage />)
    expect(signUpToogle.textContent).toBe('Log-in')
  })
})

describe('Notification Toggle', ()=> {
  it('should not show notification on render', ()=>{
    const { container } = render(<HomePage />)  
    const notification = queryByTestId(container, 'notification')

    expect(notification).toBeNull()
  })
})