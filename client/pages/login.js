import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { Modal, AnimationBackground, ArrowBack, Logo, LangSelector } from "UI";
import { LoginBox } from "components/login";

function Login() {
  return (
    <>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Login"
        left={<ArrowBack href="/" />}
        right={<LangSelector />}
      >
        <LoginBox />
      </Modal>
    </>
  );
}

Login.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser) {
    redirect(ctx, "/");
  }

  return {};
};

Login.getLayout = page => page;

export default Login;
