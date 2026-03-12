import foto from "../../assets/pic.jpg";

const AboutUs = () => {
    return (
        <>
            {/* About Us Section */}
            <section
                id="about"
                className="w-full py-16 px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
                style={{ backgroundColor: "var(--main_bg)" }}
            >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 flex items-center justify-center">
                    <img
                        src={foto}
                        alt="About Us"
                        className="w-[90%] md:w-full object-cover rounded-xl shadow-xl border-4 border-[var(--main_color)] transition-transform duration-500"
                    />
                    <h2
                        className="absolute text-4xl md:text-5xl lg:text-6xl font-bold text-white px-4 py-2 rounded-lg"
                        style={{
                            top: "65%",
                            left: "50%",
                            transform: "translate(10%, 100%)",
                            backgroundColor: "var(--main_color)",
                        }}
                    >
                        About Us
                    </h2>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 text-[var(--secondary_text)]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center md:text-left text-[var(--main_color)]">
                        Welcome to MeaningBy
                    </h3>

                    <p className="text-justify leading-relaxed">
                        <span className="font-bold text-[var(--main_color)]">MeaningBy</span> is a user-friendly online dictionary that helps you quickly find the meanings of words, phrases, and terms. Whether you&apos;re a student, writer, or just someone curious about language, this platform offers clear and easy-to-understand definitions to enhance your vocabulary and comprehension. The site is designed to make learning convenient.
                    </p>

                    <p className="text-justify leading-relaxed">
                        You can search for any word, and <span className="font-semibold text-[var(--main_color)]">MeaningBy</span> will provide its definition, usage examples, and sometimes synonyms or related terms. This helps you not only understand the word but also see how it&apos;s used in real-life situations. MeaningBy stands out for its simplicity and accessibility. The clean interface ensures you can focus on what matters most: learning new words and their meanings.
                    </p>

                    <p className="text-justify leading-relaxed">
                        In addition to definitions, <span className="font-semibold text-[var(--main_color)]">MeaningBy</span> may include pronunciation guides or links to similar words, making it a versatile tool for expanding your knowledge. Whether you&apos;re preparing for an exam, writing a report, or just exploring language for fun, MeaningBy is a handy resource to have at your fingertips. Best of all, it&apos;s available online anytime, making it perfect for quick lookups on the go.
                    </p>
                </div>
            </section>
        </>
    );
};

export default AboutUs;