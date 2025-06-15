import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Title } = require("pages/warning/Warning");

const EndStage = () => {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  const store = {
    //state
    selectMoney: useSelector((state) => state["homeReducer"].selectMoney),
    noMoney: useSelector((state) => state["homeReducer"].noMoney),
    isReceipt: useSelector((state) => state["homeReducer"].isReceipt),
  };

  // useEffect(() => {
  //   if (!store.selectMoney) {
  //     navigate("/");
  //   }
  // }, []);

  async function playAudioNTimes(src, times) {
    for (let i = 0; i < times; i++) {
      await playOnce(src);
    }
  }

  function playOnce(src) {
    return new Promise((resolve) => {
      const audio = new Audio(src);
      audio.addEventListener("ended", resolve, { once: true });
      audio.play();
    });
  }

  useEffect(() => {
    // 돈세는중
    if (stage === 0 && !store.noMoney) {
      setTimeout(() => {
        const audio = new Audio("/sounds/counting.mp3");
        audio.play();
      }, 1000);

      setTimeout(() => {
        setStage(1);
      }, 5000);
    }
    // 카드 받으셈
    if (stage === 1) {
      setTimeout(() => {
        setStage(2);
      }, 5000);
    }
    // 돈 받으셈
    if (stage === 2) {
      setTimeout(() => {
        playAudioNTimes("/sounds/bell.mp3", 3);
      }, 200);
      setTimeout(() => {
        setStage(3);
      }, 5000);
    }
    // 끝났삼
    if (stage === 3) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [stage]);

  useEffect(() => {
    // 돈부족
    if (stage === 0 && store.noMoney) {
      setTimeout(() => {
        setStage(3);
      }, 5000);
    }
  }, []);

  return (
    <WLeftCont>
      {stage === 0 && store.noMoney && (
        <React.Fragment>
          <Title style={{ color: "black" }}>거 래 취 소</Title>
          <Content>
            <Paragraph2>
              <div>잔액이 부족합니다. 카드를 받아 주십시오.</div>
              <div>처음부터 다시 거래 해주십시오.</div>

              <img width={"80%"} src={`${process.env.PUBLIC_URL}/images/getCard.png`} alt="" />
            </Paragraph2>
          </Content>
        </React.Fragment>
      )}

      {stage === 0 && !store.noMoney && (
        <React.Fragment>
          <Title style={{ color: "black" }}> 통 장 / 카 드</Title>
          <Content>
            <Paragraph2>
              <div>현금을 세고 있습니다.</div>
              <div>잠시만 기다려 주십시오.</div>
              <img
                width={"80%"}
                // height={"318px"}
                src={`${process.env.PUBLIC_URL}/images/waitCash.png`}
                alt=""
              />
            </Paragraph2>
          </Content>
        </React.Fragment>
      )}

      {stage === 1 && (
        <React.Fragment>
          <Title style={{ color: "black" }}>
            {store.isReceipt ? "카 드 / 명 세 표 수 취" : "카 드 수 취"}
          </Title>
          <Content>
            <Paragraph2>
              <div>카드{store.isReceipt && "와 명세표"}를 받으시면</div>
              <div>현금(수표)이 나옵니다.</div>
              {store.isReceipt ? (
                <img
                  width={"80%"}
                  src={`${process.env.PUBLIC_URL}/images/getCardAndReceipt.png`}
                  alt=""
                />
              ) : (
                <img width={"80%"} src={`${process.env.PUBLIC_URL}/images/getCard.png`} alt="" />
              )}
            </Paragraph2>
          </Content>
        </React.Fragment>
      )}

      {stage === 2 && (
        <React.Fragment>
          <Title style={{ color: "black" }}>현 금 수 취</Title>
          <Content>
            <Paragraph2>
              <div>
                현금 <span style={{ fontWeight: "bold" }}>{store.selectMoney}만원</span>을
                받으십시오.
              </div>
              <div>잠시 후 개폐기가 닫힙니다.</div>
              <img width={"80%"} src={`${process.env.PUBLIC_URL}/images/getCash.png`} alt="" />
            </Paragraph2>
          </Content>
        </React.Fragment>
      )}

      {stage === 3 && (
        <React.Fragment>
          <Title style={{ color: "black" }}>안 내</Title>
          <Content>
            <Paragraph2>
              <div>두고 가시는 물건은 없는지 확인해 주십시오.</div>
              <div>대단히 감사합니다.</div>
            </Paragraph2>
          </Content>
        </React.Fragment>
      )}
    </WLeftCont>
  );
};

export default EndStage;

const WLeftCont = styled.div`
  width: 100%;
  height: 640px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 24px;

  padding: 50px 40px;
  margin-top: 5px;

  border: 1px solid gray;

  height: 445px;
`;

const Paragraph2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 20px;

  > div {
    font-size: 40px;
  }
`;
