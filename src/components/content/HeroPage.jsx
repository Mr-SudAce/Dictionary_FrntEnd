import foto from "../../assets/book1.png";
import Ads from "./Ads.jsx";
import Blog from "./Blog.jsx";
import Search from "./Search.jsx";
import WordOfTheDay from "./WordOfTheDay.jsx";
import PropTypes from "prop-types";
import Category from "./category.jsx";

const HeroPage = ({ base_url, dictionary_url }) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full lg:h-[45rem] md:h-[26rem] h-[25rem] shadow-md bg-[--main_color]"
        style={{
          backgroundImage: `url(${foto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
          <div className="text-center w-full max-w-4xl px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
              Welcome to MeaningBy!
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md">
              Enhance your vocabulary.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xl mt-6">
            <Search base_url={base_url} />
          </div>
        </div>
      </div>

      {/* Ads Section */}
      <div className="my-6 px-4 md:px-8">
        <Ads />
      </div>

      {/* Blog & WordOfTheDay Section */}
      <div className="md:flex-col flex-col flex mx-auto max-w-7xl">
        <Blog base_url={base_url} />
        <WordOfTheDay />
      </div>

      {/* Another Ads Section */}
      <div className="my-6 px-4 md:px-8">
        <Ads />
      </div>

      {/* Category Section */}
      <div className="my-8 px-4 md:px-8 max-w-7xl mx-auto">
        <Category base_url={base_url} dictionary_url={dictionary_url} />
      </div>

      {/* Footer Ads Section */}
      <div className="my-6 px-4 md:px-8">
        <Ads />
      </div>
    </>
  );
};

HeroPage.propTypes = {
  base_url: PropTypes.string.isRequired,
  dictionary_url: PropTypes.string.isRequired,
};

export default HeroPage;
