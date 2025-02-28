import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import "../../main.css";
// import loader from "../../assets/loader.gif";
import { Link } from "react-router-dom";

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);



  const words = [
    "Quixotic", "Ramification", "Rebuke", "Reclusive", "Refine", "Reiterate", "Resilient", "Reverent", "Scrutinize", "Sentient",
    "Accentuate", "Acceptable", "Acclimate", "Accomplish", "Accord", "Accost", "Acknowledge", "Acquaintance", "Acquire", "Acquit",
    "Fathom", "Feasible", "Finesse", "Flamboyant", "Frivolous", "Frugal", "Futile", "Galvanize", "Garrulous", "Gratify",
    "Appropriate", "Ardent", "Arduous", "Artifice", "Ascend", "Aspire", "Assert", "Assess", "Assiduous", "Associate",
    "Bewilder", "Bias", "Blatant", "Blithe", "Boisterous", "Bombastic", "Bravado", "Brevity", "Cacophony", "Cajole",
    "Calamity", "Callous", "Capricious", "Caricature", "Catalyst", "Caustic", "Celerity", "Chastise", "Cherish", "Clandestine",
    "Eloquent", "Pugnacious", "Recalcitrant", "Disparate", "Commingle", "Curvature", "Modicum", "Conducive", "Harmonious",
    "Concise", "Concur", "Condone", "Confide", "Conflate", "Connoisseur", "Consensus", "Conspicuous", "Contemplate", "Contradict",
    "Annoyance", "Anomaly", "Antagonize", "Anticipate", "Anxious", "Apathetic", "Apology", "Apparent", "Appease", "Appraise",
    "Defiant", "Deflect", "Defuse", "Delegate", "Demeanor", "Denounce", "Desolate", "Detrimental", "Deviate", "Diligent",
    "Diminish", "Disband", "Disclose", "Discreet", "Disdain", "Dispel", "Disseminate", "Distort", "Distraught", "Diverse",
    "Perfunctory", "Pernicious", "Perplex", "Perspicacious", "Pervasive", "Placid", "Plausible", "Precarious", "Precise", "Predicament",
    "Clarity", "Coerce", "Cogent", "Collaborate", "Commend", "Compassion", "Compel", "Compliment", "Comprehend", "Concede",
    "Enrich", "Enthrall", "Entice", "Enumerate", "Envelop", "Ephemeral", "Epitome", "Equanimity", "Equivocate", "Eradicate",
    "Obfuscate", "Oblique", "Obsolete", "Omnipotent", "Onus", "Opaque", "Overt", "Paradox", "Paragon", "Perceptive",
    "Erratic", "Exacerbate", "Exemplary", "Exhilarate", "Exorbitant", "Expedite", "Expose", "Exquisite", "Extemporaneous", "Facetious",
    "Unfathomable", "Unravel", "Usurp", "Vacillate", "Vehement", "Vindicate", "Vulnerable", "Warrant", "Whimsical", "Zealous",
    "apple", "banana", "cherry", "dragonfruit", "elderberry", "fig", "Abandon", "Aboard", "Absurd", "Abduct", "Abide", "Ablaze", "Abnormal", "Absorb", "Abstruse", "Abundant", "Gregarious", "Grievous", "Grotesque", "Gullible", "Hackneyed", "Haphazard", "Harbinger", "Hasten", "Hinder", "Hilarity",
    "Hypothetical", "Ignoble", "Illustrious", "Immaculate", "Imminent", "Impervious", "Impetuous", "Implicit", "Incessant", "Incite",
    "Incompetent", "Incongruous", "Incredulous", "Indifferent", "Indignant", "Ineffable", "Inept", "Inexorable", "Infamous", "Inhibit",
    "Innocuous", "Insidious", "Insinuate", "Intrepid", "Invigorate", "Irascible", "Irate", "Irrevocable", "Jaded", "Jubilant",
    "Zenith", "Zestful", "Abrogate", "Absolve", "Aegis", "Alleviate", "Aplomb", "Apprise", "Arraign", "Atone", "Bereft",
    "Juxtapose", "Lament", "Languish", "Laudable", "Lavish", "Lethargic", "Lucid", "Magnanimous", "Malignant", "Malleable",
    "Meticulous", "Misanthropic", "Mitigate", "Mollify", "Mundane", "Nefarious", "Nebulous", "Negligible", "Nostalgic", "Nurture",
    "Divulge", "Docile", "Dogmatic", "Dwindle", "Eccentric", "Eclectic", "Edify", "Eloquent", "Elusive", "Embellish",
    "Prodigy", "Prolific", "Prominent", "Propensity", "Prosper", "Provoke", "Prowess", "Pseudonym", "Quaint", "Quell",
    "Adage", "Adapt", "Addendum", "Addictive", "Adhere", "Adjacent", "Admonish", "Adore", "Adroit", "Advent",
    "Surpass", "Susceptible", "Tenacious", "Tangible", "Terse", "Transcend", "Tremendous", "Ubiquitous", "Unabashed", "Uncanny",
    "Convoluted", "Cooperate", "Cordial", "Corroborate", "Crave", "Credible", "Cursory", "Cynical", "Debilitate", "Debunk",
    "Amazing", "Ambiguous", "Ambivalent", "Ameliorate", "Amiable", "Anachronistic", "Anagram", "Analogy", "Analyze", "Animosity",
    "Assuage", "Atrophy", "Attain", "Audacity", "Augment", "Authentic", "Authorize", "Avid", "Benevolent", "Beneficial",
    "Embrace", "Empathetic", "Emulate", "Encompass", "Endorse", "Enervate", "Engender", "Enhance", "Enigmatic", "Enlighten",
    "Bilateral", "Blasphemy", "Catalyst", "Condone", "Curate", "Egress", "Exonerate", "Facade", "Fractious", "Habitable",
    "Inculpate", "Ineffable", "Irksome", "Juxtaposition", "Languid", "Liaison", "Malevolent", "Mercurial", "Mitigate", "Obscure",
    "Ominous", "Panacea", "Peculiar", "Perfidious", "Quixotic", "Relinquish", "Resilient", "Sacrosanct", "Sycophant", "Tepid",
    "Serene", "Sincere", "Skeptical", "Solace", "Spontaneous", "Sporadic", "Stoic", "Subtle", "Sufficient", "Superficial",
    "Adverse", "Advocate", "Affable", "Affliction", "Agility", "Aggregate", "Alacrity", "Allege", "Allegory", "Altruistic",
    "Truncate", "Unprecedented", "Veracity", "Vex", "Volatile", "Zephyr", "Zenith", "Allegiance", "Deferential", "Edifice",
    "Frivolous", "Monolithic", "Sanguine", "Sojourn", "Viable", "Reverberate", "Whimsical", "Imbue", "Nonchalant", "Fracture",
  ];

  const fetchWordOfTheDay = async () => {
    const today = new Date().getDate();
    const randomIndex = today % words.length;
    const selectedWord = words[randomIndex];

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
      );
      if (!response.ok) throw new Error("Failed to fetch word details.");
      const data = await response.json();

      const word = data[0].word;
      const description =
        data[0].meanings[0]?.definitions[0]?.definition ||
        "No description available.";
      const synonyms = data[0].meanings[0]?.synonyms || [];
      const antonyms = data[0].meanings[0]?.antonyms || [];
      const pronunciation = data[0].phonetics[0]?.text || "N/A";
      const example =
        data[0].meanings[0]?.definitions[0]?.example || "No example available.";
      const audio = data[0].phonetics[0]?.audio || "";

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
  });

  const handlePlayAudio = () => {
    if (wordOfTheDay?.audio) {
      const audio = new Audio(wordOfTheDay.audio);
      audio.play();
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;



  return (
    <>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-1/4 pb-5">
        <h1 className="">Word of The Day</h1>
        <div className="bg-gray-300 rounded-lg w-full p-4 h-full">
          <div className="relative flex flex-col items-center">
            <h1
              className="text-3xl md:text-4xl font-bold text-center mb-2"
              style={{
                color: 'var(--main_color)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              {wordOfTheDay.word}
            </h1>
            <p className="text-gray-500 text-center mb-2">{wordOfTheDay.pronunciation}</p>
            <button
              onClick={handlePlayAudio}
              className="absolute top-2 right-2 flex items-center text-black rounded-lg"
            >
              {wordOfTheDay.audio ? <HiSpeakerWave size={24} /> : <HiSpeakerXMark size={24} />}
            </button>
          </div>

          <hr className="my-4" />
          <p className="text-gray-700 mb-4">{wordOfTheDay.description}</p>
          <div className="italic text-sm text-gray-600 mb-4">
            <strong>Example:</strong> {wordOfTheDay.example}
          </div>

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

          <div className="flex justify-between items-center mt-4">
            <Link
              to={`/word/detail/${wordOfTheDay.word}`}
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              Learn More <FaExternalLinkAlt />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};


export default WordOfTheDay;
