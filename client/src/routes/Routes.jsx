import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import ExplorePage from '../components/explorePage/ExplorePage';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
  </Routes>
);

export default Router;
