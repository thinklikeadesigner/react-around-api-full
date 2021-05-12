
import React from 'react';

export function Header(props) { 
  
  

  
  return (
  <header className="header">
  <div className={`header__container ${props.headerlogout}`}>
    <div
      className="header__logo"
      aria-label="text logo that says Around'"

      ></div>
      
{props.children}
  </div>
</header>
);}


