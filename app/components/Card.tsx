// /components/Card.tsx
import { useState } from "react";
import Image from "next/image";

// Define props type
interface CardProps {
  id: number;
  img: string;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, img, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isFlipped) return;
    setIsFlipped(true);
    onClick(id);
  };

  return (
    <div className={`card ${isFlipped ? "flip" : ""}`} onClick={handleClick}>
      <div className="view front-view">
        <Image src="/images/img-1.png" alt="Front" width={100} height={100} priority/>
      </div>
      <div className="view back-view">
        <Image src={img} alt="Back" width={100} height={100} priority/>
      </div>
    </div>
  );
};

export default Card;
