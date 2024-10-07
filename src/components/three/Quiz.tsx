import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What is chlorophyll?",
      options: [
        "A pigment that gives plants a red color.",
        "A protein found in marine animals.",
        "A green pigment that enables photosynthesis in plants and algae.",
        "A mineral present in sedimentary rocks."
      ],
      correctOptionIndex: 2
    },
    {
      question: "Why is the concentration of chlorophyll in the oceans important?",
      options: [
        "It indicates the amount of salt in the water.",
        "It reflects phytoplankton activity and the health of the marine ecosystem.",
        "It shows the depth of the ocean.",
        "It determines the speed of ocean currents."
      ],
      correctOptionIndex: 1
    },
    {
      question: "How does the PACE satellite measure the concentration of chlorophyll in the oceans?",
      options: [
        "By collecting water samples directly.",
        "By using sensors that detect light reflected at different wavelengths.",
        "By measuring the sea surface temperature.",
        "By observing marine life through underwater cameras."
      ],
      correctOptionIndex: 1
    },
    {
      question: "What are chlorophyll concentration filters in PACE data?",
      options: [
        "Techniques that remove noise and isolate specific chlorophyll signals in the collected data.",
        "Physical equipment installed in the ocean.",
        "Nets used to capture phytoplankton.",
        "Programs that change the color of the oceans in images."
      ],
      correctOptionIndex: 0
    },
    {
      question: "What is the primary mission of NASA's PACE?",
      options: [
        "To explore distant planets.",
        "To monitor and understand Earth's oceanic and atmospheric ecosystems.",
        "To map the lunar surface.",
        "To study volcanic activity."
      ],
      correctOptionIndex: 1
    },
    {
      question: "How does chlorophyll influence the color of the oceans as seen from space?",
      options: [
        "High concentrations make the water appear bluer.",
        "It has no influence on the color.",
        "High concentrations make the water appear greener.",
        "It makes the water look red."
      ],
      correctOptionIndex: 2
    },
    {
      question: "Why is it important to monitor changes in chlorophyll concentration?",
      options: [
        "To predict volcanic eruptions.",
        "To understand climate patterns and environmental changes.",
        "To locate underwater treasures.",
        "To measure noise pollution in the oceans."
      ],
      correctOptionIndex: 1
    },
    {
      question: "What is phytoplankton?",
      options: [
        "Small fish that live near the surface.",
        "Terrestrial plants that float in the sea.",
        "Aquatic microorganisms that perform photosynthesis.",
        "Rocks that contain chlorophyll."
      ],
      correctOptionIndex: 2
    },
    {
      question: "How do chlorophyll concentration filters help scientists?",
      options: [
        "By simplifying data interpretation by highlighting areas with different levels of chlorophyll.",
        "By raising water temperatures to promote algae growth.",
        "By filtering physical particles from seawater.",
        "By genetically modifying phytoplankton."
      ],
      correctOptionIndex: 0
    },
    {
      question: "Which of the following is a benefit of using PACE data to study the oceans?",
      options: [
        "Real-time access to deep-sea marine life.",
        "Better understanding of the carbon cycle and climate change.",
        "Direct control over ocean currents.",
        "Communication with marine species."
      ],
      correctOptionIndex: 1
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleOptionClick = (index) => {
    if (selectedOptionIndex === null) {
      setSelectedOptionIndex(index);
      const correct = index === questions[currentQuestionIndex].correctOptionIndex;
      setIsAnswerCorrect(correct);
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setSelectedOptionIndex(null);
      setIsAnswerCorrect(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerCorrect(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
        {isQuizFinished ? (
          <div className="quiz-container" style={quizContainerStyle}>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>Quiz Finished!</h2>
            <p style={{ color: 'white', fontSize: '18px' }}>You got {score} out of {questions.length} questions correct.</p>
            <button onClick={handleRestartQuiz} style={nextButtonStyle}>Take the quiz again</button>
            <a href='/explorer-ocean'>
              <button style={nextButtonStyle}>Explore the 3D Model</button>
            </a>
          </div>
        ) : (
          <div className="quiz-container" style={quizContainerStyle}>
            <h2 style={{ marginBottom: '1vh', color: 'white', fontSize: '22px', fontWeight: 700 }}>{questions[currentQuestionIndex].question}</h2>
            <div className="options-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  style={{
                    ...optionButtonStyle,
                    borderColor:
                      selectedOptionIndex === index
                        ? isAnswerCorrect
                          ? 'green'
                          : 'red'
                        : 'white',
                    width: '100%'
                  }}
                  disabled={selectedOptionIndex !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedOptionIndex !== null && (
              <p style={{ color: isAnswerCorrect ? 'green' : 'red', marginTop: '1vh' }}>
                {isAnswerCorrect ? 'Congratulations!' : 'Better luck next time!'}
              </p>
            )}
            <button onClick={handleNextQuestion} style={nextButtonStyle} disabled={selectedOptionIndex === null}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const quizContainerStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center'
};

const optionButtonStyle = {
  display: 'block',
  padding: '10px 20px',
  margin: '10px 0',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  borderRadius: '4px',
  width: '100%'
};

const nextButtonStyle = {
  padding: '10px 40px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  borderRadius: '4px',
  marginTop: '20px',
  marginLeft: '10px',
};

export default Quiz;