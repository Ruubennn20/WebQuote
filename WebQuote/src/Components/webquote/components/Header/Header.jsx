import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <style jsx>{`
        .header {
          background-color: var(--dark-blue);
          display: flex;
          width: 100%;
          gap: 20px;
          color: var(--white);
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 11px 80px;
        }
        @media (max-width: 991px) {
          .header {
            max-width: 100%;
            padding: 0 20px;
          }
        }
      `}</style>
    </header>
  );
}
