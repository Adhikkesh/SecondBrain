import HomePage from "./HomePage";
import Body from "./ui/Body";
import SignIn from "./ui/Signin";
import SignUp from "./ui/SignUp";
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
