
import SlideBanner from "../Components/SlideBanner";
// import Categories from "./Categories/Categories";
import WhyAdopt from "./ExtraSection/WhyAdopt";
import MeetOurPetHeroes from "./ExtraSection/MeetOurPetHeroes";
import RecentList from "../Components/RecentList";

const Home = () => {
  

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <SlideBanner />
      <RecentList />
      <WhyAdopt></WhyAdopt>
      <MeetOurPetHeroes></MeetOurPetHeroes>
    </div>
  );
};

export default Home;
