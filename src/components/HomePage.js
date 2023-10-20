import React from "react";
import logo from '../images/food.jpg';
import { Link } from 'react-router-dom';


function HomePage() {

  return (
    <section className="homepage-container rounded">
      <article className="restaurant-info">
        <header>
          <h1 className="subtitle littlelemonhompagetitle">Little Lemon</h1>
          <h2 className="spec.special-section-title">Chicago</h2>
        </header>
        <p className="highlight-text">We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <Link to="/booking" className="button-style rounded">Reserve a Table</Link>
      </article>
      <figure className="food-image">
        <img src={logo} alt="Delicious food from Little Lemon" className="rounded" />
        <figcaption>Example of our delicious foods.</figcaption>
      </figure>
    </section>
  );
}

export default HomePage;