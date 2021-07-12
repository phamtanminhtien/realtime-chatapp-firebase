import { Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext } from "react";
import { AppControlContext } from "../../contexts/AppControlProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import services from "../../services";

function AddRoom() {
  const { showAddRoom, setShowAddRoom } = useContext(AppControlContext);
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOK = () => {
    services.add("rooms", {
      ...form.getFieldsValue(),
      uid: [user.uid],
    });
    form.resetFields();
    setShowAddRoom(false);
  };
  const handleCancel = () => {
    setShowAddRoom(false);
  };
  return (
    <Modal
      title="Add You Room"
      centered
      visible={showAddRoom}
      onOk={handleOK}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" requiredMark="optional">
        <Form.Item label="Name:" requiredMark={false} name="name">
          <Input type="text" placeholder="Room of ..."></Input>
        </Form.Item>
        <Form.Item label="Description:" name="description">
          <TextArea type="text" placeholder="Description of ..."></TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddRoom;
