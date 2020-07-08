import React from 'react';

import ToDo from './components/todo/todo-connected';
import SettingsContext from './components/context/site';
export default function App() {
  return (
    <>
    <SettingsContext>
      <ToDo />
    </SettingsContext>
    </>
  );
}
