import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const HER_NAME = "Merlin";

/* Chapter 01 photos */
import photo1 from "./photos/photo4.jpeg";
import photo2 from "./photos/photo3.jpeg";
import photo3 from "./photos/photo4.jpeg";
import photo4 from "./photos/photo3.jpeg";

/* Merlin slider photos */
import merlin1 from "./photos/merlin1.jpg";
import merlin2 from "./photos/merlin2.jpg";
import merlin3 from "./photos/merlin3.jpg";
import merlin4 from "./photos/merlin4.jpg";
import merlin5 from "./photos/merlin5.jpg";
import merlin6 from "./photos/merlin6.jpg";
import merlin7 from "./photos/merlin7.jpg";
import merlin8 from "./photos/merlin8.jpg";
import merlin9 from "./photos/merlin9.jpg";
import merlin10 from "./photos/merlin10.jpg";

/* =========================================================
   LITTLE MOMENTS PHOTOS
========================================================= */

const PHOTOS = [
  { src: photo1, caption: "Your smile" },
  { src: photo4, caption: "Those small moments" },
  { src: photo3, caption: "Seeing your name pop up" },
  { src: photo2, caption: "Our random conversations" },
];

/* =========================================================
   MERLIN IN FRAMES
   Add any number of photos here later.
========================================================= */

const MERLIN_SLIDES = [
  {
    src: merlin1,
    title: "That smile.",
    caption:
      "Some pictures don't need a story. This one already says enough.",
  },
  {
    src: merlin2,
    title: "Effortlessly you.",
    caption:
      "There is something about you that makes ordinary moments look special.",
  },
  {
    src: merlin3,
    title: "One of my favourites.",
    caption:
      "Not because the picture is perfect — because the person in it is.",
  },
  {
    src: merlin4,
    title: "A little moment.",
    caption:
      "Funny how the smallest moments are sometimes the ones we remember most.",
  },
  {
    src: merlin5,
    title: "Just Merlin.",
    caption:
      "Somehow you make even the simplest picture feel worth keeping.",
  },
  {
    src: merlin6,
    title: "This one.",
    caption:
      "I don't really have an explanation. I just like looking at this one.",
  },
  {
    src: merlin7,
    title: "Something about you.",
    caption:
      "Maybe it's the picture. Maybe it's you. I think I know the answer.",
  },
  {
    src: merlin8,
    title: "Worth keeping.",
    caption:
      "Some moments quietly become memories before we even notice.",
  },
  {
    src: merlin9,
    title: "Another favourite.",
    caption:
      "Apparently choosing just one favourite picture of you isn't possible.",
  },
  {
    src: merlin10,
    title: "And one more...",
    caption:
      "Ten frames later, and somehow I still feel like this collection isn't enough.",
  },
];

const DECODER_LETTERS = ["A", "E", "I", "O", "U", "M", "S", "Y"];

function App() {
  const [started, setStarted] = useState(false);

  /* SYSTEM CHECK */
  const [systemStarted, setSystemStarted] = useState(false);
  const [systemProgress, setSystemProgress] = useState(0);
  const [systemDone, setSystemDone] = useState(false);

  /* MERLIN IN FRAMES */
  const [activeFrame, setActiveFrame] = useState(0);
  const [frameDirection, setFrameDirection] = useState("next");
  const [frameAutoplay, setFrameAutoplay] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  /* DECODER */
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const [decoderMessage, setDecoderMessage] = useState("");

  /* MISS METER */
  const [missValue, setMissValue] = useState(35);
  const [limitExceeded, setLimitExceeded] = useState(false);

  /* LETTER */
  const [letterOpened, setLetterOpened] = useState(false);
  const [finalShown, setFinalShown] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: `${(index * 37 + 11) % 100}%`,
        top: `${(index * 53 + 7) % 100}%`,
        delay: `${(index % 8) * 0.6}s`,
        duration: `${4 + (index % 5)}s`,
      })),
    []
  );

  useEffect(() => {
    if (!systemStarted || systemDone) return;

    if (systemProgress >= 87) {
      setSystemDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setSystemProgress((prev) => Math.min(prev + 3, 87));
    }, 70);

    return () => clearTimeout(timer);
  }, [systemStarted, systemProgress, systemDone]);

  const startSystemCheck = () => {
    setSystemProgress(0);
    setSystemDone(false);
    setSystemStarted(true);
  };

  const totalFrames = MERLIN_SLIDES.length;

  const nextFrame = () => {
    setFrameDirection("next");
    setActiveFrame((prev) => (prev === totalFrames - 1 ? 0 : prev + 1));
  };

  const previousFrame = () => {
    setFrameDirection("prev");
    setActiveFrame((prev) => (prev === 0 ? totalFrames - 1 : prev - 1));
  };

  const goToFrame = (index) => {
    if (index === activeFrame) return;
    setFrameDirection(index > activeFrame ? "next" : "prev");
    setActiveFrame(index);
  };

  useEffect(() => {
    if (!frameAutoplay || totalFrames <= 1) return undefined;

    const interval = window.setInterval(() => {
      setFrameDirection("next");
      setActiveFrame((prev) => (prev === totalFrames - 1 ? 0 : prev + 1));
    }, 5000);

    return () => window.clearInterval(interval);
  }, [frameAutoplay, totalFrames]);

  const getFramePosition = (index) => {
    if (index === activeFrame) return "active";

    const previous = (activeFrame - 1 + totalFrames) % totalFrames;
    const next = (activeFrame + 1) % totalFrames;

    if (index === previous) return "previous";
    if (index === next) return "next";
    return "hidden";
  };

  const handleFrameTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleFrameTouchEnd = (event) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0].clientX;
    const difference = touchStartX - endX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) nextFrame();
      else previousFrame();
    }

    setTouchStartX(null);
  };

  const chooseDecoderLetter = (letter) => {
    if (!firstLetter) {
      if (letter === "M") {
        setFirstLetter("M");
        setDecoderMessage("Nice... one more 👀");
      } else {
        setDecoderMessage("Not that one 😄");
      }
      return;
    }

    if (!secondLetter) {
      if (letter === "O") {
        setSecondLetter("O");
        setDecoderMessage("Okay... you found it.");
      } else {
        setDecoderMessage("Almost... try again.");
      }
    }
  };

  const decoderComplete = firstLetter === "M" && secondLetter === "O";

  const resetDecoder = () => {
    setFirstLetter("");
    setSecondLetter("");
    setDecoderMessage("");
  };

  const changeMissValue = (event) => {
    const value = Number(event.target.value);
    setMissValue(value);
    setLimitExceeded(value >= 100);
  };

  const startStory = () => {
    setStarted(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 150);
  };

  return (
    <main className="story-page">
      <div className="paper-noise" />

      <div className="particle-layer">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* 01 - OPENING */}
      <section className="opening-section">
        <div className="opening-night" />
        <div className="opening-stars" />

        <div className="opening-content">
          <div className="chapter-top light">
           
          </div>

          <p className="tiny-top-text">
            A SMALL PAGE
            <br />
            FOR A SPECIAL PERSON
          </p>

          <div className="moon">☾</div>

          <h1>
            Hey <span>{HER_NAME}...</span>
          </h1>

          <div className="small-heart-doodle">♡</div>

          <p className="opening-copy">
            I was going to text you.
            <br />
            Then I thought...
            <br />
            that's too normal.
          </p>

          {!started ? (
            <button className="cream-button" onClick={startStory}>
              Start the story <span>→</span>
            </button>
          ) : (
            <a className="cream-button" href="#chapter-one">
              Keep going <span>↓</span>
            </a>
          )}

          <p className="hand-note opening-note">
            Some people
            <br />
            just feel like home. ♡
          </p>
        </div>

        <div className="mountain-layer mountain-back" />
        <div className="mountain-layer mountain-front" />
        <div className="city-lights" />
      </section>

      {/* 02 - LITTLE MOMENTS */}
      <section className="paper-section photo-section" id="chapter-one">
        <div className="chapter-top">
          
          <span>LITTLE MOMENTS</span>
        </div>

        <div className="page-count">
          <span />
          01 / 06
        </div>

        <div className="leaf-decoration leaf-one">☘</div>

        <div className="photo-story-layout">
          <div className="photo-story-copy">
            <p className="eyebrow">SOMEHOW...</p>

            <h2>
              You keep
              <br />
              appearing.
            </h2>

            <div className="ink-line" />

            <p>
              In the most random moments,
              <br />
              in the smallest things...
            </p>

            <span className="hand-note">
              It's always you
              <br />
              in little things. ♡
            </span>
          </div>

          <div className="polaroid-grid">
            {PHOTOS.map((photo, index) => (
              <figure
                className={`polaroid polaroid-${index + 1}`}
                key={`${photo.src}-${index}`}
              >
                <span className="photo-tape" />
                <img src={photo.src} alt={photo.caption} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="hand-note photo-bottom-note">
          and many more...
          <br />♡
        </p>
      </section>

      {/* 03 - SYSTEM CHECK */}
      <section className="paper-section system-section">
        <div className="chapter-top">
          <span>A SMALL PROBLEM</span>
        </div>

        <div className="page-count">
          <span />
          02 / 06
        </div>

        <div className="system-layout">
          <div className="system-window">
            <div className="system-titlebar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <strong>SYSTEM CHECK</strong>
              <span>×</span>
            </div>

            <div className="system-body">
              {!systemStarted ? (
                <div className="system-ready">
                  <p>Ready to check what's been on my mind?</p>
                  <button onClick={startSystemCheck}>Run system check</button>
                </div>
              ) : (
                <>
                  <p>Searching thoughts...</p>
                  <p>
                    {HER_NAME} found:{" "}
                    <strong>{Math.floor(systemProgress * 9.74)} times</strong>
                  </p>
                  <p>
                    Normal behaviour: <strong className="error-cross">✕</strong>
                  </p>
                  <p>
                    Possible reason:{" "}
                    <strong>
                      {systemDone ? "Missing someone" : "Analysing..."}
                    </strong>
                  </p>

                  <div className="system-progress">
                    <div style={{ width: `${systemProgress}%` }} />
                  </div>

                  <div className="progress-info">
                    <span>{systemDone ? "Analysis complete" : "Thinking..."}</span>
                    <strong>{systemProgress}%</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {systemDone && (
            <div className="system-result">
              <h3>
                Okay, this might
                <br />
                be serious. 😂
              </h3>

              <button
                className="dark-button"
                onClick={() =>
                  document
                    .querySelector("#merlin-frames")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                I agree
              </button>

              <button className="outline-button" onClick={startSystemCheck}>
                Run again
              </button>
            </div>
          )}
        </div>

        <p className="hand-note system-note">
          Just
          <br />
          a thought...
          <br />
          You. ♡
        </p>
      </section>

      {/* 04 - MERLIN IN FRAMES */}
      <section className="paper-section frames-section" id="merlin-frames">
        <div className="chapter-top">
          <span>— MERLIN, IN FRAMES</span>
        </div>

        <div className="page-count">
          <span />
          03 / 06
        </div>

        <div className="frames-layout">
          <div className="frames-copy">
            <p className="frames-eyebrow">A LITTLE MORE OF YOU</p>

            <h2>
              Merlin,
              <br />
              <em>in frames.</em>
            </h2>

            <p className="frames-intro">
              Some people make ordinary moments feel special.
              <br />
              You're one of them.
            </p>

            <div
              key={activeFrame}
              className={`frame-caption ${
                frameDirection === "next"
                  ? "caption-enter-right"
                  : "caption-enter-left"
              }`}
            >
              <div className="frame-caption-label">
                <span>{String(activeFrame + 1).padStart(2, "0")}</span>
                <span>FRAME NOTE</span>
              </div>

              <h3>{MERLIN_SLIDES[activeFrame].title}</h3>
              <p>{MERLIN_SLIDES[activeFrame].caption}</p>
              <span className="frame-caption-heart">♡</span>
            </div>

            <div className="frame-progress-row">
              <span>{String(activeFrame + 1).padStart(2, "0")}</span>
              <div className="frame-progress-track">
                <span
                  style={{
                    width: `${((activeFrame + 1) / totalFrames) * 100}%`,
                  }}
                />
              </div>
              <span>{String(totalFrames).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="frames-slider">
            <span className="frame-doodle frame-doodle-heart">♡</span>
            <span className="frame-doodle frame-doodle-star">✦</span>

            <div
              className="frames-stage"
              onTouchStart={handleFrameTouchStart}
              onTouchEnd={handleFrameTouchEnd}
            >
              {MERLIN_SLIDES.map((slide, index) => {
                const position = getFramePosition(index);

                return (
                  <figure
                    key={`${slide.src}-${index}`}
                    className={`frame-polaroid ${position}`}
                    onClick={() => {
                      if (position === "previous") previousFrame();
                      if (position === "next") nextFrame();
                    }}
                  >
                    <span className="frame-tape" />

                    <div className="frame-image">
                      <img
                        src={slide.src}
                        alt={`${HER_NAME} frame ${index + 1}`}
                        draggable="false"
                      />
                    </div>

                    <figcaption>
                      <span>FRAME {String(index + 1).padStart(2, "0")}</span>
                      <strong>{slide.title}</strong>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            <div className="frames-controls">
              <button
                type="button"
                className="frame-arrow"
                onClick={previousFrame}
                aria-label="Previous photo"
              >
                ←
              </button>

              <div className="frame-dots">
                {MERLIN_SLIDES.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={index === activeFrame ? "active" : ""}
                    onClick={() => goToFrame(index)}
                    aria-label={`Open frame ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="frame-arrow"
                onClick={nextFrame}
                aria-label="Next photo"
              >
                →
              </button>
            </div>

            <button
              type="button"
              className="frame-autoplay"
              onClick={() => setFrameAutoplay((prev) => !prev)}
            >
              <span>{frameAutoplay ? "Ⅱ" : "▶"}</span>
              {frameAutoplay ? "Pause memories" : "Play memories"}
            </button>

            <p className="hand-note frames-hand-note">
              different moments,
              <br />
              same you. ♡
            </p>
          </div>
        </div>
      </section>

      {/* 05 - MESSAGE DECODER */}
      <section className="dark-paper-section decoder-section">
        <div className="chapter-top light">
          <span>— MESSAGE DECODER</span>
        </div>

        <div className="page-count light">
          <span />
          04 / 06
        </div>

        <div className="decoder-content">
          <h2>Message Decoder</h2>
          <p>Click the missing letters...</p>

          {!decoderComplete ? (
            <>
              <div className="decoder-paper">
                <span>I</span>
                <strong>{firstLetter || "_"}</strong>
                <span>ISS</span>
                <span className="decoder-gap" />
                <span>Y</span>
                <strong>{secondLetter || "_"}</strong>
                <span>U</span>
              </div>

              <div className="letter-buttons">
                {DECODER_LETTERS.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => chooseDecoderLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <p className="decoder-status">{decoderMessage}</p>
            </>
          ) : (
            <div className="decoded-message">
              <span>✦</span>
              <h3>I MISS YOU</h3>
              <div className="decoded-line" />

              <p className="hand-note">
                Some things are better
                <br />
                when they're said. ♡
              </p>

              <button onClick={resetDecoder}>Decode again</button>
            </div>
          )}
        </div>
      </section>

      {/* 06 - MISS METER */}
      <section className="sunset-section">
        <div className="chapter-top light">
          <span>— HOW MUCH?</span>
        </div>

        <div className="page-count light">
          <span />
          05 / 06
        </div>

        <div className="sunset-content">
          <h2>How much do I miss you?</h2>

          <div className="meter-row">
            <span>0</span>
            <input
              type="range"
              min="0"
              max="100"
              value={missValue}
              onChange={changeMissValue}
              className="story-range"
            />
            <span>100</span>
          </div>

          <p className="meter-number">
            {limitExceeded ? "∞" : `${missValue}%`}
          </p>

          {limitExceeded && (
            <div className="limit-card">
              <strong>LIMIT EXCEEDED</strong>
              <span>100% wasn't enough.</span>
            </div>
          )}

          {limitExceeded && <div className="infinity-symbol">∞</div>}

          <p className="hand-note sunset-note">
            Some things
            <br />
            don't have a limit... ♡
          </p>
        </div>

        <div className="sunset-mountains" />
      </section>

      {/* 07 - ENVELOPE */}
      <section className="paper-section letter-section">
        <div className="chapter-top">
          <span>FINAL CHAPTER — THE LETTER</span>
        </div>

        <div className="letter-heading">
          <h2>A little something for you...</h2>
        </div>

        {!letterOpened ? (
          <div className="envelope-stage">
            <button
              className="envelope"
              onClick={() => setLetterOpened(true)}
              aria-label="Open letter"
            >
              <div className="envelope-back" />
              <div className="envelope-paper">For {HER_NAME} ♡</div>
              <div className="envelope-left" />
              <div className="envelope-right" />
              <div className="envelope-bottom" />
              <div className="envelope-flap" />
              <div className="wax-seal">♡</div>
            </button>

            <p className="hand-note click-open">↟ &nbsp; Click to open ♡</p>
          </div>
        ) : (
          <div className="letter-card">
            <span className="paperclip">⌇</span>

            <p className="dear">Hey {HER_NAME},</p>

            <p>
              I could've just sent you
              <strong> "I miss you."</strong>
            </p>

            <p>
              But I wanted to make something that might make you smile for a
              minute.
            </p>

            <p>
              Somewhere between our random conversations, little moments, and
              all the things I keep wanting to tell you...
            </p>

            <p>
              I realised I've actually been missing having you around.
            </p>

            <p>
              That's it.
              <br />
              No dramatic ending. 😌
            </p>

            <strong className="letter-main-message">Just come back soon.</strong>

            <div className="letter-signature">
              With a smile,
              <br />
              Always ♡
            </div>

            <button
              className="dark-button final-button"
              onClick={() => setFinalShown(true)}
            >
              Okay... one last thing <span>→</span>
            </button>
          </div>
        )}
      </section>

      {/* 08 - FINAL */}
      {finalShown && (
        <section className="final-section">
          <div className="final-stars" />

          <div className="final-content">
            <p>IF YOU REMEMBER ONLY ONE THING...</p>

            <h2>
              I REALLY
              <br />
              MISS YOU,
            </h2>

            <h1>{HER_NAME}.</h1>
            <div className="final-heart">♡</div>

            <p className="hand-note final-note">
              Same sky...
              <br />
              Same thoughts...
              <br />
              Hoping to see you soon... ♡
            </p>
          </div>

          <div className="shooting-star" />
          <div className="final-mountains" />
        </section>
      )}
    </main>
  );
}

export default App;
