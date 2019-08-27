import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { Modal, AnimationBackground, ArrowBack, Logo, LangSelector } from "UI";
import { LoginBox } from "components/login";

function Login() {
  return (
    <Fragment>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Login"
        left={<ArrowBack href="/" title="Back" />}
        right={<LangSelector />}
      >
        <LoginBox />
      </Modal>
    </Fragment>
  );
}

Login.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.me) {
    redirect(ctx, "/");
  }

  return {};
};

export default Login;
