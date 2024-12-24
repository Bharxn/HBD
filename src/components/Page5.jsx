import React, { useState, useRef, useEffect } from "react";
import "./Page5.scss";

const Page5 = ({ length = 7 }) => {
  const [password, setPassword] = useState(Array(length).fill(""));
  const [isPass, setIsPass] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    const newPassword = [...password];
    newPassword[index] = value.toUpperCase();
    setPassword(newPassword);
    console.log(newPassword);
    if(JSON.stringify(newPassword) === JSON.stringify(['B', 'A', 'I', 'T', 'O', 'E', 'Y'])) {
      setIsPass(true);
      setIsStart(true);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !password[index] && index > 0) {
      const previousInput = document.getElementById(`char-${index - 1}`);
      previousInput.focus();
    }
  };

  const focusNext = (index) => {
    if (index < length - 1) {
      const nextInput = document.getElementById(`char-${index + 1}`);
      nextInput.focus();
    }
  };

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const text = "สุขสันต์วันเกิดน้าาาาใบเตย 🎂 วันนี้เป็นอีกหนึ่งวันพิเศษสำหรับพี่เลย ขอบคุณสำหรับทุกสิ่งทุกอย่าง ช่วงเวลาที่ดีที่เรามีร่วมกัน และคอยเป็นพลังบวกให้เสมอ (ลบบ้าง) พี่ขอให้ต่อไปนี้เธอมีแต่ความสุข ถึงแม้จะเจออุปสรรคอะไรมากมายก็ขอให้คิดบวกเอาไว้ อย่าเสียใจเยอะ รีบ ๆ หาความฝันของตัวเองให้เจอ รู้ว่าตัวเองอยากเป็นอะไร ถ้าเจอความฝันแล้วก็ขอให้ประสบความสำเร็จ แต่จำเอาไว้เสมอว่าทุกความสำเร็จนั้นต้องมีอุปสรรคแน่นอน ขอให้เธอผ่านไปได้ด้วยดี ล้มแล้วก็ขอให้ลุกขึ้นมาเร็ว ๆ อย่าเสียใจนาน เป็นคนที่น่ารักแบบนี้ต่อไปนาน ๆ น้าา ดีใจมากที่ได้เป็นส่วนหนึ่งของชีวิตเธอ รักเธอที่สุดดด 💗";
  const speed = 100;

  useEffect(() => {
    if (isStart && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]); 
        setIndex((prev) => prev + 1); 
      }, speed);

      return () => clearTimeout(timeout); 
    }
  }, [isStart, index, text, speed]);

  return (
    <div className="page5">
      {!isPass ?
        <>
          <div className="enter-password"> 🫣 ใส่รหัสผ่านเพื่อดูข้อความลับ 🫣</div>
          <div className="hint"> ( Hint : คนที่สวยที่สุดในโลก)</div>
          <div className="password">
            {password.map((char, index) => (
              <input
                key={index}
                id={`char-${index}`}
                className="each-char"
                type="text"
                value={char}
                maxLength={1}
                onChange={(e) => {
                  handleChange(e.target.value, index);
                  if (e.target.value) focusNext(index);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </> : 
        <>
          <div className="sentence">
            <div className="bruh">
              {displayedText}
              {/* <img className="pic10" src="/src/assets/pic10.jpg"></img>
              <img className="pic11" src="/src/assets/pic11.jpg"></img> */}
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Page5;
