import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div>
          <Link
          to={`/login/`}>Login to check your lists before you run out!</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;