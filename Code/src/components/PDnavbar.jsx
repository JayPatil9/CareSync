import React from "react";

export const NavBar = ({ link, menuItems, logoSrc, profileSrc }) => {
  return (
    <section className="pd--sec">
      <div className="pd--logo">
        <img src={logoSrc} alt="Logo" />
      </div>
      <ul className="pd--container">
        {menuItems.map((item, index) => (
          <a key={index} href={item.link}>
            <li>{item.label}</li>
          </a>
        ))}
      </ul>
      <div className="pd--profile">
        <img onClick={link} src={profileSrc} alt="Profile" />
      </div>
    </section>
  );
};
