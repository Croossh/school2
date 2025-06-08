import { Content, Paragraph2, Title, WLeftCont } from "pages/warning/Warning";
import { isInsertToFalse, isInsertToTrue } from "pages/cancel/cancelSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
            {store.isInsert && <img src={`${process.env.PUBLIC_URL}/images/getCard.png`} alt="" />}
          </Paragraph2>
        </Content>
      </WLeftCont>
    </React.Fragment>
  );
};

export default Cancel;
