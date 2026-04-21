import { useState } from "react";
import "./eventSlider.css";

export default function EventSlider() {
  const [index, setIndex] = useState(0);

  const cards = [
    {
      title: "사주 네트워킹(20:30~22:30)",
      desc: "운의 흐름 속에서, 서로를 마주하는 순간들",
      sub: "사주를 통해 서로를 이해하고 자연스럽게 연결되는 시간",
      includes: [
        "🍷 위스키 한잔",
        "🍽 간단한 안주",
        "🎵 잔잔한 음악",
        "🌙 혼술 감성"
      ],
    },
    {
      title: "예술(20:00~22:00)",
      desc: "우연한 만남으로, 예술이 되는 사람들",
      sub: "어색했던 우리가 인연이 되는 시간 🍷",
      includes: [
        "🥂 웰컴 하이볼",
        "🍱 포틀럭 파티",
        "🎯 대화 미션",
        "🌙 나를 알아가는 밤",
        "🤝 다정한 인연",
      ],
    },
  ];

  const next = () => {
    setIndex((prev) =>
      prev === cards.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider-wrap">
      <div
        className="slider"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {cards.map((card, i) => (
          <div className="slide-card" key={i}>
            <div className="card-inner">
              <div className="badge">
                {card.title}
              </div>

              <h2>{card.desc}</h2>
              <p className="sub">
                {card.sub}
              </p>

              <div className="includes">
                {card.includes.map(
                  (item, idx) => (
                    <span key={idx}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 버튼 (PC용) */}
      <button
        className="nav prev"
        onClick={prev}
      >
        ‹
      </button>
      <button
        className="nav next"
        onClick={next}
      >
        ›
      </button>

      {/* 하단 도트 */}
      <div className="dots">
        {cards.map((_, i) => (
          <span
            key={i}
            className={
              i === index
                ? "dot active"
                : "dot"
            }
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
