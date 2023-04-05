import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import ExplorePage from '../components/explorePage/ExplorePage';
import Animation from '../components/landingPage/booksAnimation/Animation';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/animation" element={<Animation />} />
  </Routes>
);

export default Router;
