
//     <AuthProvider>
//       {/* <BrowserRouter> */}
//         <Switch>
//           <  PrivateRoute exact path='/' component={Dashboard} />
//           <  PrivateRoute path='/room' component={Dashboard} />
//           <  PrivateRoute path='/dashboard/chats' component={Dashboard} />
//           <  PrivateRoute path='/dashboard/users' component={Dashboard} />
//           <Route path='/login' component={Login} />
//           <Route path='/signup' component={SignUp} />
//         </Switch>
//       {/* </BrowserRouter> */}
//     </AuthProvider>


import React, { useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./styles/style.scss";
import Dashboard from "./containers/Dashboard/Dashboard";
import { AuthContext } from "./context/AuthContextProvider";
import Auth from "./containers/Auth/Auth";

function App() {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Switch>
      <Route path='/dashboard' component={Dashboard} />
      <Redirect to='/dashboard/chats' component={Dashboard} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Redirect to='/auth/login' component={Auth} />
    </Switch>
  );
}

export default App;
