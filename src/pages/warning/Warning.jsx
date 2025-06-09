import Cancel from "pages/cancel/Cancel";
import { isInsertToFalse, isInsertToTrue } from "pages/cancel/cancelSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { setFontBySpan } from "utils";

const Warning = () => {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = {
    //state
    isInsert: useSelector((state) => state["cancelReducer"].isInsert),
    //callback
    isInsertToTrue: () => {
      dispatch(isInsertToTrue());
    },
    isInsertToFalse: () => {
      dispatch(isInsertToFalse());
    },
  };

  useEffect(() => {
    setStage(1);
    store.isInsertToFalse();
  }, []);

  useEffect(() => {
    if (stage === 2) {
      setTimeout(() => {
        setStage(3);
        store.isInsertToTrue();
      }, 3000);
    }
  }, [stage]);

  return (
    <React.Fragment>
      <WarningCont>
        {stage === 1 && (
          <React.Fragment>
            <WLeftCont>
              <Title>카드 불법복제 주의!!!</Title>
              <Content>
                <TextBlock>
                  <StrongRed>잠깐!</StrongRed>
                  <Paragraph>
                    카드 투입구 이미지를 확인하시고,
                    <br />
                    카드 투입구에 <RedText>다른 부착물이 있는 경우</RedText> 사용을 중단하시고{" "}
                    <RedText>영업점에 신고 또는 인터폰으로 신고</RedText> 해주시기 바랍니다.
                  </Paragraph>
                </TextBlock>
                <ImageBlock>
                  <ImageTitle>정상적인 자동화기기 카드 투입구</ImageTitle>
                  <CardImage
                    src={`${process.env.PUBLIC_URL}/images/insertCard.png`}
                    alt="정상 카드 투입구"
                  />
                </ImageBlock>
              </Content>
            </WLeftCont>
            <BottomBtn>
              <CancelBtn onClick={() => navigate("/cancel")}>
                <div>{setFontBySpan("취소")}</div>
              </CancelBtn>
              <OkBtn>
                <div onClick={() => setStage(2)}>{setFontBySpan("확인")}</div>
              </OkBtn>
            </BottomBtn>
          </React.Fragment>
        )}

        {stage === 2 && (
          <React.Fragment>
            <WLeftCont style={{ height: "640px" }}>
              <Title style={{ color: "black" }}>카드 정보 조회 중</Title>
              <Content style={{ height: "445px" }}>
                <Paragraph2>
                  <div>카드의 정보를 확인하고 있습니다.</div>
                  <div>잠시만 기다려 주십시오.</div>
                  <img src={`${process.env.PUBLIC_URL}/images/loading.png`} alt="" />
                </Paragraph2>
              </Content>
            </WLeftCont>
          </React.Fragment>
        )}

        {stage === 3 && (
          <React.Fragment>
            <WLeftCont>
              <Title style={{ color: "black" }}>비밀번호 입력 주의</Title>
              <Content>
                <Paragraph2>
                  <div style={{ color: "red" }}>타인이나 불법 카메라에 노출되지 않도록</div>
                  <div style={{ color: "red" }}>손이나 책 등으로 충분히 가린 뒤</div>
                  <div>비밀번호를 입력하시기 바랍니다.</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    거래를 계속 하시려면{" "}
                    <img
                      style={{ margin: "0 10px" }}
                      src={`${process.env.PUBLIC_URL}/images/subOkbtn.png`}
                      alt=""
                      width={150}
                      height={50}
                    />
                    을 눌러 주십시오.
                  </div>
                </Paragraph2>
              </Content>
            </WLeftCont>
            <BottomBtn>
              <CancelBtn onClick={() => navigate("/cancel")}>
                <div>{setFontBySpan("취소")}</div>
              </CancelBtn>
              <OkBtn>
                <div onClick={() => navigate("/password")}>{setFontBySpan("확인")}</div>
              </OkBtn>
            </BottomBtn>
          </React.Fragment>
        )}
      </WarningCont>
    </React.Fragment>
  );
};

export default Warning;

export const WarningCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const WLeftCont = styled.div`
  width: 100%;
  height: 520px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
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
  flex-direction: row;
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

export const TextBlock = styled.div`
  flex: 1;
  font-size: 30px;
  line-height: 1.6;
`;

export const StrongRed = styled.div`
  color: red;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 8px;
`;

export const RedText = styled.span`
  color: red;
  font-weight: bold;
`;

export const Paragraph = styled.p`
  margin: 0;
`;

export const Paragraph2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 20px;

  > div {
    font-size: 40px;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  text-align: center;
`;

const ImageTitle = styled.div`
  color: blue;
  font-weight: bold;
  margin-bottom: 15px;

  font-size: 25px;
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
`;

export const BottomBtn = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  margin-top: 20px;
`;

export const CancelBtn = styled.button`
  width: 280px;
  height: 100px;

  background: linear-gradient(to bottom, #7e4b64, #3d0f25); /* 보라색 계열 */
  border: 5px solid #e1d4e3;
  border-radius: 50px;

  color: white;
  font-size: 24px;
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

  font-size: 50px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const OkBtn = styled.button`
  width: 280px;
  height: 100px;

  background: linear-gradient(to bottom, #78b302, #3c7710); /* 보라색 계열 */
  border: 5px solid #d5eef9;
  border-radius: 50px;

  color: white;
  font-size: 24px;
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

  font-size: 50px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
