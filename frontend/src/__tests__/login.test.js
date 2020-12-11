import React from "react"
import Login from "../components/Login"

import { render, getByPlaceholderText, fireEvent } from "@testing-library/react";

describe('Login Functions', ()=> {
  it('Login form loads with empty email', () => {
    const { container } = render(<Login />)
    const email = getByPlaceholderText(container, 'E-mail address')
    expect(email.textContent).toBe('')
  })
  
  it('Login form loads with empty password', () => {
    const { container } = render(<Login />)
    const password = getByPlaceholderText(container, 'Password')
    expect(password.textContent).toBe('')
  })
  
  it('should update email address and password field', ()=> {
    const { container, rerender } = render(<Login />);
    const emailValue = getByPlaceholderText(container, 'E-mail address');
    const passwordValue = getByPlaceholderText(container, 'Password')
  
    fireEvent.change(emailValue, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordValue, { target: { value: 'password' } });
  
  
    expect(emailValue.value).toEqual('test@test.com');
    expect(passwordValue.value).toEqual('password');
    rerender(<Login />);
  })
})
