import PropTypes from "prop-types";
import { Header, Footer } from "UI";

const MainLayout = ({ user, children }) => (
  <div className="bg-xs-grey">
    <Header user={user} className="nav__theme_white" />
    {children}
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
