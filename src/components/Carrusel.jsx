import { useState, useEffect } from "react";

function Carrusel({ slides }) {
  if (!slides || slides.length === 0) {
    return <div>No hay imágenes para mostrar.</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [slides]);

  return (
    <div className="carrusel-container">
      {slides.map((slide, index) => (
        <div
          className={
            index === currentIndex ? "carrusel-slide active" : "carrusel-slide"
          }
          key={index}
        >
          <img src={slide.image} alt={slide.caption} />
          <div className="carrusel-caption">{slide.caption}</div>
        </div>
      ))}

      <button onClick={prevSlide} className="carrusel-btn prev">
        ‹
      </button>
      <button onClick={nextSlide} className="carrusel-btn next">
        ›
      </button>
    </div>
  );
}

export default Carrusel;
