import React, { useEffect, useState } from "react";
import { isInsertToFalse, isInsertToTrue } from "pages/cancel/cancelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { setFontBySpan } from "utils";
import { v4 } from "uuid";

const Password = () => {
  const [password, setPassword] = useState("");
  const [numberArray, setNumberArray] = useState([]);
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const symbols = [
    <img src={`${process.env.PUBLIC_URL}/images/cyber_symbol.gif`} alt="symbol" />,
    <img src={`${process.env.PUBLIC_URL}/images/cyber_symbol.gif`} alt="symbol" />,
  ];

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

  const clickPassword = () => {
    if (password.length < 4) {
      const tempPassword = password + "●";

      setPassword(tempPassword);
    }
  };

  const clearPassword = () => {
    setPassword("");
  };

  const removePassword = () => {
    if (password.length > 0) {
      const tempPassword = password.slice(0, password.length - 1);

      setPassword(tempPassword);
    }
  };

  const getRandomIndexes = (count, max) => {
    const indexes = new Set();
    while (indexes.size < count) {
      indexes.add(Math.floor(Math.random() * (max + 1)));
    }
    return Array.from(indexes).sort((a, b) => a - b);
  };

  const insertImages = (numbers, images) => {
    const indexes = getRandomIndexes(images.length, numbers.length);
    const result = [...numbers];
    images.forEach((img, i) => {
      result.splice(indexes[i] + i, 0, img);
    });
    return result;
  };

  useEffect(() => {
    setNumberArray(insertImages(numbers, symbols));
  }, []);

  return (
    <React.Fragment>
      <PasswordCont>
        <PLeftCont>
          <Title style={{ color: "black" }}>비 밀 번 호</Title>
          <Content>
            <Paragraph2>
              <div>카드의 비밀번호</div>
              <div>
                <span style={{ color: "blue", fontWeight: "bold" }}>4자리</span>를 눌러 주십시오.
              </div>
            </Paragraph2>
            <Paragraph3>
              <div>비밀번호가 타인게에 노출되지 않도록</div>
              <div>각별히 주의하여 주십시오.</div>
            </Paragraph3>
            <Paragraph4>
              <div>
                비밀번호: <input disabled value={password} />
              </div>
            </Paragraph4>
          </Content>
        </PLeftCont>
        <PRightCont>
          {numberArray.map((item) => {
            if (isNaN(item)) {
              return (
                <PasswordBtn key={v4()}>
                  <PWParg>{item}</PWParg>
                </PasswordBtn>
              );
            } else {
              return (
                <PasswordBtn key={v4()} onClick={clickPassword}>
                  <PWParg>{item}</PWParg>
                </PasswordBtn>
              );
            }
          })}
          <PasswordBtn2 onClick={() => setNumberArray(insertImages(numbers, symbols))}>
            <PWParg>재배열</PWParg>
          </PasswordBtn2>
          <PasswordBtn onClick={removePassword}>
            <PWParg>←</PWParg>
          </PasswordBtn>
          <PasswordBtn
            style={{ background: "linear-gradient(to bottom, #f29000, #ec6500)" }}
            onClick={clearPassword}
          >
            <PWParg>정정</PWParg>
          </PasswordBtn>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <PasswordBtn3 onClick={() => navgate("/cancel")}>
              <PWParg>취소</PWParg>
            </PasswordBtn3>
            {password.length > 3 ? (
              <PasswordBtn onClick={() => navgate("/select1")}>
                <PWParg>확인</PWParg>
              </PasswordBtn>
            ) : (
              <PasswordBtnBlock>
                <PWParg>확인</PWParg>
              </PasswordBtnBlock>
            )}
          </div>
        </PRightCont>
      </PasswordCont>
    </React.Fragment>
  );
};

export default Password;

const PasswordCont = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 100%;
`;

const PLeftCont = styled.div`
  width: 50%;
  height: 675px;

  border: 1px solid #999;
  background: #f8fbf6;
  padding: 4px;
`;

const PRightCont = styled.div`
  width: 45%;
  height: 675px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;

  /* border: 1px solid #999; */
  background: #f8fbf6;
  padding: 4px 0 0 20px;
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 24px;

  padding: 50px 40px;
  margin-top: 5px;

  border: 1px solid gray;

  height: 480px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Paragraph2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 20px;

  > div {
    font-size: 40px;
  }
`;

const Paragraph3 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  margin-top: 30px;

  gap: 20px;

  color: purple;

  > div {
    font-size: 30px;
    font-weight: bold;
  }
`;

const Paragraph4 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 20px;
  margin-top: 40px;

  > div {
    font-size: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    > input {
      width: 280px;
      height: 40px;
      border: 1px solid gray;

      text-align: end;
      font-size: 40px;
      padding: 0 10px;
    }
  }
`;

const PasswordBtnBlock = styled.div`
  width: 120px;
  height: 120px;
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

const PasswordBtn = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(to bottom, #2e7d32, #0d470f); /* 녹색 그라데이션 */
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;

const PasswordBtn2 = styled.div`
  width: 259px;
  height: 120px;
  background: linear-gradient(to bottom, #2e7d32, #0d470f);
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;

const PasswordBtn3 = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(to bottom, #e15200, #ab0900);
  border: 2px solid #cfd8dc; /* 옅은 회색 테두리 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);

  cursor: pointer;
`;

const PWParg = styled.div`
  color: white;
  font-size: 50px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 60%;
    max-height: 60%;
  }
`;
