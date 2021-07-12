import { FacebookFilled, GoogleSquareFilled } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { auth, fb_provider } from "../../firebase/config";
import genKey from "../../helper/genKey";
import services from "../../services";

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
      services.add("users", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        providerId: additionalUserInfo.providerId,
        keyword: genKey(user.displayName),
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
            Login with Facebook
          </ButtonLogin>

          <ButtonLogin size="large" block icon={<GoogleSquareFilled />}>
            Login with Google
          </ButtonLogin>
        </Col>
      </Row>
    </>
  );
}

export default Login;
