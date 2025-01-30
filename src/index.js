import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoadingScreen from './LoadingAnim/LoadingAnim';
import './index.css'



// const auth0Domain = process.env.REACT_APP_AUTH0_ISSUER_BASE_URL;
// const auth0clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const baseUrl = process.env.REACT_APP_BASE_URL;
// console.log(auth0Domain);
// console.log(auth0clientId);

// #D4A373 and #2C2C2C
const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 444); // 10 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return isLoading ? (<>
    <LoadingScreen loadingText="Curating the perfect dress just for you... 👗✨"/>
    </>
  ) : (
    <>
   
    
    <App className="scroll-smooth"/>
    </>


  );
};

const root = createRoot(document.getElementById('root'));
root.render(<RootComponent />);
