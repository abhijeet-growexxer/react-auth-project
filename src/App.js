import './App.css';
import { Container} from "semantic-ui-react"
import LoginPage from './Components/LoginPage/LoginPage'
import SignUpForm from "./Components/SignUpPage/SignUpForm";
import VerifyEmail from './Components/SignUpPage/VerifyEmail';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import ForgotPasswordPage from './Components/ForgotPassword/ForgotPasswordPage';
import ResetPassword from './Components/ForgotPassword/ResetPassword';
import NotFound from './Components/NotFound/NotFound';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter className="App">
      <Container>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<SignUpForm />} />
          <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route exact path="/dashboard" element={ <Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
