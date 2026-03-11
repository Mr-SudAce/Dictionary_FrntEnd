import ads from "../../assets/gif.webp";

const Ads = () => {
    return (
        <div className="flex justify-center items-center max-w-6xl mx-auto py-8 md:px-2">
            <div 
                className="w-full md:w-4xl lg:w-4xl bg-white rounded-xl shadow-xl overflow-hidden border-2 border-[var(--main_color)] transition-transform duration-500 "
                style={{ backgroundColor: "var(--card_bg)" }}
            >
                <img
                    src={ads}
                    alt="Ad"
                    className="w-full h-52 md:h-64 object-cover"
                />
            </div>
        </div>
    );
};

export default Ads;