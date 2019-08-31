import PropTypes from "prop-types";
import { Button } from "UI";

function Footer({ className }) {
  return (
    <div className="flex bg-black h-65 mt-24">
      <div className="flex flex-col md:flex-row md:justify-between text-white">
        <div>
          <Button className="text-white" outline>
            Create a site
          </Button>
          <Button className="text-white" outline>
            Join now!
          </Button>
        </div>
        <div>navs</div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
