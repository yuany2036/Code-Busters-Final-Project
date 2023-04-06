import './styles/App.scss';
import NavBar from './components/navBar/NavBar';
import Router from './routes/Routes';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Router />
      <Footer />
    </>
  );
}

export default App;
