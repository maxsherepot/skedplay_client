import { Nav } from "UI";
import PropTypes from "prop-types";

function Header({ user, animation, hero, className }) {
  return (
    <div>
      {animation}
      <header className="relative">
        <Nav user={user} className={className} />
        {hero}
      </header>
    </div>
  );
}

Header.propTypes = {
  animation: PropTypes.node,
  hero: PropTypes.node,
  className: PropTypes.string
};

export default Header;
