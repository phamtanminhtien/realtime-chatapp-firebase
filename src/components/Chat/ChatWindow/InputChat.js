import { Button, Form, Input } from "antd";
import React from "react";
import { useRef } from "react";
import styled from "styled-components";

const InputChatDiv = styled("div")`
  border-top: 1px solid #eee;
`;

function InputChat({ form, handleOnSubmit }) {
  const inputRef = useRef();

  if (inputRef?.current) {
    setTimeout(() => {
      inputRef.current.focus();
    });
  }

  return (
    <InputChatDiv>
      <Form
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
        }}
        layout={"inline"}
        form={form}
      >
        <Form.Item style={{ flex: 1 }} name="content">
          <Input
            ref={inputRef}
            type="text"
            onPressEnter={handleOnSubmit}
            bordered={false}
            placeholder="Type Your Message"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              borderBottomStyle: "solid",
            }}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleOnSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </InputChatDiv>
  );
}

export default InputChat;
