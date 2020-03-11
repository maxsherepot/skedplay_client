import React from "react";
import PropTypes from "prop-types";
import { Header, Footer } from "UI";
import Centrifugo from "components/centrifuge";
import Modal from "UI/Modal";

const MainLayout = ({ user, children }) => {
    if (user) {
        Centrifugo.init().then(centrifuge => {
            const channel = 'user_status';

            if (centrifuge.getSub(channel)) {
                return;
            }

            centrifuge.subscribe(channel, data => {
                console.log(data);
                console.log('AAAAAA');
            });
        });
    }


  return (
    <div className="flex flex-col min-h-screen bg-xs-grey">
      <Header user={user} className="nav__theme_white" />
      <div className="flex-1">{children}</div>
      <Footer user={user} />
    </div>
  );
};

MainLayout.propTypes = {
  user: PropTypes.object
};

MainLayout.defaultProps = {
  user: null
};

export const getLayout = (page, initialProps) => <MainLayout {...initialProps}>{page}</MainLayout>;

export default MainLayout;
