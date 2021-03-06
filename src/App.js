import React, { useState, useMemo } from "react";
import Header from "./components/Header/Header";
import UserInfo from "./components/UserInfo/Userinfo";
import LandingPage from "./components/LandingPage/LandingPage";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import UserFilter from "./components/UserFilter/UserFilter";
import UserTile from "./components/UserTiles/UserTile/UserTile";
import SearchPage from "./components/SearchPage/SearchPage";
import { UserProvider, UserContext } from "./userContext";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [auth, setAuth] = useState(false);

  // Helps with optimization
  const value = useMemo(() => ({ userInfo, setUserInfo }), [
    userInfo,
    setUserInfo,
  ]);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
        }
      />
    );
  };

  const handleAuth = (props) => {
    setAuth(props);
    console.log("AUTH " + auth);
  };

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <LandingPage handleAuth={handleAuth} />
            </Route>
            <PrivateRoute
              exact
              path="/Profile/:id"
              component={UserInfo}
              auth={auth}
            />
            <PrivateRoute
              exact
              path="/Messages"
              component={SearchPage}
              auth={auth}
            />
            <PrivateRoute
              exact
              path="/SearchPage"
              component={SearchPage}
              auth={auth}
            />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
