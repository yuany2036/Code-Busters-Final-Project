import './App.scss';
import LandingPage from './components/landingPage/LandingPage.jsx';
import NavBar from './components/navBar/NavBar';
import Router from './routes/Routes';

function App() {
  return (
    <>
      <NavBar />
      <Router />
      <LandingPage />
    </>
  );
}

export default App;
