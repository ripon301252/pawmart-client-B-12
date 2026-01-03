import React from "react";
import { Typewriter } from "react-simple-typewriter";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      {/* Heading */}
      <h1 className="text-center text-4xl text-gray-700 dark:text-gray-200  font-bold mb-8 flex items-center justify-center gap-3">
        🐾
        <Typewriter
          words={[ "About", "About PawMart"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      {/* Intro */}
      <p className="mb-8 text-gray-700 dark:text-gray-200  text-center md:text-left text-base md:text-lg">
        PawMart is a modern pet marketplace connecting pet lovers with trusted
        sellers, adoption centers, and essential pet care products. Our mission
        is to make adoption and shopping simple, transparent, and reliable.
      </p>

      {/* Mission & Vision */}
      <div className="grid gap-10 md:grid-cols-2 mb-12">
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200 ">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We aim to create a trusted digital platform where pet adoption and
            responsible pet ownership are accessible to everyone.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200 ">
            Why Choose Us
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Verified sellers & adoption centers</li>
            <li>User-friendly & responsive interface</li>
            <li>Secure and transparent platform</li>
            <li>Built with modern web technologies</li>
          </ul>
        </div>
      </div>

      {/* Technology Section */}
      <section className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Technology Behind PawMart
        </h2>
        <p className="text-base md:text-lg">
          PawMart is developed using <strong>React</strong>,{" "}
          <strong>Next.js</strong>, and <strong>Tailwind CSS</strong> to provide
          a responsive, fast, and scalable web application. React enables
          component-based development, Next.js ensures SEO-friendly routing and
          server-side rendering, and Tailwind CSS allows rapid and maintainable
          styling.
        </p>
      </section>

      {/* CTA Button */}
      <div className="mt-12 text-center md:text-left">
        <a
          href="/contact"
          className="inline-block bg-[#5b46b1] hover:bg-[#6a55d8] text-white  px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default About;
