import { useState } from "react";
import "../css/consumercard.css";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";
const optionsData = [
  {
    title: "Blonkisoaz",
    sub: "Omuke trughte a otufta",
    icon: "fas fa-walking",
    bg: slide1,
  },
  {
    title: "Oretemauw",
    sub: "Omuke trughte a otufta",
    icon: "fas fa-snowflake",
    bg: slide2,
  },
  {
    title: "Iteresuselle",
    sub: "Omuke trughte a otufta",
    icon: "fas fa-tree",
    bg: slide3,
  },
  {
    title: "Idiefe",
    sub: "Omuke trughte a otufta",
    icon: "fas fa-tint",
    bg: slide4,
  },
  {
    title: "Inatethi",
    sub: "Omuke trughte a otufta",
    icon: "fas fa-sun",
    bg: slide5,
  },
];

export default function Options() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="options-container">
      <div style={{ padding: "40px 30px", fontSize: "40px" }}>
        More Info About GoGeneric Consumers
      </div>
      <div className="options">
        {optionsData.map((opt, index) => (
          <div
            key={index}
            className={`option ${index === activeIndex ? "active" : ""}`}
            style={{ "--optionBackground": `url(${opt.bg})` }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className={opt.icon}></i>
              </div>
              <div className="info">
                {/* <div className="main">{opt.title}</div> */}
                {/* <div className="sub">{opt.sub}</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
