import logo from './logo.svg';
import './App.css';

import React, { Fragment, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";


import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

// import { Suspense, lazy } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';
// import { mainroutes } from './routes';
// import MainPage from './views/MainPage';


function  App({ signOut, user }) {


  const { unityProvider,loadingProgression, isLoaded, sendMessage, addEventListener, removeEventListener } =
  useUnityContext({
    loaderUrl: "Build/samsung_cnt_build8.loader.js",
    dataUrl: "Build/samsung_cnt_build8.data",
    frameworkUrl: "Build/samsung_cnt_build8.framework.js",
    codeUrl: "Build/samsung_cnt_build8.wasm",
  });
  const handleGameOver = () =>{
    console.log("react webgl test!!!!!!!!");






  }
  useEffect(() => {
    addEventListener("ReactCall", handleGameOver);
    return () => {
      removeEventListener("ReactCall", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);




  function handleClickSpawnEnemies() {
    sendMessage("GameController", "SpawnEnemies", 100);
  }
  return (


    <Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button>test</button>
        {!isLoaded && (
          <div>
          <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
          <div style={{ width: '100%', backgroundColor: '#eee' }}>
              <div style={{ height: '20px', width: `${loadingProgression * 100}%`, backgroundColor: 'green' }}></div>
            </div>
          </div>
      )}
          <Unity style= {{  
            width: '100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            visibility: isLoaded ? "visible" : "hidden" 
            }}    
      unityProvider={unityProvider} />

      <button onClick={handleClickSpawnEnemies}> test2</button>

      </header>
    </div>
    </Fragment>


   
  );
}

export default withAuthenticator(App);
