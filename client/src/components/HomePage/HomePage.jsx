import { useContext } from "react";
import DataContext from "../../data/context";

const HomePage = () => {
  const { firstName } = useContext(DataContext);
  return (
    <div>
      <h1>Home Page</h1>
      <h2>{firstName}</h2>
    </div>
  );
};

export default HomePage;
