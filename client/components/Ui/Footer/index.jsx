import { Button } from "UI";
import {
  MasterCardSvg,
  VisaSvg,
  PayPalSvg,
  PostFinanceSvg,
  InvoiceSvg,
  SmsSvg
} from "icons";

function Footer() {
  return (
    <div className="footer flex flex-col bg-black mt-24">
      <div className="fluid-container flex flex-col md:flex-row w-full text-white my-6">
        <div className="flex flex-col md:flex-row md:w-1/2">
          <Button size="xs" className="my-4 md:mr-4 md:w-40" outline>
            Create a site
          </Button>
          <Button size="xs" className="my-4 md:w-40" outline>
            Join now!
          </Button>
        </div>
        <div className="flex flex-col justify-center text-center md:w-1/2">
          <ul className="md:flex items-center justify-end leading-loose">
            <li>About</li>
            {/* Only odd */}
            <li className="mx-8">Contacts</li>
            <li>Help center</li>
          </ul>
        </div>
      </div>
      <div className="border-dark-grey border-b"></div>
      <div className="my-6">
        <div className="fluid-container flex flex-col-reverse lg:flex-row md:justify-between items-center text-center">
          <div className="text-grey text-sm">
            Copyright © 2019 Skedplay. All rights reserved.
          </div>
          <div className="text-grey text-sm my-4 md:my-0">
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

export default Footer;
