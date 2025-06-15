import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { init, setFirstToFalse, setInitMoney } from "./homeSilce";
import { DingButton, setFontBySpan } from "utils";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←", "정정"];

  const store = {
    //state
    first: useSelector((state) => state["homeReducer"].first),
    //callback
    init: () => {
      dispatch(init());
    },
    setInitMoney: (money) => {
      dispatch(setInitMoney({ money }));
    },
    setFirstToFalse: () => {
      dispatch(setFirstToFalse());
    },
  };

  useEffect(() => {
    if (store.first) {
      navigate("/before");
    }
    store.init();
  }, []);

  return (
    <Container>
      {/* 왼쪽 */}
      {!store.first && (
        <React.Fragment>
          <LeftCont>
            <MainButton>
              <div
                onClick={() => {
                  navigate("/warning");
                  DingButton();
                }}
              >
                {setFontBySpan("예금인출")}
              </div>
            </MainButton>
            <MainBlockButton>
              <div>{setFontBySpan("예금조회")}</div>
            </MainBlockButton>
            <MainBlockButton>
              <div>{setFontBySpan("계좌이체")}</div>
            </MainBlockButton>
            <MainBlockButton style={{ flexDirection: "column", fontSize: "35px" }}>
              <div>{setFontBySpan("입금")}</div>
              <div>{setFontBySpan("무통장입금")}</div>
            </MainBlockButton>
          </LeftCont>
          <MiddleCont>
            <Info>
              <div>현금만 출금가능</div>
              <div>현금/수표 입금가능</div>
            </Info>
            <Info2>
              <div>{setFontBySpan("거래선택")}</div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/cyber_symbol.gif`} alt="" />
              </div>
            </Info2>
          </MiddleCont>
          {/* 오른쪽 */}
          <RightCont>
            <MainBlockButton>
              <div>{setFontBySpan("신용카드")}</div>
            </MainBlockButton>
            <MainBlockButton>
              <div>{setFontBySpan("통장정리")}</div>
            </MainBlockButton>
            <MainBlockButton style={{ flexDirection: "column", fontSize: "35px" }}>
              <div>{setFontBySpan("국고/지방세")}</div>
              <div>{setFontBySpan("등록금/지로")}</div>
            </MainBlockButton>
            <MainBlockButton style={{ flexDirection: "column", fontSize: "24px" }}>
              <div>{setFontBySpan("NH앱캐시")}</div>
              <div>{setFontBySpan("NHpay/삼성페이")}</div>
            </MainBlockButton>
            <MainBlockButton
              style={{
                flexDirection: "column",
                fontSize: "40px",
                background: "linear-gradient(to bottom, #cda877, #c0a177)",
              }}
            >
              <div>{setFontBySpan("다른업무")}</div>
              <div style={{ fontSize: "20px" }}>{setFontBySpan("Foreignㅤlanguage")}</div>
            </MainBlockButton>
          </RightCont>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Home;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  width: 100%;
`;

const LeftCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  gap: 20px;
`;

const RightCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  gap: 20px;
`;

const MiddleCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  gap: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70px;

  gap: 10px;

  color: blue;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

const Info2 = styled.div`
  width: 90%;
  height: 430px;

  border: 3px double gray;
  padding: 3px;

  > div:nth-child(1) {
    border: 1px solid gray;
    background: linear-gradient(to bottom, #f4faf9, #d0e8e6);
    padding: 20px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 40px;
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 40px;
    width: 100%;
    height: auto;
    /* border: 1px solid gray; */

    > img {
      width: 200px;
    }
  }
`;

export const MainButton = styled.div`
  width: 70%;
  height: 80px;

  background: linear-gradient(to bottom, #20a64c, #148c3c);
  border: 5px solid #d5eef9;
  color: white;
  font-weight: bold;
  letter-spacing: 0.3rem;
  padding: 12px 32px;
  border-radius: 15px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(to bottom, #25b255, #169347);
  }

  &:active {
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5);
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  font-size: 50px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const MainBlockButton = styled.div`
  width: 70%;
  height: 80px;

  background: linear-gradient(to bottom, #20a64c, #07902f);
  border: 5px solid #d5eef9;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 0.3rem;
  padding: 12px 32px;
  border-radius: 15px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
  outline: none;
  transition: all 0.2s ease-in-out;

  /* &:hover {
    background: linear-gradient(to bottom, #25b255, #169347);
  }

  &:active {
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5);
  } */

  opacity: 0.7;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  font-size: 50px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
