import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import Logo from "components/Logo";
import ArrowBack from "components/ArrowBack";
import Modal from "components/Ui/Modal";
import LoginBox from "components/LoginBox";
import AnimationBackground from "components/Ui/AnimationBackground";

function Login() {
  return (
    <Fragment>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Login"
        left={<ArrowBack href="/" title="Back" />}
        right={<div className="block">EN</div> /** Move to language selector */}
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
