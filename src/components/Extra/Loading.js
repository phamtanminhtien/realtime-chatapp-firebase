import { Row, Spin } from "antd";
import React from "react";
import styled from "styled-components";

const LoadingDiv = styled(Row)`
  height: 100vh;
`;

function Loading() {
  return (
    <LoadingDiv justify={"center"} align={"middle"}>
      <Spin size="large" />
    </LoadingDiv>
  );
}

export default Loading;
