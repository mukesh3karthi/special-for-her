import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const HER_NAME = "Merlin";

const highlights = [
  {
    icon: "⚡",
    number: "01",
    title: "Your Energy",
    text: "You have a way of making normal conversations feel more interesting without even trying.",
  },
  {
    icon: "✨",
    number: "02",
    title: "Your Personality",
    text: "You have your own style, your own vibe, and that is exactly what makes you stand out.",
  },
  {
    icon: "🌟",
    number: "03",
    title: "Your Uniqueness",
    text: "Some people are simply memorable. There is something different about the way you carry yourself.",
  },
];

function App() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 17 + 7) % 100}%`,
        size: `${3 + (index % 5) * 2}px`,
        duration: `${10 + (index % 7)}s`,
        delay: `${(index % 9) * 0.8}s`,
      })),
    []
  );

  const createConfetti = (amount = 60) => {
    const symbols = ["✨", "⭐", "🌟", "🎉", "✦"];

    const pieces = Array.from({ length: amount }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.45}s`,
      duration: `${1.8 + Math.random() * 1.7}s`,
      rotation: `${Math.random() * 360}deg`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: `${13 + Math.random() * 17}px`,
    }));

    setConfetti(pieces);

    setTimeout(() => {
      setConfetti([]);
    }, 4000);
  };

  const openGift = () => {
    if (giftOpened) return;

    setGiftOpened(true);
    createConfetti(70);

    setTimeout(() => {
      setShowWebsite(true);
    }, 1500);
  };

  const openEnvelope = () => {
    if (envelopeOpened) return;

    setEnvelopeOpened(true);
    createConfetti(45);
  };

  const handleAnswer = () => {
    setAnswered(true);
    createConfetti(90);
  };

  useEffect(() => {
    document.body.style.overflow = showWebsite ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showWebsite]);

  return (
    <main className="surprise-page">
      {/* BACKGROUND */}
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-orb orb-three" />

      {/* FLOATING PARTICLES */}
      <div className="particle-layer" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="floating-particle"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* CONFETTI */}
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              fontSize: piece.size,
              "--rotation": piece.rotation,
            }}
          >
            {piece.symbol}
          </span>
        ))}
      </div>

      {/* ======================================================
          FIRST SCREEN
      ====================================================== */}
      {!showWebsite && (
        <section className="gift-screen">
          <div className="gift-grid" />

          <div className="gift-intro">
            <div className="top-chip">
              <span>✦</span>
              PRIVATE SURPRISE
            </div>

            <p className="gift-small-text">SOMETHING DIFFERENT</p>

            <h1>
              Hey, <span>{HER_NAME}</span>
            </h1>

            <p className="gift-description">
              This is not a normal message.
              <br />
              I thought it would be more fun to make
              <br />
              something you could actually open.
            </p>

            {/* GIFT BOX */}
            <div
              className={`gift-box-wrapper ${
                giftOpened ? "gift-opened" : ""
              }`}
              onClick={openGift}
            >
              <div className="gift-shadow" />

              <div className="gift-box">
                <div className="gift-glow" />

                <div className="gift-lid">
                  <div className="gift-lid-ribbon" />

                  <div className="gift-bow">
                    <span className="bow-left" />
                    <span className="bow-right" />
                    <span className="bow-center" />
                  </div>
                </div>

                <div className="gift-body">
                  <div className="gift-body-shine" />
                  <div className="vertical-ribbon" />
                </div>

                <div className="gift-light">✦</div>
              </div>
            </div>

            {!giftOpened ? (
              <>
                <button className="unwrap-button" onClick={openGift}>
                  Open Your Surprise
                  <span>→</span>
                </button>

                <p className="tap-text">
                  You can tap the box too
                </p>
              </>
            ) : (
              <div className="opening-message">
                <span>✨</span>
                <p>Unlocking your surprise...</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}
      {showWebsite && (
        <div className="website-content">
          {/* HERO */}
          <section className="hero-section">
            <div className="hero-grid" />

            <div className="hero-badge">
              <span>✦</span>
              SURPRISE UNLOCKED
            </div>

            <h1 className="hero-title">
              Welcome,
              <br />
              <span>{HER_NAME}</span>
            </h1>

            <p className="hero-text">
              You just unlocked a small corner of the internet
              made to be a little unexpected.
            </p>

            <div className="hero-highlight">
              No big reason. I just thought this would be fun.
            </div>

            <a href="#highlights" className="continue-button">
              Explore the surprise
              <span>↓</span>
            </a>

            <div className="hero-decoration">
              <span>01</span>
              <div />
              <span>SCROLL</span>
            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="content-section" id="highlights">
            <div className="section-heading">
              <p>THREE THINGS I NOTICED</p>

              <h2>What makes you stand out</h2>

              <span>
                Nothing serious. Just a few things that are hard not to notice.
              </span>
            </div>

            <div className="highlight-grid">
              {highlights.map((item) => (
                <article className="highlight-card" key={item.title}>
                  <div className="card-top-row">
                    <span className="card-number">{item.number}</span>

                    <span className="card-arrow">↗</span>
                  </div>

                  <div className="highlight-icon">
                    {item.icon}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <div className="card-line" />
                </article>
              ))}
            </div>
          </section>

          {/* MESSAGE SECTION */}
          <section className="message-section">
            <div className="message-card">
              <div className="message-meta">
                <span>NOTE_01</span>
                <span>FOR {HER_NAME.toUpperCase()}</span>
              </div>

              <div className="message-symbol">✦</div>

              <h2>A small note</h2>

              <p>
                I could have just sent a normal message.
                <br />
                <br />
                But I thought it would be more interesting
                to create something different.
                <br />
                <br />
                You have a really good vibe, and I wanted to make
                a small surprise that matches that energy.
              </p>

              <div className="message-highlight">
                Nothing dramatic.
                <br />
                Just something cool made especially for you.
              </div>
            </div>
          </section>

          {/* FUN SECTION */}
          <section className="fun-section">
            <div className="fun-card">
              <div className="fun-number">
                02
              </div>

              <p className="tiny-label">RANDOM FACT</p>

              <div className="fun-icon">🚀</div>

              <h2>
                This page was supposed
                <br />
                to be simple.
              </h2>

              <p>
                Then I started adding animations.
                <br />
                Then a gift box.
                <br />
                Then an envelope.
                <br />
                <br />
                At that point, there was no going back. 😄
              </p>
            </div>
          </section>

          {/* ENVELOPE */}
          <section className="envelope-section">
            <div className="envelope-content">
              <p className="envelope-label">FINAL UNLOCK</p>

              <h2>
                One more thing
                <br />
                is waiting.
              </h2>

              <p className="envelope-subtitle">
                You already opened the gift.
                <br />
                Might as well finish the mission.
              </p>

              {!envelopeOpened ? (
                <>
                  <div
                    className="envelope-wrapper"
                    onClick={openEnvelope}
                  >
                    <div className="envelope">
                      <div className="envelope-back" />

                      <div className="envelope-paper">
                        <span>For {HER_NAME}</span>
                      </div>

                      <div className="envelope-left" />
                      <div className="envelope-right" />
                      <div className="envelope-bottom" />

                      <div className="envelope-flap">
                        <div className="wax-seal">
                          ✦
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="open-envelope-button"
                    onClick={openEnvelope}
                  >
                    Open the envelope
                    <span>→</span>
                  </button>
                </>
              ) : (
                <div className="final-note">
                  <div className="final-note-icon">
                    ✨
                  </div>

                  <p className="final-small">
                    MESSAGE UNLOCKED
                  </p>

                  <h2>
                    You made it
                    <br />
                    to the end.
                  </h2>

                  <p>
                    So here is the actual point:
                    <br />
                    it would be nice to hang out sometime
                    <br />
                    without making it a big complicated thing.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* FINAL QUESTION */}
          {envelopeOpened && (
            <section className="question-section">
              <div className="question-container">
                {!answered ? (
                  <>
                    <div className="coffee-icon">
                      ☕
                    </div>

                    <p className="question-label">
                      QUICK QUESTION
                    </p>

                    <h2>
                      Coffee sometime,
                      <br />
                      <span>{HER_NAME}?</span>
                    </h2>

                    <p className="question-description">
                      Good coffee. Good conversation.
                      <br />
                      Nothing more complicated than that.
                    </p>

                    <div className="question-buttons">
                      <button
                        className="main-answer-button"
                        onClick={handleAnswer}
                      >
                        Sounds good 😌
                      </button>

                      <button
                        className="second-answer-button"
                        onClick={handleAnswer}
                      >
                        Sure, why not 😄
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="accepted-box">
                    <div className="accepted-icon">
                      🎉
                    </div>

                    <p className="accepted-label">
                      MISSION COMPLETE
                    </p>

                    <h2>Perfect.</h2>

                    <p>
                      Looks like coffee is officially on the list.
                      <br />
                      I will take that as a successful surprise.
                    </p>

                    <div className="accepted-footer">
                      See you soon, {HER_NAME} ✨
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          <footer className="page-footer">
            <div className="footer-line" />

            <span>✦</span>

            <p>
              Built as a small surprise.
              <br />
              Hope it made you smile.
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;