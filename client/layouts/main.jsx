import React from "react";
import Head from 'next/head';
import PropTypes from "prop-types";
import { Header, Footer } from "UI";

const MainLayout = ({ user, children }) => (
  <div className="flex flex-col min-h-screen bg-xs-grey">
    {/*<Head>*/}
    {/*  <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=places`}></script>*/}
    {/*</Head>*/}
    <Header user={user} className="nav__theme_white" />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  user: PropTypes.object
};

MainLayout.defaultProps = {
  user: null
};

export const getLayout = (page, initialProps) => <MainLayout {...initialProps}>{page}</MainLayout>;

export default MainLayout;
