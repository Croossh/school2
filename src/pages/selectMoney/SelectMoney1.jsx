import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setFontBySpan } from "utils";
import { CancelBtn } from "pages/warning/Warning";
import { changeSelectMoney } from "pages/home/homeSilce";

const SelectMoney1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = {
    //state
    selectMoney: useSelector((state) => state["homeReducer"].selectMoney),
    //callback
    changeSelectMoney: (money) => {
      dispatch(changeSelectMoney({ money }));
    },
  };
  useEffect(() => {
    // store.setProgress(0);
  }, []);

  return (
    <Container>
      {/* 왼쪽 */}
      <LeftCont>
        {[3, 5, 10, 15, 20, ""].map((item, i) => {
          if (i === 5) {
            return (
              <PriceBtn
                onClick={() => navigate("/select2")}
                style={{ background: "linear-gradient(to bottom, #7ab501, #397510)" }}
              >
                <div>{setFontBySpan("기타금액")}</div>
              </PriceBtn>
            );
          } else {
            return (
              <PriceBtn
                onClick={() => {
                  store.changeSelectMoney(item);
                  navigate("/select3");
                }}
              >
                <div>{setFontBySpan(` ${item} 만원`)}</div>
              </PriceBtn>
            );
          }
        })}
      </LeftCont>
      <MiddleCont>
        <Info2>
          <div>{setFontBySpan("금액선택")}</div>
          <div>
            원하시는 금액의
            <img src={`${process.env.PUBLIC_URL}/images/exBtn.png`} alt="" /> 을 눌러주십시오.
          </div>
        </Info2>
      </MiddleCont>
      {/* 오른쪽 */}
      <RightCont>
        {[30, 40, 50, 70, 100, ""].map((item, i) => {
          if (i === 5) {
            return (
              <CancelBtn onClick={() => navigate("/cancel")}>
                <div>{setFontBySpan("취소")}</div>
              </CancelBtn>
            );
          } else {
            return (
              <PriceBtn
                onClick={() => {
                  store.changeSelectMoney(item);
                  navigate("/select3");
                }}
              >
                <div>{setFontBySpan(` ${item} 만원`)}</div>
              </PriceBtn>
            );
          }
        })}
      </RightCont>
    </Container>
  );
};

export default SelectMoney1;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  width: 100%;
  height: 100%;
`;

const LeftCont = styled.div`
  height: 640px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  gap: 20px;
`;

const RightCont = styled.div`
  height: 640px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  gap: 20px;
`;

const MiddleCont = styled.div`
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 10px;
`;

const Info2 = styled.div`
  width: 400px;
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
    flex-direction: column;
    gap: 20px;

    width: 100%;
    height: 80%;
    font-size: 40px;

    > img {
      width: 200px;
    }
  }
`;

export const PriceBtn = styled.button`
  width: 280px;
  height: 100px;

  background: linear-gradient(to bottom, #237141, #074013); /* 보라색 계열 */
  border: 5px solid #d5eef9;
  border-radius: 50px;

  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 10px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.5), 0 0 3px rgba(0, 0, 0, 0.5);
  font-family: "Malgun Gothic", sans-serif;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
