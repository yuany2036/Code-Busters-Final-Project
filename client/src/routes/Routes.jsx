import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import ExplorePage from '../components/explorePage/ExplorePage';
import About from '../components/about/About';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import NotFound from '../components/notFound/NotFound';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
   
  </Routes>
);

export default Router;
