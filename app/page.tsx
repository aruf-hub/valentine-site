'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [currentText, setCurrentText] = useState(0);
  const [inputText, setInputText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(false);
  const [retry, setRetry] = useState(false);

  const router = useRouter();

  const texts = [
    "Oh hiii...",
    "You must be someone really special for Aruf to be here...",
    "Who are you thou...?",
    "Nooo.. you're my Caramel-Bun >.<",
    "Well.. do you know me..?",
    "What’s the invisible thread that makes me feel closest to you?",
    "What’s the one thing about you that teases my patience… just a little?",
    "hehe.. so you do know me~",
    "Wanna take a trip down the sugar & spice street?",
    "Find the pairs that belong together… just like you and me~"
  ];

  useEffect(() => {
    if (currentText < texts.length) {
      let index = -1;
      setDisplayedText('');
      setIsTyping(true);
      setIsInputVisible(false);

      const typeText = () => {
        if (index < texts[currentText].length - 1) {
          setDisplayedText((prev) => prev + texts[currentText][index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          setTimeout(() => {
            if (currentText === 2 || currentText === 5 || currentText === 6) {
              setIsInputVisible(true);
            }
            if (currentText === 8) setIsButtonsVisible(true);
            if (currentText === 9) setIsStartButtonVisible(true);
          }, 200);
        }
      };

      const typingInterval = setInterval(typeText, 100);

      return () => clearInterval(typingInterval);
    }
  }, [currentText]);

  const handleTextClick = () => {
    if (isTyping) return;
    if (currentText === 2 || currentText === 5 || currentText === 6) return;
    if (currentText === 8 && !isButtonsVisible) return;
    if (currentText === 9 && !isStartButtonVisible) return;
    setCurrentText((prev) => prev + 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  
  const handleSubmit = () => {
    if (currentText === 2) {
      setCurrentText(3);
      setIsInputVisible(false);
      setInputText('');
    } else if (currentText === 5) {
      const validAnswers = ["smell", "scent", "aroma", "stink", "fragrance", "odor","sweat"];
      if (validAnswers.includes(inputText.toLowerCase().trim())) {
        setCurrentText(6);
        setInputText('');
        setRetry(false);
      } else {
        setRetry(true);
      }
    } else if (currentText === 6) {
      const validAnswers = ["taunt", "shout", "fight","abuse","yell","tease","irritate"];
      if (validAnswers.includes(inputText.toLowerCase().trim())) {
        setCurrentText(7);
        setInputText('');
        setRetry(false);
      } else {
        setRetry(true);
      }
    }
  };
  
  const handleYesClick = () => {
    setCurrentText(8);
  };

  const handleNoClick = () => {
    setCurrentText(8);
  };
  
  const handleStartClick = () => {
    router.push('/game');
  };

  return (
    <div
      onClick={handleTextClick}
      style={{
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#F1C6D6',
        cursor: 'pointer',
      }}
    >
      <h1 style={{ color: '#7E0B48', fontSize: '3rem' }}>{displayedText}</h1>
    
    {isInputVisible && (currentText === 2 || currentText === 5 || currentText === 6) && (
        <div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Your answer"
            style={{
              padding: '10px',
              marginTop: '20px',
              fontSize: '1rem',
              borderRadius: '5px',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#7E0B48',
              color: '#fff',
              fontSize: '1rem',
              padding: '10px 20px',
              marginLeft: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      )}

      {retry && (
        <h2 style={{ color: 'red', fontSize: '1.5rem', marginTop: '10px' }}>
          Try again..(it's one word)
        </h2>
      )}
      {isButtonsVisible && currentText === 8 && (
        <div>
          <button
            onClick={handleYesClick}
            style={{
              backgroundColor: '#7E0B48',
              color: '#fff',
              fontSize: '1rem',
              padding: '15px 30px',
              margin: '20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Yes
          </button>
          <button
            onClick={handleNoClick}
            style={{
              backgroundColor: '#9B2C59',
              color: '#fff',
              fontSize: '1rem',
              padding: '15px 30px',
              margin: '20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            No
          </button>
        </div>
      )}

      {isStartButtonVisible && currentText === 9 && (
        <div>
          <button
            onClick={handleStartClick}
            style={{
              backgroundColor: '#7E0B48',
              color: '#fff',
              fontSize: '1.5rem',
              padding: '15px 30px',
              marginTop: '20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Start Game
          </button>
        </div>
      )}
    
    </div> 
  );
}