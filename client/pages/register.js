import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import Logo from "components/Logo";
import ArrowBack from "components/ArrowBack";
import { RegisterBox } from "components/Registration";
import Modal from "components/Modal";
import AnimationBackground from "components/AnimationBackground";

function Register() {
  return (
    <Fragment>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Sing up"
        left={<ArrowBack href="/" title="Back" />}
        right={<div className="block">EN</div> /** Move to language selector */}
      >
        <RegisterBox />
      </Modal>
    </Fragment>
  );
}

Register.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.me) {
    redirect(ctx, "/");
  }

  return {};
};

export default Register;
