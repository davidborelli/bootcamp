import React from "react";
import logoFacebook from "../assets/facebook-logo.png";

function Header() {
  return (
    <header id="main-header">
      <div className="content">
        <img src={logoFacebook} />
        <div className="profile">
          <span>Meu perfil</span>
          <i className="material-icons">account_circle</i>
        </div>
      </div>
    </header>
  );
}

export default Header;
