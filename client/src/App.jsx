import './styles/App.scss';
import NavBar from './components/navBar/NavBar';
import Router from './routes/Routes';
import Footer from './components/footer/Footer';
import LoggedInNavBar from './components/navBar/LoggedInNavBar';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DataContext from './data/context';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './App.module.scss';

function App() {
  const { isUserLoggedIn } = useContext(DataContext);
  const currentRoute = useLocation().pathname;
  const excludedRoutes = ['/register', '/login'];
  const shouldRenderFooter = !excludedRoutes.includes(currentRoute);

  console.log(process.env.NODE_ENV);

  return (
    <>
      {isUserLoggedIn && <LoggedInNavBar />}
      {!isUserLoggedIn && <NavBar />}
      <Router />
      {shouldRenderFooter && <Footer />}
    </>
  );
}

export default App;
