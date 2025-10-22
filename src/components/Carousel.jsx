import { useEffect, useState, useRef } from "react";
import "../assets/styles/carousel.css";


import slide1 from "../assets/img/pimentones2.jpg";
import slide2 from "../assets/img/manzanas-bolsas.jpg";
import slide3 from "../assets/img/espinaca2.jpg";
import slide4 from "../assets/img/miel5.jpg";

export default function Carousel() {
  const slides = [
    { src: slide1, alt: "Pimentones" },
    { src: slide2, alt: "Manzanas en bolsas" },
    { src: slide3, alt: "Espinaca" },
    { src: slide4, alt: "Miel" },
  ];

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex(i => (i + 1) % slides.length);

  return (
    <div className="carousel">
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className={`carousel__slide ${i === index ? "is-active" : ""}`} key={i}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="carousel__btn prev" onClick={prev}>❮</button>
          <button className="carousel__btn next" onClick={next}>❯</button>
          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
