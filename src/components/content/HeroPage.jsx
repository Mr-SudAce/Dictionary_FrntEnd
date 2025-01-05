import foto from "../../assets/book1.png";
// import Features from "./Features.jsx";
import Ads from "./Ads.jsx";
import Blog from "./Blog.jsx";
import Search from "./Search.jsx";
import WordOfTheDay from "./WordOfTheDay.jsx";
import PropTypes from 'prop-types';
import Category from "./category.jsx";




const HeroPage = ({ base_url, dictionary_url }) => {
    return (
        <>
            <div
                className="relative lg:h-[52rem] md:h-[26rem] h-[25rem] shadow"
                style={{
                    backgroundImage: `url(${foto})`,
                    backgroundSize: "cover",
                    backgroundColor: "var(--main_color)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                    <div className="text-center w-full max-w-4xl px-4">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4" style={{ textShadow: "2px 2px 5px var(--hover_color)", color: "var(--text_color)", }}>
                            Welcome to MeaningBy!
                        </h1>
                        <p className="text-lg md:text-xl lg:text-xl font-semibold justify-center" style={{ textShadow: "2px 2px 5px var(--hover_color)", color: "var(--text_color)", }}>
                            Enhance your vocabulary.
                        </p>
                    </div>
                    {/* <Search/> */}
                    <div className="relative w-full max-w-xl">
                        <Search base_url={base_url} />
                    </div>
                </div>
            </div>
            <Ads />

            <div className="justify-between flex container-fluid flex-wrap">
                <Blog base_url={base_url} />
                <WordOfTheDay />
                {/* <Features base_url={base_url} /> */}
            </div>
            <Ads />
            <div>
                <Category base_url={base_url} dictionary_url={dictionary_url} />
            </div>
            <Ads />
        </>
    );
};

HeroPage.propTypes = {
    base_url: PropTypes.string.isRequired,
    dictionary_url: PropTypes.string.isRequired,
};
export default HeroPage;
