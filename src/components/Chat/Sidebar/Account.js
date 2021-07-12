import React, { useContext } from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/AuthProvider";
const { Text } = Typography;

const AccountDiv = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

const Name = styled(Text)`
  color: #fff;
  margin-left: 5px;
`;

const AvatarCustom = styled(Avatar)`
  color: #f56a00;
  background-color: #fde3cf;
`;

const Info = styled("div")``;

function Account() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <AccountDiv>
      <Info>
        <AvatarCustom src={user.photoURL}>
          {!user.photoURL && user.displayName[0]}
        </AvatarCustom>
        <Name strong>{user.displayName}</Name>
      </Info>
      <Button ghost onClick={signOut}>
        Sign Out
      </Button>
    </AccountDiv>
  );
}

export default Account;
