import React, { useEffect, useMemo, useState } from "react";

const HER_NAME = "Merlin";

const reasons = [
  {
    icon: "😊",
    title: "Your Smile",
    text: "There's something about your smile that can instantly make an ordinary moment feel better.",
  },
  {
    icon: "✨",
    title: "Your Vibe",
    text: "You have this effortless energy that makes talking to you feel easy, fun, and never boring.",
  },
  {
    icon: "❤️",
    title: "Just You",
    text: "Sometimes there is no complicated reason. I simply enjoy having you.",
  },
];

function App() {
  const [accepted, setAccepted] = useState(false);
  const [celebration, setCelebration] = useState([]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${(index * 17 + 7) % 100}%`,
        delay: `${(index % 8) * 0.75}s`,
        duration: `${8 + (index % 6)}s`,
        size: `${12 + (index % 5) * 4}px`,
      })),
    []
  );

  useEffect(() => {
    if (!accepted) return;

    const items = Array.from({ length: 28 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.35}s`,
      size: `${18 + Math.random() * 24}px`,
    }));

    setCelebration(items);

    const timer = setTimeout(() => setCelebration([]), 2200);
    return () => clearTimeout(timer);
  }, [accepted]);

  const handleYes = () => {
    setAccepted(true);
  };

  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {celebration.map((item) => (
        <span
          key={item.id}
          className="celebration-heart"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            fontSize: item.size,
          }}
          aria-hidden="true"
        >
          ❤️
        </span>
      ))}

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">A little something for you</p>

          <h1>
            Hey, <span>{HER_NAME}</span> ❤️
          </h1>

          <p className="hero-copy">
            I could have sent you a normal message, but normal felt a little
            boring. So I made this tiny corner of the internet just for you.
          </p>

          <a className="primary-button" href="#why-you">
            Open My Message ✨
          </a>
        </div>

        <a className="scroll-hint" href="#why-you">
          Scroll ↓
        </a>
      </section>

      <section className="section" id="why-you">
        <div className="container">
          <p className="eyebrow center">A few honest reasons</p>
          <h2>Things I Like About You</h2>
          <p className="section-copy">
            I could probably make this list much longer, but I will try to keep
            it simple.
          </p>

          <div className="cards">
            {reasons.map((reason) => (
              <article className="card" key={reason.title}>
                <div className="icon-box">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section message-section">
        <div className="message-card">
          <div className="quote">“</div>

          <p>
            I do not know exactly where this story goes yet.
            <br />
            <br />
            But I do know that talking to you, seeing you smile, and getting to
            know you has been something I have genuinely enjoyed.
            <br />
            <br />
            So instead of overthinking everything, I thought I would simply
            tell you...
          </p>

          <strong>
            I would really like to spend a little more time with you.
          </strong>
        </div>
      </section>

      <section className="question-section">
        <div className="question-card">
          <div className="coffee">☕</div>
          <p className="eyebrow center">One small question</p>

          <h2>So... coffee with me?</h2>

          <p className="question-copy">
            Nothing complicated. Just good coffee, some laughs, and hopefully a
            really nice conversation.
          </p>

          {!accepted ? (
            <div className="actions">
              <button className="yes-button" onClick={handleYes}>
                Yes ❤️
              </button>

              <button className="soft-button" onClick={handleYes}>
                Obviously Yes 😌
              </button>
            </div>
          ) : (
            <div className="success-message">
              <span>❤️</span>
              <h3>Best answer ever.</h3>
              <p>Now I am definitely buying the coffee ☕😌</p>
            </div>
          )}
        </div>
      </section>

      <footer>
        Made with <span>♥</span> just for you.
      </footer>
    </main>
  );
}

export default App;
