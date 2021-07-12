import React from "react";
import Account from "./Account";
import styled from "styled-components";
import RoomList from "./RoomList";

const SidebarDiv = styled("div")`
  background: #4b1d50;
  height: 100%;
`;

function Sidebar() {
  return (
    <SidebarDiv>
      <Account />
      <RoomList />
    </SidebarDiv>
  );
}

export default Sidebar;
