import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import "../../main.css";
import { Link } from "react-router-dom";

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const words = [
    "Quixotic",
    "Ramification",
    "Rebuke",
    "Reclusive",
    "Refine",
    "Reiterate",
    "Resilient",
    "Reverent",
    "Scrutinize",
    "Sentient",
    "Accentuate",
    "Acceptable",
    "Acclimate",
    "Accomplish",
    "Accord",
    "Accost",
    "Acknowledge",
    "Acquaintance",
    "Acquire",
    "Acquit",
    "Fathom",
    "Feasible",
    "Finesse",
    "Flamboyant",
    "Frivolous",
    "Frugal",
    "Futile",
    "Galvanize",
    "Garrulous",
    "Gratify",
    "Appropriate",
    "Ardent",
    "Arduous",
    "Artifice",
    "Ascend",
    "Aspire",
    "Assert",
    "Assess",
    "Assiduous",
    "Associate",
    "Bewilder",
    "Bias",
    "Blatant",
    "Blithe",
    "Boisterous",
    "Bombastic",
    "Bravado",
    "Brevity",
    "Cacophony",
    "Cajole",
    "Calamity",
    "Callous",
    "Capricious",
    "Caricature",
    "Catalyst",
    "Caustic",
    "Celerity",
    "Chastise",
    "Cherish",
    "Clandestine",
    "Eloquent",
    "Pugnacious",
    "Recalcitrant",
    "Disparate",
    "Commingle",
    "Curvature",
    "Modicum",
    "Conducive",
    "Harmonious",
    "Concise",
    "Concur",
    "Condone",
    "Confide",
    "Conflate",
    "Connoisseur",
    "Consensus",
    "Conspicuous",
    "Contemplate",
    "Contradict",
    "Defiant",
    "Deflect",
    "Defuse",
    "Delegate",
    "Demeanor",
    "Denounce",
    "Desolate",
    "Detrimental",
    "Deviate",
    "Diligent",
    "Diminish",
    "Disband",
    "Disclose",
    "Discreet",
    "Disdain",
    "Dispel",
    "Disseminate",
    "Distort",
    "Distraught",
    "Diverse",
    "Perfunctory",
    "Pernicious",
    "Perplex",
    "Perspicacious",
    "Pervasive",
    "Placid",
    "Plausible",
    "Precarious",
    "Precise",
    "Predicament",
    "Enrich",
    "Enthrall",
    "Entice",
    "Enumerate",
    "Envelop",
    "Ephemeral",
    "Epitome",
    "Equanimity",
    "Equivocate",
    "Eradicate",
    "Obfuscate",
    "Oblique",
    "Obsolete",
    "Omnipotent",
    "Onus",
    "Opaque",
    "Overt",
    "Paradox",
    "Paragon",
    "Perceptive",
    "Erratic",
    "Exacerbate",
    "Exemplary",
    "Exhilarate",
    "Exorbitant",
    "Expedite",
    "Expose",
    "Exquisite",
    "Extemporaneous",
    "Facetious",
    "Vacillate",
    "Vehement",
    "Vindicate",
    "Vulnerable",
    "Warrant",
    "Whimsical",
    "Zealous",
    "apple",
    "banana",
    "cherry",
    "dragonfruit",
    "elderberry",
    "fig",
  ];

  const fetchWordOfTheDay = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const hash = today
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

      const selectedWord = words[hash % words.length];

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`,
      );

      if (!response.ok) throw new Error("Failed to fetch word details.");

      const data = await response.json();

      const word = data?.[0]?.word || selectedWord;
      const description =
        data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
        "No description available.";

      const synonyms = data?.[0]?.meanings?.[0]?.synonyms || [];
      const antonyms = data?.[0]?.meanings?.[0]?.antonyms || [];
      const pronunciation = data?.[0]?.phonetics?.[0]?.text || "N/A";
      const example =
        data?.[0]?.meanings?.[0]?.definitions?.[0]?.example ||
        "No example available.";

      const audio = data?.[0]?.phonetics?.find((p) => p.audio)?.audio || "";

      setWordOfTheDay({
        word,
        description,
        synonyms,
        antonyms,
        pronunciation,
        example,
        audio,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const handlePlayAudio = () => {
    if (!wordOfTheDay?.audio) return;
    new Audio(wordOfTheDay.audio).play();
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 w-full md:w-1/2 lg:w-1/4">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-2/4 pb-5 mx-auto px-4">
      <h1>Word of The Day</h1>
      <div className="bg-gray-300 rounded-lg w-full p-4 h-full">
        <div className="relative flex flex-col items-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{
              color: "var(--main_color)",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {wordOfTheDay.word}
          </h1>

          <p className="text-gray-500 text-center mb-2">
            {wordOfTheDay.pronunciation}
          </p>
          <button
            onClick={handlePlayAudio}
            className="absolute top-2 right-2 flex items-center text-black rounded-lg"
          >
            {wordOfTheDay.audio ? (
              <HiSpeakerWave size={24} />
            ) : (
              <HiSpeakerXMark size={24} />
            )}
          </button>
        </div>

        <hr className="my-4" />

        <p className="text-gray-700 mb-4">{wordOfTheDay.description}</p>

        <div className="italic text-sm text-gray-600 mb-4">
          <strong>Example:</strong> {wordOfTheDay.example}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <strong>Synonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.synonyms.length > 0 ? (
                wordOfTheDay.synonyms.map((syn, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {syn}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                  None
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <strong>Antonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.antonyms.length > 0 ? (
                wordOfTheDay.antonyms.map((ant, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {ant}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                  None
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/word/detail/${wordOfTheDay.word}`}
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            Learn More <FaExternalLinkAlt />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;
