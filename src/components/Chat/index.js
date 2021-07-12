import { Col, Row } from "antd";
import React from "react";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const ChatDiv = styled(Row)`
  height: 90vh;
`;

function Chat() {
  return (
    <ChatDiv>
      <Col span={4}>
        <Sidebar />
      </Col>
      <Col span={20}>
        <ChatWindow />
      </Col>
    </ChatDiv>
  );
}

export default Chat;
