import { isInsertToFalse, isInsertToTrue } from "pages/cancel/cancelSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Cancel = () => {
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
    setTimeout(() => {
      navigate("/");
      store.isInsertToFalse();
    }, 5000);
  }, []);

  return (
    <React.Fragment>
      <WLeftCont>
        <Title style={{ color: "black" }}>거 래 취 소</Title>
        <Content>
          <Paragraph2>
            <div>거래가 취소 되었습니다.</div>
            <div>
              {store.isInsert && <span>카드를 회수하여 주시고 </span>}처음부터 다시 시작해주십시오.
            </div>
            {store.isInsert && (
              <img src={`${process.env.PUBLIC_URL}/images/getCard.png`} width={"80%"} alt="" />
            )}
          </Paragraph2>
        </Content>
      </WLeftCont>
    </React.Fragment>
  );
};

export default Cancel;

const WLeftCont = styled.div`
  width: 100%;
  height: 640px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
`;

const Title = styled.div`
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
    font-size: 35px;
  }
`;
