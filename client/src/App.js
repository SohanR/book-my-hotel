import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";


function App() {
  return (
    <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
    </Switch>
    
    </BrowserRouter>
  );
}

export default App;
