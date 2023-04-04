import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ExplorePage from '../components/ExplorePage/ExplorePage';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
  </Routes>
);

export default Router;
