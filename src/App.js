import React from 'react';
import routes from "./routes";
import { withRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
