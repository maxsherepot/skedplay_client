import PropTypes from "prop-types";
import { Button } from "UI";
import {
  MasterCardSvg,
  VisaSvg,
  PayPalSvg,
  PostFinanceSvg,
  InvoiceSvg,
  SmsSvg
} from "icons";

function Footer({ className }) {
  return (
    <div className="flex flex-col bg-black mt-24">
      <div className="container flex flex-col lg:flex-row w-full text-white my-6">
        <div className="flex flex-col lg:flex-row lg:w-1/2">
          <Button size="xs" className="my-4 lg:mr-4 lg:w-40" outline>
            Create a site
          </Button>
          <Button size="xs" className="my-4 lg:w-40" outline>
            Join now!
          </Button>
        </div>
        <div className="flex flex-col justify-center text-center lg:w-1/2">
          <ul className="lg:flex items-center justify-end leading-loose">
            <li>About</li>
            {/* Only odd */}
            <li className="mx-8">Contacts</li>
            <li>Help center</li>
          </ul>
        </div>
      </div>
      <div className="border-grey border-b"></div>
      <div className="container my-6">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center text-center">
          <div className="text-grey text-sm">
            Copyright © 2019 Skedplay. All rights reserved.
          </div>
          <div className="text-grey text-sm my-4 lg:my-0">
            Terms and Conditions & Privacy Policy
          </div>
          <div className="footer-icons">
            <MasterCardSvg></MasterCardSvg>
            <VisaSvg></VisaSvg>
            <PayPalSvg></PayPalSvg>
            <PostFinanceSvg></PostFinanceSvg>
            <InvoiceSvg></InvoiceSvg>
            <SmsSvg></SmsSvg>
          </div>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
