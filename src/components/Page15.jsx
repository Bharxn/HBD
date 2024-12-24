import { useState, useEffect, useRef } from "react";
import "./Page15.scss";

const Page15 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const text = "วันเกิดเธอปีนี้ พี่อยากจะขอขอบคุณเธอ...😇🤭";
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


  return (
    <>
      <div className="page15" ref={targetRef}>
        <div className="quote-first"> {displayedText} </div>
      </div>
    </>
  );
};

export default Page15;