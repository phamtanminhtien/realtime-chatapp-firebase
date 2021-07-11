import React from "react";
import { Col, Row, Button, Typography } from "antd";
import { FacebookFilled, GoogleSquareFilled } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db, fb_provider } from "../../firebase/config";

const TypographyTitle = Typography.Title;

const ButtonLogin = styled(Button)`
  margin-bottom: 5px;
`;
const TitleTop = styled(TypographyTitle)`
  margin-bottom: 10px;
`;

function Login() {
  const handleLoginFacebook = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      fb_provider
    );
    if (additionalUserInfo.isNewUser) {
      db.collection("users").add({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        providerId: additionalUserInfo.providerId,
      });
    }
  };

  return (
    <>
      <Row justify={"center"}>
        <TitleTop>Chat App</TitleTop>
      </Row>
      <Row justify={"center"}>
        <Col span={8}>
          <ButtonLogin
            size="large"
            block
            icon={<FacebookFilled />}
            style={{ marginBottom: 20, marginTop: 20 }}
            onClick={handleLoginFacebook}
          >
            Đăng nhập với Facebook
          </ButtonLogin>

          <ButtonLogin size="large" block icon={<GoogleSquareFilled />}>
            Đăng nhập với Google
          </ButtonLogin>
        </Col>
      </Row>
    </>
  );
}

export default Login;
