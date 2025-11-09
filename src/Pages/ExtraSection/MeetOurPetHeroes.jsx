import React from "react";

const heroes = [
  {
    name: "Sadia Rahman",
    role: "Adopted Bella (Golden Retriever)",
    img: "https://i.ibb.co/9Vv9Hjm/hero1.jpg",
  },
  {
    name: "Rafiul Hasan",
    role: "Rescued Milo the Cat",
    img: "https://i.ibb.co/3YxFw5Y/hero2.jpg",
  },
  {
    name: "Jannat Ara",
    role: "Volunteer & Pet Foster",
    img: "https://i.ibb.co/5WB1z5p/hero3.jpg",
  },
  {
    name: "Kamal Uddin",
    role: "Adopted Max (German Shepherd)",
    img: "https://i.ibb.co/N1GNYn1/hero4.jpg",
  },
];

const MeetOurPetHeroes = () => {
  return (
    <section className="my-20 text-center px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        🦸‍♂️ Meet Our <span className="text-orange-500">Pet Heroes</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {heroes.map((hero, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-md transition-all p-4"
          >
            <img
              src={hero.img}
              alt={hero.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{hero.name}</h3>
            <p className="text-sm text-gray-600">{hero.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurPetHeroes;
