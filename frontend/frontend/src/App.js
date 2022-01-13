import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";


function App() {
  return (
    <Provider store={store}>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
