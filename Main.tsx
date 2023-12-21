import React from 'react';

// import UserInactivity from 'react-native-user-inactivity';
import ContextProvider from './app/context';
import App from './App';

export default function () {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}
