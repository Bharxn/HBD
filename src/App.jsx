import { useState, useEffect, useRef } from "react";
import "./App.css";
import Page1 from "./components/Page1";
import Page15 from "./components/Page15";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";

function App() {
  const [age, setAge] = useState(1);
  const [elementPositions, setElementPositions] = useState([]);
  const [blowDetected, setBlowDetected] = useState(false);
  let audioContext;
  let analyser;
  let microphone;
  const [showAverage, setShowAverage] = useState();

  useEffect(() => {
    const newPositions = Array.from(
      { length: age - elementPositions.length },
      () => ({
        x: Math.random() * 230 + 10,
        y: Math.random() * 20,
      })
    );

    setElementPositions((prevPositions) => [...prevPositions, ...newPositions]);
  }, [age, elementPositions.length]);

  useEffect(() => {
    const handleBlow = () => {
      setBlowDetected(true);

      if (microphone && analyser && audioContext.state === "running") {
        audioContext.suspend();
      }
    };

    const initializeMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);

        microphone.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);

          const average =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setShowAverage(average);
          if (average > 100 && !blowDetected) {
            handleBlow();
          }

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeMicrophone();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [blowDetected]);

  const audioRef = useRef(null);
  
  return (
    <>
      {/* {showAverage} */}
      <Page1 elementPositions={elementPositions} blowDetected={blowDetected} />
      {blowDetected && 
        <>
          <audio ref={audioRef} className="one-call-away" controls autoPlay>
            <source src="song.mp3" type="audio/mpeg"/>
          </audio>
          <Page15/>
          <Page2/>
          <Page3/>
          <Page4/>
          <Page5/>
        </>
      }
    </>
  )
}

export default App
