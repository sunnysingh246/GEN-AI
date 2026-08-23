import React from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "./app.routes.jsx";
import { AuthProvier } from './features/auth/auth.context.jsx'

const App = () => {
  return
  <AuthProvier>
    <RouterProvider router={router} />;
  </AuthProvier>

};

export default App;