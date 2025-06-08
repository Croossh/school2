import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navgate = useNavigate();

  return (
    <React.Fragment>
      <HeaderContanier>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
          alt=""
          onClick={() => navgate("/")}
          style={{ cursor: "pointer" }}
        />
        <div></div>
        <img
          onClick={() => navgate("/before")}
          src={`${process.env.PUBLIC_URL}/images/logo2.jpg`}
          alt=""
        />
      </HeaderContanier>
    </React.Fragment>
  );
};

export default Header;

const HeaderContanier = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center; /* 세로 가운데 정렬 추가 */

  > img {
    max-height: 70px; /* 부모 높이에 맞춰 제한 */
    height: auto;
    width: auto;
    flex-shrink: 0; /* 이미지가 줄어드는 것 방지 */
    object-fit: contain;
  }

  > div {
    width: 100%;
    height: 70px;
    background-color: #10a34c;
  }
`;
