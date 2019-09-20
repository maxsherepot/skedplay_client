import PropTypes from "prop-types";
import { Header, Footer } from "UI";

const MainLayout = ({ user, children }) => (
  <div className="flex flex-col min-h-screen bg-xs-grey">
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

export default MainLayout;
