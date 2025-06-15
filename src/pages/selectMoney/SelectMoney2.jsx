import React, { useEffect, useState } from "react";
import { isInsertToFalse, isInsertToTrue } from "pages/cancel/cancelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { DingButton, setFontBySpan } from "utils";
import { v4 } from "uuid";
import { calculateMoney, changeSelectMoney } from "pages/home/homeSilce";

const SelectMoney2 = () => {
  const [cash, setCash] = useState("0");
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←", "정정"];

  const store = {
    //state
    selectMoney: useSelector((state) => state["homeReducer"].selectMoney),
    //callback
    changeSelectMoney: (money) => {
      dispatch(changeSelectMoney({ money }));
    },
    calculateMoney: () => {
      dispatch(calculateMoney());
    },
  };

  const clickCash = (money) => {
    let tempCash = "";

    if (cash === "0" || cash === "") {
      tempCash = money;
    } else {
      tempCash = cash + money;
    }

    if (Number(tempCash) > 100) return;

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
    <PasswordCont>
      <PLeftCont>
        <Title style={{ color: "black" }}>금 액 입 력</Title>
        <Content>
          <Paragraph2>
            <div>만원권 단위로</div>
            <div>이용할 수 있습니다.</div>
            <div>찾으실 총 금액을 눌러 주십시오.</div>
          </Paragraph2>
          <Paragraph4>
            <div>
              <span style={{ color: "purple" }}>인출한도</span>: <input disabled value={100} />
              만원
            </div>
          </Paragraph4>
          <Paragraph4>
            <div>
              <span style={{ color: "purple" }}>현ㅤㅤ금</span>: <input disabled value={cash} />
              만원
            </div>
          </Paragraph4>
          <Paragraph4>
            <div>
              <span style={{ color: "purple" }}>수ㅤㅤ표</span>: <input disabled value={0} />
              만원
            </div>
          </Paragraph4>
          <Paragraph4>
            <div style={{ color: "black", marginTop: "20px" }}>
              <span style={{ color: "black" }}>금ㅤㅤ액</span>: <input disabled value={cash} />
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
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <PasswordBtn3
            onClick={() => {
              navgate("/cancel");
              DingButton();
            }}
          >
            <PWParg>취소</PWParg>
          </PasswordBtn3>
          {cash !== "0" ? (
            <PasswordBtn
              onClick={() => {
                store.changeSelectMoney(Number(cash));
                store.calculateMoney();
                navgate("/select4");
                DingButton();
              }}
            >
              <PWParg>만원</PWParg>
            </PasswordBtn>
          ) : (
            <PasswordBtnBlock>
              <PWParg>만원</PWParg>
            </PasswordBtnBlock>
          )}
        </div>
      </PRightCont>
    </PasswordCont>
  );
};

export default SelectMoney2;

export const PasswordCont = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 100%;
`;

export const PLeftCont = styled.div`
  width: 50%;
  height: 640px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
`;

export const PRightCont = styled.div`
  width: 35%;
  height: 640px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;

  /* border: 1px solid #999; */
  background: #f8fbf6;
  padding: 4px 0 0 70px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 70px;
  background: linear-gradient(to right, #dcebf0, #dcebf0);
  border: 1px solid gray;
  color: red;

  font-size: 40px;
  font-weight: bold;
  text-align: center;

  padding: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 24px;

  padding: 50px 40px;
  margin-top: 5px;

  border: 1px solid gray;

  height: 445px;
  /* @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  } */
`;

export const Paragraph2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 10px;

  margin-bottom: 20px;

  > div {
    font-size: 30px;
  }
`;

export const Paragraph4 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 20px;
  margin-top: 0px;

  > div {
    font-size: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    > input {
      width: 130px;
      height: 40px;
      border: 1px solid gray;

      text-align: end;
      font-size: 30px;
      padding: 0 10px;
    }
  }
`;

export const PasswordBtnBlock = styled.div`
  width: 105px;
  height: 105px;
  background: linear-gradient(to bottom, #2e7d32, #0d470f); /* 녹색 그라데이션 */
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
  opacity: 0.6;

  cursor: not-allowed;
`;

export const PasswordBtn = styled.div`
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

export const PasswordBtn3 = styled.div`
  width: 105px;
  height: 105px;
  background: linear-gradient(to bottom, #e15200, #ab0900);
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);

  cursor: pointer;
`;

export const PWParg = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 60%;
    max-height: 60%;
  }
`;
