import React from "react";
import imageOne from "../assets/aboutus1.png";
import imageTwo from "../assets/aboutus2.png";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900 min-h-screen">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Vision: Revolutionizing the cryptocurrency experience.
            </h2>
            <p class="mb-4">
              At CryptoHub, our mission is to provide a comprehensive
              cryptocurrency monitoring platform where users can access
              real-time data, stay updated with the latest news, and interact
              with our AI-powered chat assistance.
            </p>
            <p>
              We strive to empower users by offering a seamless browsing
              experience, enabling them to monitor top cryptocurrencies, access
              global cryptocurrency statistics, and stay informed about
              cryptocurrency trends worldwide.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img
              class="w-full rounded-lg"
              src={imageOne}
              alt="office content 1"
            />
            <img
              class="md:mt-5 mt-10 w-full md:h-[19rem] lg:mt-10 rounded-lg"
              src={imageTwo}
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
