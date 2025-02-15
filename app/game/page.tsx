'use client';
import './game.css'; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

export default function GamePage() {
  const router = useRouter();

  useEffect(() => {
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card");
    let matched = 0;
    let cardOne: HTMLDivElement | null = null;
    let cardTwo: HTMLDivElement | null = null;
    let disableDeck = false;

    // **Pairs for Matching**
    const cardPairs: Record<string, string> = {
      'img-1.webp': 'img-1.1.webp',
      'img-2.webp': 'img-2.1.webp',
      'img-3.webp': 'img-3.1.webp',
      'img-4.webp': 'img-4.1.webp',
      'img-5.webp': 'img-5.1.webp',
      'img-6.webp': 'img-6.1.webp',
      'img-7.webp': 'img-7.1.webp',
      'img-8.webp': 'img-8.1.webp',
    };

    function flipCard(event: Event) {
      const clickedCard = event.currentTarget as HTMLDivElement;
      if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
          cardOne = clickedCard;
          return;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        // **Extract just the filenames (ignore full URL path)**
        const cardOneImg = (cardOne.querySelector(".back-view img") as HTMLImageElement)?.src.split('/').pop();
        const cardTwoImg = (cardTwo.querySelector(".back-view img") as HTMLImageElement)?.src.split('/').pop();

        if (cardOneImg && cardTwoImg) {
          matchCards(cardOneImg, cardTwoImg);
        }
      }
    }

    function matchCards(img1: string, img2: string) {
      // ✅ Check if images match based on our defined pairs
      if (cardPairs[img1] === img2 || cardPairs[img2] === img1) {
        matched++;
        if (matched === 8) {
          setTimeout(() => {
            showFinalImages();
          }, 1000);
        }
        cardOne?.removeEventListener("click", flipCard);
        cardTwo?.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        disableDeck = false;
        return;
      }

      // ❌ If no match, shake and flip back
      setTimeout(() => {
        cardOne?.classList.add("shake");
        cardTwo?.classList.add("shake");
      }, 400);

      setTimeout(() => {
        cardOne?.classList.remove("shake", "flip");
        cardTwo?.classList.remove("shake", "flip");
        cardOne = cardTwo = null;
        disableDeck = false;
      }, 1200);
    }

    function shuffleCards() {
      matched = 0;
      disableDeck = false;
      cardOne = cardTwo = null;

      // **Pairs to Shuffle**
      const arr = Object.entries(cardPairs).flatMap(([front, back]) => [{ back }, { back: front }]);
      const shuffledArr = arr.sort(() => Math.random() - 0.5);

      cards.forEach((card, i) => {
        card.classList.remove("flip");
        const imgTag = card.querySelector(".back-view img") as HTMLImageElement | null;
        if (imgTag) {
          imgTag.src = `/images/${shuffledArr[i].back}`;
        }
        card.addEventListener("click", flipCard);
      });
    }

    function showFinalImages() {
      const finalImages = [
        '001.webp', '002.webp', '003.webp', '004.webp',
        '005.webp', '006.webp', '007.webp', '008.webp',
        '009.webp', '010.webp', '011.webp', '012.webp',
        '013.webp', '014.webp', '015.webp', '016.webp'
      ];

      cards.forEach((card, i) => {
        card.classList.add("flip");
        const imgTag = card.querySelector(".back-view img") as HTMLImageElement | null;
        if (imgTag) {
          imgTag.src = `/images/${finalImages[i]}`;
        }
      });

      setTimeout(() => {
        router.push('/final');
      }, 5000);
    }

    shuffleCards();
  }, [router]);

  return (
    <div className="wrapper">
      <div className="cards">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="card">
            <div className="view front-view">
              <img src="/images/img-9.webp" alt="front" />
            </div>
            <div className="view back-view">
              <img src="/images/img-1.webp" alt="back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
