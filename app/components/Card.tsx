// /components/Card.tsx
import { useState } from "react";

const Card = ({ id, img, onClick }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (isFlipped) return;
    setIsFlipped(true);
    onClick(id);
  };

  return (
    <div
      className={`card ${isFlipped ? "flip" : ""} ${isShaking ? "shake" : ""}`}
      onClick={handleClick}
    >
      <div className="view front-view">
        <img src="/images/img-1.png" alt="Front" />
      </div>
      <div className="view back-view">
        <img src={img} alt="Back" />
      </div>
    </div>
  );
};

export default Card;
