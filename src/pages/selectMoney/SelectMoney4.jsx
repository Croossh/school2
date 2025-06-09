import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithComma, setFontBySpan } from "utils";
import { CancelBtn, OkBtn, Paragraph, TextBlock, Title } from "pages/warning/Warning";
import { PriceBtn } from "./SelectMoney1";
import { receiptToTrue } from "pages/home/homeSilce";

const SelectMoney4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = {
    //state
    selectMoney: useSelector((state) => state["homeReducer"].selectMoney),
    initMoney: useSelector((state) => state["homeReducer"].initMoney),
    noMoney: useSelector((state) => state["homeReducer"].noMoney),
    //callback
    receiptToTrue: (money) => {
      dispatch(receiptToTrue({ money }));
    },
  };

  useEffect(() => {
    if (store.noMoney) {
      navigate("/end");
    }
  }, []);

  return (
    <SCont>
      <SLeftCont>
        <Title style={{ color: "black" }}>거래확인 및 명세표 선택</Title>
        <Content>
          <TextBlock>
            <Paragraph>명세표를 받으시겠습니까?</Paragraph>
          </TextBlock>
          <TextBlock style={{ marginTop: "70px", fontSize: "30px", fontWeight: "bold" }}>
            <Paragraph>** 거 래 결 과 **</Paragraph>
          </TextBlock>
          <ConfirmBox>
            <div>
              <div>{setFontBySpan("거래금액")}</div>
              <div>{setFontBySpan("잔액")}</div>
              <div>{setFontBySpan("수수료")}</div>
            </div>
            <div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
            </div>
            <div>
              <div>{formatNumberWithComma(store.selectMoney * 10000)} 원</div>
              <div>{formatNumberWithComma(store.initMoney * 10000)} 원</div>
              <div>{formatNumberWithComma(0)} 원</div>
            </div>
          </ConfirmBox>
        </Content>
      </SLeftCont>
      <SideBtn>
        <PriceBtn
          onClick={() => {
            store.receiptToTrue();
            navigate("/end");
          }}
        >
          <div>{setFontBySpan(" 예 ")}</div>
        </PriceBtn>
        <PriceBtn onClick={() => navigate("/end")}>
          <div>{setFontBySpan("아니요")}</div>
        </PriceBtn>
      </SideBtn>
    </SCont>
  );
};

export default SelectMoney4;

const SCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 100%;
`;

const SLeftCont = styled.div`
  width: 65%;
  height: 640px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const ConfirmBox = styled.div`
  width: 100%;
  height: 258px;

  /* border: 1px solid gray;*/

  /* margin-top: 40px; */

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

    gap: 30px;

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
    width: 30%;
    margin-right: 40px;
  }

  > div:nth-child(2) {
    width: 10%;
  }

  > div:nth-child(3) {
    width: 45%;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;

const SideBtn = styled.div`
  width: 30%;
  height: auto;
  margin-bottom: auto;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 20px;

  /* margin-top: 20px; */
`;
