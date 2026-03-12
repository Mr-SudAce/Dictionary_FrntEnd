import foto from "../../assets/pic.jpg";

const AboutUs = () => {
  return (
    <>
      <section
        id="about"
        className="w-full py-20 px-6 md:px-16 lg:px-28"
        style={{ backgroundColor: "var(--main_bg)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div
              className="w-full max-w-md overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--border_color)" }}
            >
              <img
                src={foto}
                alt="About MeaningBy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            
            {/* Title */}
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--main_color)" }}
            >
              About MeaningBy
            </h2>

            {/* Divider */}
            <div
              className="w-16 h-[3px]"
              style={{ backgroundColor: "var(--accent_color)" }}
            ></div>

            {/* Paragraphs */}
            <p
              className="leading-relaxed text-justify"
              style={{ color: "var(--secondary_text)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--main_color)" }}
              >
                MeaningBy
              </span>{" "}
              is a user-friendly online dictionary designed to help you quickly
              discover the meanings of words, phrases, and terms. Whether you
              are a student, writer, or simply curious about language, the
              platform provides clear and easy-to-understand definitions that
              help expand your vocabulary and comprehension.
            </p>

            <p
              className="leading-relaxed text-justify"
              style={{ color: "var(--secondary_text)" }}
            >
              With a simple search,{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--main_color)" }}
              >
                MeaningBy
              </span>{" "}
              provides definitions, usage examples, and sometimes related words
              or synonyms. This helps you understand not only what a word means
              but also how it is used in real situations.
            </p>

            <p
              className="leading-relaxed text-justify"
              style={{ color: "var(--secondary_text)" }}
            >
              Built with simplicity in mind, the clean interface allows you to
              focus on learning without distractions. Whether you are preparing
              for exams, writing content, or exploring language out of
              curiosity,{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--main_color)" }}
              >
                MeaningBy
              </span>{" "}
              makes discovering new words easy and accessible anytime online.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;