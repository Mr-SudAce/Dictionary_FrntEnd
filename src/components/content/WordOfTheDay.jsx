import { useEffect, useState, useCallback } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
 const WORDS = [
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

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchWordOfTheDay = useCallback(async () => {
    setLoading(true);
    setError("");

    const today = new Date().toISOString().slice(0, 10);
    const hash = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedWord = WORDS[hash % WORDS.length];

    const targetUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

    try {
      let response = await fetch(targetUrl);

      if (!response.ok) {
        response = await fetch(proxyUrl);
      }

      if (!response.ok) {
        throw new Error("Unable to load dictionary details for today's word.");
      }

      const data = await response.json();
      const entry = data?.[0];

      // Format audio URL safely
      let rawAudio = entry?.phonetics?.find((p) => p.audio)?.audio || "";
      if (rawAudio.startsWith("//")) {
        rawAudio = `https:${rawAudio}`;
      }

      setWordOfTheDay({
        word: entry?.word || selectedWord,
        description: entry?.meanings?.[0]?.definitions?.[0]?.definition || "No definition available.",
        synonyms: entry?.meanings?.[0]?.synonyms || [],
        antonyms: entry?.meanings?.[0]?.antonyms || [],
        pronunciation: entry?.phonetics?.find((p) => p.text)?.text || entry?.phonetic || "N/A",
        example: entry?.meanings?.[0]?.definitions?.[0]?.example || "No example sentence available.",
        audio: rawAudio,
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this function is created only once.

  useEffect(() => {
    fetchWordOfTheDay();
  }, [fetchWordOfTheDay]);

  const handlePlayAudio = () => {
    if (wordOfTheDay?.audio) {
      const audioPlayer = new Audio(wordOfTheDay.audio);
      audioPlayer.play().catch((e) => console.error("Audio playback error:", e));
    }
  };

  if (loading) return <div className="text-center mt-10 text-[var(--secondary_text)]">Loading Word of the Day...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!wordOfTheDay) return null;

  return (
    <div
      className="flex flex-col items-center w-full max-h-[80vh] max-w-xl mx-auto px-4 py-8"
      style={{
        backgroundColor: "var(--main_bg)",
        border: `1px solid var(--border_color)`,
        borderRadius: "10px",
      }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--main_color)] text-center">
        Word of The Day
      </h1>

      <div className="w-full bg-[var(--card_bg)] rounded-xl p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--main_color)]">
              {wordOfTheDay.word}
            </h2>
            <p className="text-[var(--secondary_text)]">{wordOfTheDay.pronunciation}</p>
          </div>
          <button
            onClick={handlePlayAudio}
            disabled={!wordOfTheDay.audio}
            className={`p-2 rounded-full transition-opacity ${
              wordOfTheDay.audio ? "text-[var(--main_color)] hover:opacity-80" : "text-gray-400 cursor-not-allowed"
            }`}
            title={wordOfTheDay.audio ? "Listen pronunciation" : "Audio unavailable"}
          >
            {wordOfTheDay.audio ? <HiSpeakerWave size={24} /> : <HiSpeakerXMark size={24} />}
          </button>
        </div>

        <p className="text-[var(--text_color)]">{wordOfTheDay.description}</p>

        <div className="italic text-[var(--secondary_text)]">
          <strong>Example:</strong> "{wordOfTheDay.example}"
        </div>

        {/* Synonyms & Antonyms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <strong className="text-[var(--main_color)]">Synonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.synonyms.length > 0 ? (
                wordOfTheDay.synonyms.slice(0, 4).map((syn, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--accent_color)] text-white text-xs rounded-full">
                    {syn}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">None</span>
              )}
            </div>
          </div>

          <div>
            <strong className="text-[var(--main_color)]">Antonyms:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {wordOfTheDay.antonyms.length > 0 ? (
                wordOfTheDay.antonyms.slice(0, 4).map((ant, i) => (
                  <span key={i} className="px-3 py-1 border border-[var(--border_color)] text-[var(--main_color)] text-xs rounded-full">
                    {ant}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">None</span>
              )}
            </div>
          </div>
        </div>

        <Link
          to={`/word/detail/${wordOfTheDay.word}`}
          className="mt-4 inline-flex items-center gap-2 text-[var(--main_color)] font-semibold hover:underline"
        >
          Learn More <FaExternalLinkAlt size={14} />
        </Link>
      </div>
    </div>
  );
};

export default WordOfTheDay;