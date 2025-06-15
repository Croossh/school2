import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { DingButton, formatNumberWithComma, setFontBySpan } from "utils";
import {
  BottomBtn,
  CancelBtn,
  OkBtn,
  Paragraph,
  TextBlock,
  Title,
  WarningCont,
  WLeftCont,
} from "pages/warning/Warning";
import { calculateMoney } from "pages/home/homeSilce";

const SelectMoney3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = {
    //state
    selectMoney: useSelector((state) => state["homeReducer"].selectMoney),

    // callback
    calculateMoney: () => {
      dispatch(calculateMoney());
    },
  };

  return (
    <WarningCont>
      <WLeftCont>
        <Title style={{ color: "black" }}>거 래 금 액 확 인</Title>
        <Content>
          <TextBlock>
            <Paragraph>
              아래의 금액을 확인하시고 맞으면 확인을 틀릴 경우에는 취소를 눌러 주십시오.
            </Paragraph>
          </TextBlock>
          <ConfirmBox>
            <div>
              <div>{setFontBySpan("수표")}</div>
              <div>{setFontBySpan("5 만원권")}</div>
              <div>{setFontBySpan("1 만원권")}</div>
              <div>{setFontBySpan("합계금액")}</div>
            </div>
            <div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
            </div>
            <div>
              <div>{formatNumberWithComma(0)} 만원</div>
              <div>{formatNumberWithComma(0)} 만원</div>
              <div>{formatNumberWithComma(store.selectMoney)} 만원</div>
              <div>{formatNumberWithComma(store.selectMoney)} 만원</div>
            </div>
          </ConfirmBox>
        </Content>
      </WLeftCont>
      <BottomBtn>
        <CancelBtn
          onClick={() => {
            navigate("/cancel");
            DingButton();
          }}
        >
          <div>{setFontBySpan("취소")}</div>
        </CancelBtn>
        <OkBtn
          onClick={() => {
            store.calculateMoney();
            navigate("/select4");
            DingButton();
          }}
        >
          <div>{setFontBySpan("확인")}</div>
        </OkBtn>
      </BottomBtn>
    </WarningCont>
  );
};

export default SelectMoney3;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;

  padding: 50px 40px;
  margin-top: 5px;

  border: 1px solid gray;

  height: 325px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ConfirmBox = styled.div`
  width: 100%;
  height: 300px;

  border: 1px solid gray;

  margin-top: 20px;
  padding: 20px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  > div {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 15px;

    font-size: 30px;
    font-weight: bold;

    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  > div:nth-child(1) {
    width: 20%;
    margin-right: 40px;
  }

  > div:nth-child(2) {
    width: 10%;
  }

  > div:nth-child(3) {
    width: 20%;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;
