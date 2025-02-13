"use client";

import { useState, useEffect } from "react";
import "./final.css";

export default function FinalPage() {
  const texts = [
    "hehe.. you just found my heart💗",
    "Too cheesy..? ",
    "Oh...🤔",
    "But you DO love cheese!😆",
    [
      "You're the parmesan🧀 to my salad🥗,",
      "the cheddar I crave😋.",
      "We're like cheese and 🍕pizza..",
      "perfectly paired!🤩",
      "Without you.. our flavour declines...😞",
    ],
    "So tell me bbg...",
    ["Will you be my... ", "Valentine?💕"],
  ];

  const finalText = "DINNER DATE TONIGHTTTT???";

  const [currentText, setCurrentText] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    const text = texts[currentText];
  
    if (Array.isArray(text)) {
      setDisplayedText(Array(text.length).fill(""));
      let poemLineIndex = 0;
      setIsTyping(true);
  
      const typePoemLine = (line: string, lineIndex: number) => {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        const characters = [...segmenter.segment(line)].map((s) => s.segment);
        let charIndex = -1;
  
        const typingInterval = setInterval(() => {
          setDisplayedText((prev) => {
            const updated = [...prev];
            updated[lineIndex] = (updated[lineIndex] || "") + characters[charIndex];
            return updated;
          });
  
          charIndex++;
  
          if (charIndex === characters.length - 1) {
            clearInterval(typingInterval);
            poemLineIndex++;
  
            if (poemLineIndex < text.length) {
              setTimeout(() => typePoemLine(text[poemLineIndex], poemLineIndex), 1000);
            } else {
              setIsTyping(false);
              if (currentText === texts.length - 1) {
                setTimeout(() => setShowFinalButton(true), 1000);
              }
            }
          }
        }, 100);
      };
  
      typePoemLine(text[poemLineIndex], poemLineIndex);
    } else {
      setDisplayedText([""]);
      setIsTyping(true);
  
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      const characters = [...segmenter.segment(text)].map((s) => s.segment);
      let index = 0;
  
      const typingInterval = setInterval(() => {
        setDisplayedText([characters.slice(0, index + 1).join("")]);
        index++;
  
        if (index === characters.length + 1) {
          clearInterval(typingInterval);
          setIsTyping(false);
  
          if (currentText === texts.length - 1) {
            setTimeout(() => setShowFinalButton(true), 1000);
          }
        }
      }, 100);
    }
  }, [currentText]);
  

  const handleTextClick = () => {
    if (!isTyping) {
      if (currentText < texts.length - 1) {
        setCurrentText((prev) => prev + 1);
      }
    }
  };

  const handleFinalButtonClick = () => {
    setDisplayedText([]); // Clear old text
    setShowFinalText(true);
  };

  return (
    <div
      className="final-container"
      onClick={handleTextClick}
      style={{
        pointerEvents: isTyping ? "none" : "auto",
        cursor: "pointer",
      }}
    >
      {displayedText.map((line, index) => (
        <h1
          key={index}
          className={`final-text ${
            (index === 0 || index === 1 || index === 2 || index === 3) &&
            currentText <= 3
              ? "no-animation"
              : ""
          }`}
          style={{ visibility: line ? "visible" : "hidden" }}
        >
          {line}
        </h1>
      ))}

      {showFinalButton && !showFinalText && (
        <button
          className="invisible-button"
          onClick={handleFinalButtonClick}
          aria-label="Hidden Button"
        />
      )}

      {showFinalText && (
        <>
          <h1 className="dinner-date-text">{finalText}</h1>
          <img src="/images/dinner.png" alt="Cute Image" className="bottom-right-image" />
        </>
      )}
    </div>
  );
}
