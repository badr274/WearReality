import React, { useState } from 'react';
const MyNavbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Cart', id: 'cart' },
    { name: 'Products', id: 'products' },
    { name: 'Categories', id: 'categories' },
  ];

  const linkStyle = (id) => ({
    color: activeLink === id ? '#651214' : '#4d4d4d',
    textDecoration: 'none',
    fontWeight: activeLink === id ? '600' : 'normal',
    transition: 'color 0.3s',
  });

  return (
    <nav className="navbar  navbar-expand-lg border-bottom py-2 shadow-sm"
    style={{ backgroundColor: '#f6f2f2ff' }}
    >
      <div className="container">

        <a className="navbar-brand d-flex align-items-center" href="#">
  <i
    className="bi bi-cart-fill fs-4 me-2"
    style={{ color: '#651214' }}  
  ></i>
  <span className="fw-bold " style={{ color: '#651214' }}  >Wear Reality</span>
</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 flex-lg-row gap-lg-3">
  {navLinks.map(link => (
    <li className="nav-item" key={link.id}>
      <a
        href={`#${link.id}`}
        style={linkStyle(link.id)}
        onClick={() => setActiveLink(link.id)}
        onMouseEnter={e => {
          if (activeLink !== link.id) e.target.style.color = '#651214';
        }}
        onMouseLeave={e => {
          if (activeLink !== link.id) e.target.style.color = '#4d4d4d';
        }}
      >
        {link.name}
      </a>
    </li>
  ))}
</ul>


          <div className="d-flex gap-3 mt-3 mt-lg-0  flex-column flex-lg-row">
          <ul className="d-flex list-unstyled mb-0 gap-3">
  <ul className="d-flex list-unstyled mb-0 gap-3">
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-instagram"></i>
    </a>
  </li>
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-pinterest"></i>
    </a>
  </li>
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-tiktok"></i>
    </a>
  </li>
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-twitter"></i>
    </a>
  </li>
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-linkedin"></i>
    </a>
  </li>
  <li>
    <a href="#"
      style={{
        color: '#4d4d4d',
        fontSize: '1.2rem',
        transition: 'color 0.3s',
      }}
      onMouseEnter={e => e.target.style.color = '#651214'}
      onMouseLeave={e => e.target.style.color = '#4d4d4d'}
    >
      <i className="bi bi-youtube"></i>
    </a>
  </li>
</ul>

</ul>

<a href="#signout" className="signout-link text-decoration-none" style={{ color: '#651214' }}  >Sign Up</a>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;