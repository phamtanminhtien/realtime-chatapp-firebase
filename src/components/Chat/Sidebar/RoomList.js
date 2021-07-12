import { OrderedListOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppControlContext } from "../../../contexts/AppControlProvider";

const RoomListDiv = styled("div")`
  text-align: center;
`;

const AddRoom = styled(Button)`
  margin-top: 10px;
  text-align: right;
`;

const MenuCus = styled(Menu)`
  margin: 0 0 20px 0;
`;

function RoomList() {
  const { rooms, setShowAddRoom, setRoomSelectedId } =
    useContext(AppControlContext);
  return (
    <RoomListDiv>
      <MenuCus mode="inline" defaultOpenKeys={["0"]}>
        <Menu.SubMenu
          title="Room List"
          key={"0"}
          icon={<OrderedListOutlined />}
        >
          {rooms.map((item) => (
            <Menu.Item
              key={item.id}
              onClick={() => {
                setRoomSelectedId(item.id);
              }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </MenuCus>
      <AddRoom
        ghost
        icon={<PlusCircleOutlined />}
        onClick={() => {
          setShowAddRoom(true);
        }}
      >
        Add Room
      </AddRoom>
    </RoomListDiv>
  );
}

export default RoomList;
