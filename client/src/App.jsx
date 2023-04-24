import './styles/App.scss';
import NavBar from './components/navBar/NavBar';
import Router from './routes/Routes';
import Footer from './components/footer/Footer';
import LoggedInNavBar from './components/navBar/LoggedInNavBar';
import { useContext } from 'react';
import DataContext from './data/context';

function App() {
  const { isUserLoggedIn } = useContext(DataContext);
  return (
    <>
      {!isUserLoggedIn && <LoggedInNavBar />}
      {/* {!isUserLoggedIn && <NavBar />} */}
      <Router />
      <Footer />
    </>
  );
}

export default App;
