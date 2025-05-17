import { useState } from "react";
import { useHistory } from "react-router-dom";
import { savePersonalityTestResults } from "../api";

const PersonalityTest = () => {
  const questions = [
    { text: "1. I see myself as someone who is outgoing, sociable.", trait: "Extraversion" },
    { text: "2. I see myself as someone who is generally trusting.", trait: "Agreeableness" },
    { text: "3. I see myself as someone who does a thorough job.", trait: "Conscientiousness" },
    { text: "4. I see myself as someone who is relaxed, handles stress well.", trait: "Neuroticism", reverse: true },
    { text: "5. I see myself as someone who has an active imagination.", trait: "Openness" },
    { text: "6. I see myself as someone who is reserved.", trait: "Extraversion", reverse: true },
    { text: "7. I see myself as someone who tends to find fault with others.", trait: "Agreeableness", reverse: true },
    { text: "8. I see myself as someone who tends to be lazy.", trait: "Conscientiousness", reverse: true },
    { text: "9. I see myself as someone who gets nervous easily.", trait: "Neuroticism" },
    { text: "10. I see myself as someone who values artistic experiences.", trait: "Openness" }
  ];

  const [responses, setResponses] = useState(Array(10).fill(null));
  const [results, setResults] = useState(null);
  const history = useHistory();

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = parseInt(value);
    setResponses(newResponses);
  };

  const handleFinishTest = () => {
    saveResults();
    history.push('/my-profile'); 
  }

  const saveResults = async () => {
    if (responses.includes(null)) {
      alert("Please answer all questions.");
      return;
    }

    const traitScores = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0
    };

    questions.forEach((q, index) => {
      let score = responses[index];
      if (q.reverse) score = 6 - score;
      traitScores[q.trait] += score;
    });

    for (const trait in traitScores) {
      traitScores[trait] = (traitScores[trait] / 10).toFixed(2);
    }

    setResults(traitScores);
    console.log(traitScores);

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    await savePersonalityTestResults(userId, traitScores);
  };

  return (
    <div className="bg-container">
      <div className="test-container">
        <h2 className="test-title">Big Five Personality Test</h2>

        {questions.map((q, index) => (
          <div key={index} className="question-container">
            <p className="question-text">{q.text}</p>
            <div className="radio-group">
              {[1, 2, 3, 4, 5].map((num) => (
                <label
                  key={num}
                  className={`radio-label ${responses[index] === num ? "selected" : ""}`}
                  onClick={() => handleChange(index, num)}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={num}
                    className="radio-input"
                  />
                  {num}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button onClick={saveResults} className="submit-button">Get Results</button>

        {results && (
          <div className="results-container">
            <h3>Your Personality Scores:</h3>
            <p><strong>Extraversion:</strong> {results.Extraversion * 100}%</p>
            <p><strong>Agreeableness:</strong> {results.Agreeableness * 100}%</p>
            <p><strong>Conscientiousness:</strong> {results.Conscientiousness * 100}%</p>
            <p><strong>Neuroticism:</strong> {results.Neuroticism * 100}%</p>
            <p><strong>Openness:</strong> {results.Openness * 100}%</p>
            <button className="submit-button" onClick={handleFinishTest}>Get Started StudyDoubling!</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityTest;
