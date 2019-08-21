import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import Logo from "components/Logo";
import ArrowBack from "components/ArrowBack";
import Modal from "components/Modal";
import LoginBox from "components/LoginBox";

function Login() {
  return (
    <Fragment>
      <div className="animation-background">
        <div className="animation-gradient">
          <img
            className="animation-background__angle"
            src="/static/img/angle.svg"
          />
        </div>
        <div className="animation-background__footer" />
      </div>
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
