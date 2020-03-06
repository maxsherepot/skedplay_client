import { Button } from "UI";
import {
  MasterCardSvg,
  VisaSvg,
  PayPalSvg,
  PostFinanceSvg,
  InvoiceSvg,
  SmsSvg
} from "icons";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {useState} from "react";
import ContactsPopup from "components/popups/ContactsPupup";

import {CookiesBlock} from 'UI';

function Footer({ user }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="footer flex flex-col bg-black">
      <CookiesBlock/>

      <div className="fluid-container flex flex-col md:flex-row w-full text-white my-6">
        <div className="flex flex-col md:flex-row md:w-1/2">
          {/*<Button size="xs" className="my-4 md:mr-4 md:w-40" outline>*/}
          {/*  {t('layout.create_site')}*/}
          {/*</Button>*/}
          {!user &&
            <Link href="/register">
              <Button size="xs" className="my-4 md:w-40" outline>
                {t('layout.join_now')}
              </Button>
            </Link>
          }
        </div>
        <div className="flex flex-col justify-center text-center md:w-1/2">
          <ul className="md:flex items-center justify-end leading-loose">
            <li>
              <Link href='/about'>
                <a className="text-white">
                  {t('layout.about')}
                </a>
              </Link>
            </li>
            {/* Only odd */}

            <ContactsPopup/>

            <li>
              <Link href={`/helpcenter`}>
                <a>
                  {t('layout.help_center')}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-dark-grey border-b"></div>
      <div className="my-6">
        <div className="fluid-container flex flex-col-reverse lg:flex-row md:justify-between items-center text-center">
          <div className="text-grey text-sm">
            {t('layout.copyrights')}
          </div>
          <div className="text-grey text-sm my-4 md:my-0">
            {t('layout.terms')}
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
