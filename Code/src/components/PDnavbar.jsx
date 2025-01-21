import React from "react";

export const NavBar = ({ menuItems, logoSrc, profileSrc }) => {
  return (
    <section id="sec">
      <div id="logo">
        <img src={logoSrc} alt="Logo" />
      </div>
      <ul className="container">
        {menuItems.map((item, index) => (
          <a key={index} href={item.link}>
            <li>{item.label}</li>
          </a>
        ))}
      </ul>
      <div id="profile">
        <img src={profileSrc} alt="Profile" />
      </div>
    </section>
  );
};
