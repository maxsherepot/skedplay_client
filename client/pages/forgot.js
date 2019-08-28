import React from "react";

import { AnimationBackground, Modal, Logo, ArrowBack, LangSelector } from "UI";
import { ForgotBox } from "components/forgot";

function Register() {
  return (
    <>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Password recovery"
        left={<ArrowBack href="/" stepName="forgot" />}
        right={<LangSelector />}
      >
        <ForgotBox />
      </Modal>
    </>
  );
}

export default Register;
