// import { useContext } from 'react';
// import DataContext from '../data/context';
import { Routes, Route } from 'react-router-dom';
// import LandingPage from '../components/landingPage/LandingPage';
import HomePage from '../components/homePage/HomePage';
import ExplorePage from '../components/explorePage/ExplorePage';
import About from '../components/about/About';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import NotFound from '../components/notFound/NotFound';
import TitlePage from '../components/titlePage/TitlePage';
import Collection from '../components/collection/Collection';
import Profile from '../components/userProfile/UserProfile';
import Preferences from '../components/userProfile/Preferences';
// import Animation from '../components/landingPage/landingAnimation/Animation';

const Router = () => {
  // const { state } = useContext(DataContext);

  // const RenderedComponent = () => {
  //   if (state.isLoggedIn) {
  //     return <HomePage />;
  //   } else {
  //     return <LandingPage />;
  //   }
  // };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      {/* <Route path="/landing" elenment={<LandingPage />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/title/:movie_id" element={<TitlePage />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
