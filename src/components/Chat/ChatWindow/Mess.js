import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const MessDiv = styled("div")`
  padding: 10px 20px;
  display: flex;
`;

const Account = styled("div")``;

const Info = styled("div")`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Name = styled(Typography.Text)``;

const Date = styled(Typography.Text)`
  margin-left: 10px;
  font-size: 10px;
  color: #9a9a9a;
`;

const Text = styled(Typography.Text)`
  max-width: 500px;
  width: fit-content;
  padding: 5px 10px;
  background: #eb2f96;
  border-radius: 15px;
  color: #fff;
`;
function Mess({ name, text, time, photoURL, styleValue }) {
  return (
    <MessDiv style={{ justifyContent: styleValue }}>
      <Avatar size="small" src={photoURL}>
        {!photoURL && name[0]}
      </Avatar>
      <Info>
        <Account>
          <Name strong>{name}</Name>
          <Date italic>{time}</Date>
        </Account>
        <Text style={{ alignSelf: styleValue }}>{text}</Text>
      </Info>
    </MessDiv>
  );
}

export default Mess;
