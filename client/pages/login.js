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
        <div className="mt-4 form-group">
          <label>Phone number</label>
          <input className="form-control" type="text" value="+41 79" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="text" />
        </div>
        <div className="flex px-3 my-5">
          <div className="w-1/2">
            <input type="checkbox" id="login-remember-me" />
            <label htmlFor="login-remember-me">
              <span />
              Remember me
            </label>
          </div>
          <div className="w-1/2 text-right">
            <a className="text-sm transition hover:opacity-75" href="#forgot">
              Los t your password?
            </a>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <div
            id="recaptcha-demo"
            className="g-recaptcha"
            data-sitekey="6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-"
            data-callback="onSuccess"
          />
        </div>
        <button className="btn text-xl">Login</button>
        <a
          className="block mt-5 text-center text-red transition hover:text-pink text-lg"
          href="registration.html"
        >
          Create account
        </a>
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
