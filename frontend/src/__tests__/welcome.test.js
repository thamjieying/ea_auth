import React from "react"
import Welcome from "../containers/Welcome"

import { render, getByTestId, fireEvent } from "@testing-library/react";

describe('Welcome page',()=>{
  it('should display welcome page', ()=> {
    const { container } = render(<Welcome />)
    const welcomeText = getByTestId(container, 'welcomeText')
    expect(welcomeText.textContent).toBe('Welcome')
  })
  
  it('should display logout button',()=> {
    const { container } = render(<Welcome />)
    const logoutBtn = getByTestId(container, 'logoutBtn')
    expect(logoutBtn.textContent).toBe('Log out')
  })
})