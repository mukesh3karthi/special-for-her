import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const HER_NAME = "Merlin";

const highlights = [
  {
    icon: "😊",
    number: "01",
    title: "Your Smile",
    text: "I don't know if anyone has told you this, but you have a really nice smile.",
  },
  {
    icon: "✨",
    number: "02",
    title: "Your Vibe",
    text: "There is something about your vibe that I genuinely like. Talking with you feels easy.",
  },
  {
    icon: "🌷",
    number: "03",
    title: "You",
    text: "The more I get to know you, the more I feel like you are someone I would like to know better.",
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
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 17 + 8) % 100}%`,
        size: `${3 + (index % 5) * 2}px`,
        duration: `${10 + (index % 7)}s`,
        delay: `${(index % 8) * 0.8}s`,
      })),
    []
  );

  const createConfetti = (amount = 60) => {
    const symbols = ["✨", "⭐", "🌷", "🎉", "✦"];

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
    createConfetti(75);

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
    createConfetti(95);
  };

  useEffect(() => {
    document.body.style.overflow = showWebsite ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showWebsite]);

  return (
    <main className="surprise-page">
      {/* BACKGROUND DECORATION */}
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

      {/* =========================================
          GIFT SCREEN
      ========================================= */}
      {!showWebsite && (
        <section className="gift-screen">
          <div className="gift-grid" />

          <div className="gift-intro">
            <div className="top-chip">
              <span>✦</span>
              JUST FOR YOU
            </div>

            <p className="gift-small-text">A SMALL SURPRISE</p>

            <h1>
              Hey, <span>{HER_NAME}</span>
            </h1>

            <p className="gift-description">
              I wanted to make something a little different for you.
              <br />
              A normal message felt too simple,
              <br />
              so I made this little surprise instead. ✨
            </p>

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
                  Tap the gift box too 😊
                </p>
              </>
            ) : (
              <div className="opening-message">
                <span>✨</span>
                <p>Opening something made for you...</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================
          WEBSITE
      ========================================= */}
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
              Surprise,
              <br />
              <span>{HER_NAME} ✨</span>
            </h1>

            <p className="hero-text">
              There is actually a small reason behind this page.
              <br />
              Keep going and you will find out. 😄
            </p>

            <div className="hero-highlight">
              Hope this makes you smile.
            </div>

            <a href="#highlights" className="continue-button">
              Keep going
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
              <p>A FEW THINGS I NOTICED</p>

              <h2>What makes you stand out</h2>

              <span>
                Nothing too serious. Just a few things I genuinely noticed.
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

          {/* REAL MESSAGE */}
          <section className="message-section">
            <div className="message-card">
              <div className="message-meta">
                <span>NOTE_01</span>
                <span>FOR {HER_NAME.toUpperCase()}</span>
              </div>

              <div className="message-symbol">✨</div>

              <p className="tiny-label">
                OKAY... HERE'S THE REAL REASON
              </p>

              <h2>I wanted to tell you something.</h2>

              <p>
                I wasn't really sure how to say this in a normal message.
                <br />
                <br />
                I enjoy talking with you, I like your personality,
                and somewhere along the way...
                <br />
                <br />
                I realised that
                <strong className="soft-confession">
                  {" "}
                  I kind of like you. 😊
                </strong>
              </p>

              <div className="message-highlight">
                Nothing too serious or complicated.
                <br />
                I just wanted you to know.
              </div>
            </div>
          </section>

          {/* PLAYFUL SECTION */}
          <section className="fun-section">
            <div className="fun-card">
              <div className="fun-number">02</div>

              <p className="tiny-label">
                AND BEFORE YOU ASK...
              </p>

              <div className="fun-icon">😄</div>

              <h2>
                Yes, I actually made
                <br />
                a whole website to say that.
              </h2>

              <p>
                A text message would have been much easier.
                <br />
                <br />
                But where's the fun in that?
              </p>
            </div>
          </section>

          {/* ENVELOPE */}
          <section className="envelope-section">
            <div className="envelope-content">
              <p className="envelope-label">
                ONE LAST THING
              </p>

              <h2>
                There's one more
                <br />
                message for you.
              </h2>

              <p className="envelope-subtitle">
                You already came this far.
                <br />
                Might as well open it. 😄
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
                        <span>For {HER_NAME} ✨</span>
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
                    I'd like to know
                    <br />
                    you better.
                  </h2>

                  <p>
                    No big expectations.
                    <br />
                    I just enjoy talking with you,
                    <br />
                    and I'd like to spend some time together.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* COFFEE QUESTION */}
          {envelopeOpened && (
            <section className="question-section">
              <div className="question-container">
                {!answered ? (
                  <>
                    <div className="coffee-icon">
                      ☕
                    </div>

                    <p className="question-label">
                      SO...
                    </p>

                    <h2>
                      Coffee with me,
                      <br />
                      <span>{HER_NAME}?</span>
                    </h2>

                    <p className="question-description">
                      Just you, me, coffee,
                      <br />
                      and a good conversation. 😊
                    </p>

                    <div className="question-buttons">
                      <button
                        className="main-answer-button"
                        onClick={handleAnswer}
                      >
                        Yeah, why not 😄
                      </button>

                      <button
                        className="second-answer-button"
                        onClick={handleAnswer}
                      >
                        Coffee sounds good ☕
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="accepted-box">
                    <div className="accepted-icon">
                      🎉
                    </div>

                    <p className="accepted-label">
                      WELL... THAT WENT WELL 😄
                    </p>

                    <h2>You just made me smile.</h2>

                    <p>
                      Okay then...
                      <br />
                      coffee it is. ☕
                    </p>

                    <div className="accepted-footer">
                      I'll text you, {HER_NAME} ✨
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
              Made with a little creativity,
              <br />
              just to make your day a bit different. 😊
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;