import { Spin } from "antd";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Mess from "./Mess";

const ContentDiv = styled("div")`
  flex: 1;
  overflow: auto;
`;

const LoadingDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Content({ isLoading, messages, members, uid }) {
  const _this = useRef();

  useEffect(() => {
    _this.current.scrollTo({
      top: _this.current.scrollHeight,
      left: 100,
      behavior: "smooth",
    });
  }, [_this]);

  useEffect(() => {
    _this.current.scrollTo({
      top: _this.current.scrollHeight,
      left: 100,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <ContentDiv ref={_this}>
      {isLoading ? (
        <LoadingDiv>
          <Spin />
        </LoadingDiv>
      ) : (
        messages.map((item) => {
          let userMess = members.find((i) => i.uid === item.uid);
          const styleValue = uid === item.uid ? "flex-end" : "";
          return (
            <Mess
              styleValue={styleValue}
              key={item.id}
              text={item.text || "TEXT"}
              name={userMess?.displayName || "DISPLAY_NAME"}
              time={item.createdAt.toDate().toString() || "TIME"}
              photoURL={userMess?.photoURL}
            />
          );
        })
      )}
    </ContentDiv>
  );
}

export default Content;
