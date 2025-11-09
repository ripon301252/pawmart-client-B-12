import React, { useState } from "react";
import SlideBanner from "../Components/SlideBanner";
import Categories from "./Categories/Categories";
import Pets from "./Pets/Pets";
import PetFood from "./PetFood/PetFood";
import Accessories from "./Accessories/Accessories";
import PetCareProducts from "./PetCareProducts/PetCareProducts";
import WhyAdopt from "./ExtraSection/WhyAdopt";
import MeetOurPetHeroes from "./ExtraSection/MeetOurPetHeroes";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Pets");

  return (
    <div className="max-w-7xl mx-auto px-4">
      <SlideBanner />
      <div>
        {/* Categories */}
        <Categories onCategorySelect={setSelectedCategory} />

        {/* Conditional rendering of products */}
        {selectedCategory === "Pets" && <Pets />}
        {selectedCategory === "Pet Food" && <PetFood />}
        {selectedCategory === "Accessories" && <Accessories />}
        {selectedCategory === "Pet Care Products" && <PetCareProducts />}
      </div>
      <WhyAdopt></WhyAdopt>
      <MeetOurPetHeroes></MeetOurPetHeroes>
    </div>
  );
};

export default Home;
