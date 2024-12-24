import Candle from "./Candle";
import "./Page1.scss";

const Page1 = ({ elementPositions, blowDetected }) => {
  return (
    <div className="page1">
      <div className="cake">
        {blowDetected && 
          <>
            <div className="hbd">🎉 Happy Birthday to Baitoey 🎉</div>
          </>
        }
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        {blowDetected && <img className="arrow" src="arrow.png"></img>}

        <Candle elementPositions={elementPositions} blowDetected={blowDetected} />
      </div>
      {blowDetected && 
        <>
          <img className="pic1" src="pic1.jpg"></img>
          <img className="pic2" src="pic2.jpg"></img>
          <img className="pic3" src="pic3.jpg"></img>
          <img className="pic4" src="pic4.jpg"></img>
          <img className="pic5" src="pic5.jpg"></img>
          <img className="pic6" src="pic6.jpg"></img>
        </>
      }
    </div>
  );
};

export default Page1;