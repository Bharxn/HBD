import { useState, useEffect, useRef } from "react";
import "./Page4.scss";

const Page4 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const text = "ขอบคุณเธอมาก ๆ ที่คอยพาพี่ไปนู่นไปนี่ตลอด ทำให้พี่ได้ไปเที่ยวหลายที่มาก ๆ จากที่เป็นคนแทบไม่ไปไหนเลย อยู่แต่ในบ้าน 😩 เที่ยวกับเธอมันสนุกมากจริง ๆ";
  const speed = 100;

  //check if div in viewport
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setIsVisible(true);
          console.log(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    } 
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]); 
        setIndex((prev) => prev + 1); 
      }, speed);

      return () => clearTimeout(timeout); 
    }
  }, [isVisible, index, text, speed]);

  const [zIndex1, setZIndex1] = useState(2);
  const [zIndex2, setZIndex2] = useState(1);

  const swapZIndex = () => {
    setZIndex1(zIndex2);
    setZIndex2(zIndex1);
  };

  return (
    <>
      <div className="page4" ref={targetRef}>
        <video
          className="video1"
          autoPlay
          muted
          loop
          style={{ zIndex: zIndex1 }}
          onClick={swapZIndex}
        >
          <source src="vid1.mp4" type="video/mp4" />
        </video>

        <video
          className="video2"
          autoPlay
          muted
          loop
          style={{ zIndex: zIndex2 }}
          onClick={swapZIndex}
        >
          <source src="vid2.mp4" type="video/mp4" />
        </video>
        <div className="quote">
          {displayedText}
        </div>
      </div>
    </>
  );
};

export default Page4;