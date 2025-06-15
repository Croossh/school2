import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Router from "./router";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Home from "pages/home/Home";
import { v4 } from "uuid";

function App() {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState([]);
  const audioRef = useRef(null);

  const store = {
    //state
    // selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
  };

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const id = v4();

    setClicks((prev) => [...prev, { x, y, id }]);
  };

  const removeClick = (id) => {
    setClicks((prev) => prev.filter((click) => click.id !== id));
  };

  const ClickEffect = ({ clicks, removeClick }) => {
    return (
      <ClickEffectWrapper>
        {clicks.map((click) => (
          <Ripple
            key={click.id}
            style={{ left: click.x - 32, top: click.y - 32 }}
            onAnimationEnd={() => removeClick(click.id)}
          />
        ))}
      </ClickEffectWrapper>
    );
  };

  useEffect(() => {
    // if (!store.selectShowArray.length > 0) {
    //   navigate("/");
    // }

    const audio = new Audio("/sounds/ding.mp3");

    const handleClick = (e) => {
      if (e.target.tagName.toLowerCase() === "button") {
        // play()는 try-catch로 감싸는 게 안정적
        try {
          audio.currentTime = 0;
          audio.play();
        } catch (err) {
          console.warn("Audio play failed:", err);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <Contanier className="App" onClick={handleClick}>
      {/* <ClickEffect clicks={clicks} removeClick={removeClick} /> */}
      <Header />
      <InnerContainer>
        <Router />
      </InnerContainer>
    </Contanier>
  );
}
// ;

export default App;

const Contanier = styled.div`
  width: 1180px;
  height: 100%;

  /* border: 1px solid red; */
  /* margin: 20px auto; */

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  user-select: none;
`;

const InnerContainer = styled.div`
  width: 1000px;
  margin: 20px auto;

  display: flex;
  justify-content: center;
  flex-direction: row;

  user-select: none;
`;

const ripple = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const Ripple = styled.span`
  position: absolute;
  width: 64px;
  height: 64px;
  background: rgba(0, 123, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  animation: ${ripple} 0.6s ease-out forwards;
`;

const ClickEffectWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // 클릭 막지 않도록
`;

// {
//   next < 6 && (
//     <React.Fragment>
//       <Tutorial>
//         <img src={`${process.env.PUBLIC_URL}/images/${tutoArray[next]}.png`} alt="" />
//       </Tutorial>
//       {next < 5 && <NextButton1 onClick={() => setNext(next + 1)}>다음으로</NextButton1>}
//       {next === 5 && <NextButton2 onClick={() => setNext(next + 1)}>시작하기</NextButton2>}
//     </React.Fragment>
//   );
// }
// {
//   next === 6 && (
//     <React.Fragment>
//       <Header />
//       <Router />
//       <Footer />
//     </React.Fragment>
//   );
// }
