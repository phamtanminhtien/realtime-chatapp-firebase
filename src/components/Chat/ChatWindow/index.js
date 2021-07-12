import { Alert } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppControlContext } from "../../../contexts/AppControlProvider";
import { AuthContext } from "../../../contexts/AuthProvider";
import objectIsEmpty from "../../../helper/objectIsEmpty";
import useQuery from "../../../hook/useQuery";
import services from "../../../services";
import Content from "./Content";
import Header from "./Header";
import InputChat from "./InputChat";

const ChatWindowDiv = styled("div")`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;
const Note = styled(Alert)`
  margin: 10px;
`;

function ChatWindow() {
  const { roomSelectedId, roomSelected, setShowAddMember } =
    useContext(AppControlContext);
  const { user } = useContext(AuthContext);

  const [form] = useForm();

  const membersCondition = useMemo(
    () => ({
      field: "uid",
      operator: "in",
      compareValue: roomSelected.uid,
    }),
    [roomSelected.uid]
  );

  const members = useQuery("users", membersCondition);

  const handleOnSubmit = () => {
    if (!form.getFieldValue()?.content) return;
    services.add("messages", {
      uid: user.uid,
      roomId: roomSelectedId,
      text: form.getFieldValue()?.content,
    });
    form.resetFields();
  };

  const messagesCondition = useMemo(() => {
    return {
      field: "roomId",
      operator: "==",
      compareValue: roomSelectedId || null,
    };
  }, [roomSelectedId]);

  const messages = useQuery("messages", messagesCondition);

  return (
    <ChatWindowDiv>
      {objectIsEmpty(roomSelected) ? (
        <Note type={"info"} message={"Select one room"} closable showIcon />
      ) : (
        <>
          <Header
            room={roomSelected}
            members={members}
            setShowAddMember={setShowAddMember}
          />
          <Content
            uid={user.uid}
            isLoading={messages.length === 0}
            messages={messages}
            members={members}
          />
          <InputChat form={form} handleOnSubmit={handleOnSubmit} />
        </>
      )}
    </ChatWindowDiv>
  );
}

export default ChatWindow;
