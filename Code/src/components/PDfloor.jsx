import React from "react";

export const Floor = ({ links }) => {
  return (
    <div className="pd--floor">
      <ul className="pd--ul">
        {links.map((link, index) => (
          <li key={index}>
            <strong>{link.label}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
