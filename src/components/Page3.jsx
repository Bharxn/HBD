import { useState, useEffect, useRef } from "react";
import "./Page3.scss";

const Page3 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const text = "ขอบคุณผู้หญิงน่ารักคนนี้ ที่ได้เข้ามาในชีวิตของพี่ ทำให้หัวใจของผู้ชายคนนี้เบ่งบานแบบไม่เคยเป็นมาก่อน (ไม่ได้โม้้) ได้พบกับสีสันใหม่ ๆ และความสุขในชีวิต เธอทำให้พี่อยากมีเธอในทุกช่วงชีวิตของพี่มากเลยจริง ๆ";
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
      <div className="page3" ref={targetRef}>
        <div className="quote"> {displayedText} </div>
        <div className="container-pic">
          <div className="class-pic">
            <img className="pic9" src="pic9.jpg"></img>
            <img className="pic8" src="pic8.jpg"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page3;