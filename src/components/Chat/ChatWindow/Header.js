import { Avatar, Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Text } = Typography;

const HeaderCus = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  border-bottom: 1px solid #eee;
`;

const Name = styled(Text)`
  margin-left: 5px;
`;

const AvatarCustom = styled(Avatar)`
  color: #f56a00;
  background-color: #fde3cf;
`;

const InfoRoom = styled("div")``;

const AddButton = styled(Button)`
  margin-left: 10px;
`;

const MemberList = styled("div")`
  display: flex;
`;

function Header({ room, members, setShowAddMember }) {
  return (
    <HeaderCus>
      <InfoRoom>
        <AvatarCustom src={room.photoURL}>
          {!room.photoURL && room.name[0]}
        </AvatarCustom>
        <Name strong>{room.name}</Name>
      </InfoRoom>
      <MemberList>
        <Avatar.Group
          maxCount={2}
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {members.map((item) => (
            <Avatar key={item.uid} src={item.photoURL}>
              {!item.photoURL && item.displayName[0]}
            </Avatar>
          ))}
        </Avatar.Group>
        <AddButton
          type="primary"
          ghost
          onClick={() => {
            setShowAddMember(true);
          }}
        >
          Add
        </AddButton>
      </MemberList>
    </HeaderCus>
  );
}

export default Header;
