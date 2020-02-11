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
        contentStyle={{
          maxWidth: '410px'
        }}
        logo={<Logo />}
        title="Sing up"
        left={<ArrowBack href="/" />}
        right={<LangSelector />}
        modalDialogStyle={{height: '650px'}}
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
