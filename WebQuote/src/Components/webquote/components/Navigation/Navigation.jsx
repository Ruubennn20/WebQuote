import React from "react";

const navItems = [
  { id: 1, text: "Home", href: "/" },
  { id: 2, text: "Sobre nós", href: "/sobre" },
  { id: 3, text: "Contactos", href: "/contactos" },
];

export default function Navigation() {
  return (
    <nav className="nav">
      {navItems.map((item) => (
        <a key={item.id} href={item.href} className="nav-link">
          {item.text}
        </a>
      ))}
      <style jsx>{`
        .nav {
          display: flex;
          align-items: center;
          gap: 40px 56px;
          justify-content: start;
          flex-wrap: wrap;
          margin: auto 0;
        }
        .nav-link {
          color: var(--white);
          text-decoration: none;
          font-size: 30px;
          align-self: stretch;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .nav {
            max-width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
