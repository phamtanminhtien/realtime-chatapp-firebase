import React, { createContext, useState, useMemo, useEffect } from "react";
import { useContext } from "react";
import useQuery from "../hook/useQuery";
import { AuthContext } from "./AuthProvider";

export const AppControlContext = createContext();

function AppControlProvider({ children }) {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const { user } = useContext(AuthContext);
  const [roomSelected, setRoomSelected] = useState({});
  const [roomSelectedId, setRoomSelectedId] = useState();

  const roomsCondition = useMemo(() => {
    return {
      field: "uid",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);

  const rooms = useQuery("rooms", roomsCondition);

  useEffect(() => {
    setRoomSelected(rooms.find((item) => item.id === roomSelectedId) || {});
  }, [rooms, roomSelectedId]);

  return (
    <AppControlContext.Provider
      value={{
        roomSelected,
        roomSelectedId,
        setRoomSelectedId,
        rooms,
        showAddRoom,
        setShowAddRoom,
        showAddMember,
        setShowAddMember,
      }}
    >
      {children}
    </AppControlContext.Provider>
  );
}

export default AppControlProvider;
