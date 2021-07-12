import { Form, Modal, Select, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { debounce } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { AppControlContext } from "../../contexts/AppControlProvider";
import { db } from "../../firebase/config";
import simpText from "../../helper/simpText";

const { Option } = Select;

const queryOption = (searchValue, ex) => {
  return db
    .collection("users")
    .where("keyword", "array-contains", simpText(searchValue))
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => {
          return !ex.includes(opt.uid);
        });
    });
};

function AddMember() {
  const { showAddMember, setShowAddMember, roomSelected, roomSelectedId } =
    useContext(AppControlContext);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState([]);
  const [fetchOptions, setFetchOptions] = useState(false);
  const [form] = Form.useForm();

  const handleOK = () => {
    setShowAddMember(false);
    if (search.length === 0) return;
    db.collection("rooms")
      .doc(roomSelectedId)
      .update({ uid: [...roomSelected.uid, ...search] });

    setSearch([]);
    form.resetFields();
  };
  const handleCancel = () => {
    setShowAddMember(false);

    setSearch([]);
    form.resetFields();
  };
  const handleOnSearch = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetchOptions(true);

      queryOption(value, roomSelected.uid).then((newOptions) => {
        setOptions(newOptions);
        setFetchOptions(false);
      });
    };

    return debounce(loadOptions, 300);
  }, [roomSelected.uid]);

  useEffect(() => {
    return setOptions([]);
  }, [setOptions]);

  return (
    <Modal
      title="Add Members"
      centered
      visible={showAddMember}
      onOk={handleOK}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" requiredMark="optional">
        <Form.Item
          label="Search for members:"
          requiredMark={false}
          name="members"
        >
          <Select
            filterOption={false}
            mode={"multiple"}
            placeholder={"Select members"}
            value={search}
            onSearch={handleOnSearch}
            onChange={setSearch}
            notFoundContent={fetchOptions ? <Spin size="small" /> : "Not Found"}
          >
            {options.map((item) => (
              <Option key={item.uid} value={item.uid} label={item.label}>
                <Avatar
                  size={"small"}
                  style={{ marginRight: 10 }}
                  src={item.photoURL}
                >
                  {!item.photoURL && item.label[0]}
                </Avatar>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddMember;
