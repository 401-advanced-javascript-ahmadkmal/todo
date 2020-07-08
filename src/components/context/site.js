import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [listNum, setListNum] = useState(3);
  const [sort, setSort] = useState('difficulty');
  const [show, setShow] = useState(false);
  
  const state = {
    listNum,
    sort,
    setSort,
    show,
    setShow,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;