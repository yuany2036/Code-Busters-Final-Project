import './styles/App.scss';
import NavBar from './components/navBar/NavBar';
import Router from './routes/Routes';
import Footer from './components/footer/Footer';
import LoggedInNavBar from './components/navBar/LoggedInNavBar';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <LoggedInNavBar />
      <Router />
      <Footer />
    </>
  );
}

export default App;
