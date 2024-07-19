import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page of our application.</p>
      <p>
        <Link to="/editor">Go to Editor Page</Link>
      </p>
    </div>
  );
}

export default Home;