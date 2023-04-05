import './App.scss';
import NavBar from './Components/NavBar/NavBar';
import Routes from './routes/Routes';
import LandingPage from "./Components/LandingPage/LandingPage.jsx";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
