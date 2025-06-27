import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hello" element={<h1>Hello</h1>}></Route>
        <Route path="/movie/:id" element={< Detail / >}></Route>
        <Route path="/" element={< Home / >}></Route>
      </Routes>
    </Router>
  );
}

export default App;