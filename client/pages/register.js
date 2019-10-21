import React from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { AnimationBackground, Modal, Logo, ArrowBack, LangSelector } from "UI";
import { RegisterBox } from "components/register";

function Register() {
  return (
    <>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Sing up"
        left={<ArrowBack href="/" />}
        right={<LangSelector />}
      >
        <RegisterBox />
      </Modal>
    </>
  );
}

Register.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser) {
    redirect(ctx, "/");
  }

  return {};
};

Register.getLayout = page => page;

export default Register;
