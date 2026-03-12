import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const words = [
    "Quixotic", "Ramification", "Rebuke", "Reclusive", "Refine",
    "Reiterate", "Resilient", "Reverent", "Scrutinize", "Sentient",
    "Accentuate", "Acceptable", "Acclimate", "Accomplish", "Accord",
    "Accost", "Acknowledge", "Acquaintance", "Acquire", "Acquit",
    "Fathom", "Feasible", "Finesse", "Flamboyant", "Frivolous",
    "Frugal", "Futile", "Galvanize", "Garrulous", "Gratify",
    "Appropriate", "Ardent", "Arduous", "Artifice", "Ascend",
    "Aspire", "Assert", "Assess", "Assiduous", "Associate",
    "Bewilder", "Bias", "Blatant", "Blithe", "Boisterous",
    "Bombastic", "Bravado", "Brevity", "Cacophony", "Cajole",
    "Calamity", "Callous", "Capricious", "Caricature", "Catalyst",
    "Caustic", "Celerity", "Chastise", "Cherish", "Clandestine",
    "Eloquent", "Pugnacious", "Recalcitrant", "Disparate", "Commingle",
    "Curvature", "Modicum", "Conducive", "Harmonious", "Concise",
    "Concur", "Condone", "Confide", "Conflate", "Connoisseur",
    "Consensus", "Conspicuous", "Contemplate", "Contradict", "Defiant",
    "Deflect", "Defuse", "Delegate", "Demeanor", "Denounce",
    "Desolate", "Detrimental", "Deviate", "Diligent", "Diminish",
    "Disband", "Disclose", "Discreet", "Disdain", "Dispel",
    "Disseminate", "Distort", "Distraught", "Diverse", "Perfunctory",
    "Pernicious", "Perplex", "Perspicacious", "Pervasive", "Placid",
    "Plausible", "Precarious", "Precise", "Predicament", "Enrich",
    "Enthrall", "Entice", "Enumerate", "Envelop", "Ephemeral",
    "Epitome", "Equanimity", "Equivocate", "Eradicate", "Obfuscate",
    "Oblique", "Obsolete", "Omnipotent", "Onus", "Opaque",
    "Overt", "Paradox", "Paragon", "Perceptive", "Erratic",
    "Exacerbate", "Exemplary", "Exhilarate", "Exorbitant", "Expedite",
    "Expose", "Exquisite", "Extemporaneous", "Facetious", "Vacillate",
    "Vehement", "Vindicate", "Vulnerable", "Warrant", "Whimsical",
    "Zealous", "apple", "banana", "cherry", "dragonfruit", "elderberry", "fig",
  ];

  const fetchWordOfTheDay = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const hash = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const selectedWord = words[hash % words.length];

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
      );

      if (!response.ok) throw new Error("Failed to fetch word details.");

      const data = await response.json();

      const word = data?.[0]?.word || selectedWord;
      const description = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No description available.";
      const synonyms = data?.[0]?.meanings?.[0]?.synonyms || [];
      const antonyms = data?.[0]?.meanings?.[0]?.antonyms || [];
      const pronunciation = data?.[0]?.phonetics?.[0]?.text || "N/A";
      const example = data?.[0]?.meanings?.[0]?.definitions?.[0]?.example || "No example available.";
      const audio = data?.[0]?.phonetics?.find(p => p.audio)?.audio || "";

      setWordOfTheDay({ word, description, synonyms, antonyms, pronunciation, example, audio });
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
    if (wordOfTheDay?.audio) new Audio(wordOfTheDay.audio).play();
  };

  if (loading) return <div className="text-center mt-10 text-[var(--secondary_text)]">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-auto mx-auto px-4 py-8 md:h-auto lg:h-3/5 " style={{ backgroundColor: "var(--main_bg)", border: `1px solid var(--border_color)`, borderRadius: "10px" }}>
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--main_color)] text-center">
        Word of The Day
      </h1>

      <div className="w-full bg-[var(--card_bg)] rounded-xl p-6 flex flex-col gap-4">
        {/* Word Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--main_color)]">{wordOfTheDay.word}</h2>
            <p className="text-[var(--secondary_text)]">{wordOfTheDay.pronunciation}</p>
          </div>
          <button onClick={handlePlayAudio} className="text-[var(--main_color)]">
            {wordOfTheDay.audio ? <HiSpeakerWave size={24} /> : <HiSpeakerXMark size={24} />}
          </button>
        </div>

        <p className="text-[var(--text_color)]">{wordOfTheDay.description}</p>

        <div className="italic text-[var(--secondary_text)]">
          <strong>Example:</strong> {wordOfTheDay.example}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="text-[var(--main_color)]">Synonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.synonyms.length > 0
                ? wordOfTheDay.synonyms.map((syn, i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--accent_color)] text-white text-sm rounded-full">{syn}</span>
                  ))
                : <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">None</span>}
            </div>
          </div>

          <div>
            <strong className="text-[var(--main_color)]">Antonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.antonyms.length > 0
                ? wordOfTheDay.antonyms.map((ant, i) => (
                    <span key={i} className="px-3 py-1 border border-[var(--border_color)] text-[var(--main_color)] text-sm rounded-full">{ant}</span>
                  ))
                : <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">None</span>}
            </div>
          </div>
        </div>

        <Link to={`/word/detail/${wordOfTheDay.word}`} className="mt-4 text-[var(--main_color)] font-semibold">
          Learn More <FaExternalLinkAlt />
        </Link>
      </div>
    </div>
  );
};

export default WordOfTheDay;