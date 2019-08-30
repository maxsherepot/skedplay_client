import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { AnimationBackground, Modal, Logo, ArrowBack, LangSelector } from "UI";
import { RegisterBox } from "components/register";

function Register() {
  return (
    <Fragment>
      <AnimationBackground />
      <Modal
        logo={<Logo />}
        title="Sing up"
        left={<ArrowBack href="/" stepName="register" />}
        right={<LangSelector />}
      >
        <RegisterBox />
      </Modal>
    </Fragment>
  );
}

Register.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser) {
    redirect(ctx, "/");
  }

  return {};
};

export default Register;
