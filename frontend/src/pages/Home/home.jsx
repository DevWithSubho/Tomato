import ExploreMenu from "../../components/exploreMenu/exploreMenu";
import Header from "../../components/header/header";
import "./home.css";
import FoodDisplay from "../../components/FoodDisplay/foodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
const Home = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
      <AppDownload />
    </div>
  );
};

export default Home;
