import "./Candle.scss";

const Candle = ({ elementPositions, blowDetected }) => {
  const posx7 = 150, posy7 = 8;
  const posx1 = 104, posy1 = 7;
  return (
    <div className="bd-candles">
        <div>
          <div
            className="candle"
            style={{
              position: "absolute",
              left: `${posx1}px`,
              top: `${posy1}px`,
            }}
          >
            <div
              className={`flame ${blowDetected ? "fadeOut" : "flicker"}`}
            ></div>

            <div className="wick"></div>
            <div className={blowDetected ? "" : "drop"}></div>
          </div>
        </div>
        <div>
          <div
            className="back-candle-7"
            style={{
              position: "absolute",
              left: `${posx7}px`,
              top: `${posy7-5}px`,
            }}
          >
          </div>
          <div
            className="candle-7"
            style={{
              position: "absolute",
              left: `${posx7}px`,
              top: `${posy7}px`,
            }}
          >
            <div className={`flame-7 ${blowDetected ? "fadeOut" : "flicker"}`}></div>
            <div className="wick-7"></div>
            <div className={blowDetected ? "" : "drop-7"}></div>
          </div>
        </div>
    </div>
  );
};

export default Candle;