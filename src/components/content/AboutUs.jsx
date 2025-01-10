import foto from "../../assets/pic.jpg";

const AboutUs = () => {

    return (
        <>
            {/* About Us Section */}
            <section id="about" className="container-fluid bg-gray-100 py-12 flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0">
                <div className="relative w-full md:w-2/4 flex items-center justify-center p-2">
                    <img
                        src={foto}
                        alt="About Us"
                        className="max-w-full w-[80%] object-cover rounded-lg shadow-lg relative"
                    />
                    <h2 className="absolute w-80 h-20 md:w-[14rem] md:20 lg:top-5 lg:left-[70%] md:top-5 md:left-[59%] top-[69%]  flex justify-center items-center text-6xl md:text-5xl font-bold text-white rounded-lg bg-opacity-50 bg-black"
                        style={{ textShadow: "2px 2px 2px var(--main_color)" }}>
                        About Us
                    </h2>
                </div>

                <div className="w-full md:w-2/4 px-6 text-gray-800 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center md:text-left">Welcome to MeaningBy</h3>
                    <p className="text-justify leading-relaxed">
                        <span className="font-bold">MeaningBy</span> is a user-friendly online dictionary that helps you quickly find the meanings of words, phrases, and terms. Whether you&apos;re a student, writer, or just someone curious about language, this platform offers clear and easy-to-understand definitions to enhance your vocabulary and comprehension. The site is designed to make learning convenient.
                    </p>
                    <p className="text-justify leading-relaxed">
                        You can search for any word, and MeaningBy will provide its definition, usage examples, and sometimes synonyms or related terms. This helps you not only understand the word but also see how it&apos;s used in real-life situations. MeaningBy stands out for its simplicity and accessibility. The clean interface ensures you can focus on what matters most: learning new words and their meanings.
                    </p>
                    <p className="text-justify leading-relaxed">
                        In addition to definitions, MeaningBy may include pronunciation guides or links to similar words, making it a versatile tool for expanding your knowledge. Whether you&apos;re preparing for an exam, writing a report, or just exploring language for fun, MeaningBy is a handy resource to have at your fingertips. Best of all, it&apos;s available online anytime, making it perfect for quick lookups on the go.
                    </p>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
