import React from 'react';

import ToDo from './components/todo/todo-connected';
import SettingsContext from './components/context/site';
import LoginContext from './components/context/loginContext'
export default function App() {
  return (
    <>
          <LoginContext>
        <Header></Header>
        <Login />
        <SignUp />
        <Auth capability="read">
          <SettingsContext>
            <ToDo />
          </SettingsContext>
        </Auth>
        </LoginContext>
    </>
  );
}
