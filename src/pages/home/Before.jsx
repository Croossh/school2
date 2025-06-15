import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { init, selectFirstMenu, setFirstToFalse, setInitMoney, setProgress } from "./homeSilce";
import {
  Content,
  Paragraph2,
  Paragraph4,
  PasswordBtnBlock,
  PasswordCont,
  PLeftCont,
  PWParg,
  Title,
} from "pages/selectMoney/SelectMoney2";
import { v4 } from "uuid";
import { DingButton } from "utils";

const Before = () => {
  const [cash, setCash] = useState("0");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←", "정정"];

  const store = {
    //state
    //
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

  const clickCash = (money) => {
    let tempCash = "";

    if (cash === "0" || cash === "") {
      tempCash = money;
    } else {
      tempCash = cash + money;
    }

    if (Number(tempCash) > 1000) return;

    setCash(tempCash);
  };

  const clearPassword = () => {
    setCash("0");
  };

  const removeCash = () => {
    if (cash.length > 0) {
      const tempCash = cash.slice(0, cash.length - 1);

      if (tempCash === "") {
        setCash("0");
      } else {
        setCash(tempCash);
      }
    }
  };

  return (
    <Container>
      <PasswordCont>
        <PLeftCont>
          <Title style={{ color: "black" }}>초기 금액 입력</Title>
          <Content>
            <Paragraph2>
              <div style={{ fontSize: "35px", color: "blue" }}>ATM 훈련 프로그램</div>
            </Paragraph2>
            <Paragraph2>
              <div>만원권 단위로 설정 가능합니다.</div>
              <div>설정하실 잔액을 입력해 주십시오.</div>
            </Paragraph2>
            <Paragraph2>
              <div>(최대 1,000만원 까지)</div>
            </Paragraph2>

            <Paragraph4>
              <div style={{ color: "black", marginTop: "20px" }}>
                <span style={{ color: "black" }}>잔액</span>:{" "}
                <input style={{ width: "80px" }} disabled value={cash} />
                만원
              </div>
            </Paragraph4>
          </Content>
        </PLeftCont>
        <PRightCont>
          {numbers.map((item) => {
            if (item === "정정") {
              return (
                <PasswordBtn
                  style={{ background: "linear-gradient(to bottom, #f29000, #ec6500)" }}
                  onClick={() => {
                    clearPassword();
                    DingButton();
                  }}
                  key={v4()}
                >
                  <PWParg>{item}</PWParg>
                </PasswordBtn>
              );
            } else if (item === "←") {
              return (
                <PasswordBtn
                  style={{ background: "linear-gradient(to bottom, #76a8fd, #00508a)" }}
                  key={v4()}
                  onClick={() => {
                    removeCash();
                    DingButton();
                  }}
                >
                  <PWParg>{item}</PWParg>
                </PasswordBtn>
              );
            } else {
              return (
                <PasswordBtn
                  style={{ background: "linear-gradient(to bottom, #76a8fd, #00508a)" }}
                  key={v4()}
                  onClick={() => {
                    clickCash(item);
                    DingButton();
                  }}
                >
                  <PWParg>{item}</PWParg>
                </PasswordBtn>
              );
            }
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {cash !== "0" ? (
              <PasswordBtn
                style={{ background: "linear-gradient(to bottom, #76a8fd, #00508a)" }}
                onClick={() => {
                  store.setInitMoney(Number(cash));
                  store.setFirstToFalse();
                  navigate("/");
                  DingButton();
                }}
              >
                <PWParg>만원</PWParg>
              </PasswordBtn>
            ) : (
              <PasswordBtnBlock
                style={{ background: "linear-gradient(to bottom, #76a8fd, #00508a)" }}
              >
                <PWParg>만원</PWParg>
              </PasswordBtnBlock>
            )}
          </div>
        </PRightCont>
      </PasswordCont>
    </Container>
  );
};

export default Before;

const PRightCont = styled.div`
  width: 45%;
  height: 640px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;

  /* border: 1px solid #999; */
  background: #f8fbf6;
  padding: 0 0 0 20px;
`;

const PasswordBtn = styled.div`
  width: 105px;
  height: 105px;
  background: linear-gradient(to bottom, #2e7d32, #0d470f); /* 녹색 그라데이션 */
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  width: 80%;
`;

export const MainButton = styled.div`
  width: 280px;
  height: 100px;

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
  width: 280px;
  height: 100px;

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
