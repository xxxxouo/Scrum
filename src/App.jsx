import React from 'react';
import { useRoutes } from 'react-router-dom';
import GetRoutes from 'routers/index';
const App = ()=> {
  const element = useRoutes(GetRoutes);
  return (
    <div className="App">
      { element}
    </div>
  );
}

export default App;
