import { useContext } from "react";
import DataContext from "../../data/context";

const HomePage = () => {
  const { message } = useContext(DataContext);
  return (
    <div>
      <h1>Home Page</h1>
      <h2>{message}</h2>
      <p>hey</p>
    </div>
  );
};

export default HomePage;
