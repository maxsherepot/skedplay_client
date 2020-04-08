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
import React, {useState} from "react";
import ContactsPopup from "components/popups/ContactsPupup";
import { setCookie } from "utils";
import {CookiesBlock} from 'UI';
import redirect from "lib/redirect";
import Centrifugo from "components/centrifuge";
import {useApolloClient} from "@apollo/react-hooks";
import Content from "UI/Popup/Content";
import {useQuery} from "@apollo/react-hooks";
import Popup from "reactjs-popup";
import {GET_ME} from "queries/userQuery";

function Footer({ user }) {
  const { t, i18n } = useTranslation();
  const client = useApolloClient();
  const {
    data: { me } = {},
    loading
  } = useQuery(GET_ME);
  const [banPopupShow, setBanPopupShow] = useState(false);

  const signOut = () => {
    setCookie("token", "", {
      "max-age": -1
    });

    setBanPopupShow(false);

    client.clearStore().then(() => redirect({}, "/"));
  };

  if (user) {
    Centrifugo.init().then(centrifuge => {
      const channel = 'user_status:' + user.id;

      if (centrifuge.getSub(channel)) {
        return;
      }

      centrifuge.subscribe(channel, data => {
        if (data.data.status === 'rejected') {
          console.log(data.data.status);
          setBanPopupShow(true);
        }
      });
    });
  }

  return (
    <div className="footer flex flex-col bg-black">
      <Popup
          modal
          closeOnDocumentClick
          onClose={signOut}
          open={banPopupShow}
          contentStyle={{
            width: "100%",
            maxWidth: "600px",
          }}
      >
        <Content
            title={t('account.account_rejected')}
            close={signOut}>
          <h3 className="mt-3">{t('account.reason')}: {me && me.rejected_reason ? me.rejected_reason : ''} </h3>
        </Content>
      </Popup>
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
      <div className="row footer-sides__div">
      <div className="my-11 mt-2 inline-block h-full ml-2">
        <div className="text-grey text-sm">
          <a href="https://skidplay.tk/helpcenter/terms-of-use">
            {t('layout.terms_conditions')}
          </a> &
          <a href="https://skidplay.tk/helpcenter/private-policy">
            {t('layout.privacy_policy')}
          </a>
        </div>
        <div className="text-grey text-sm">
          {t('layout.copyrights')}
        </div>
      </div>
      <div className="my-6 inline-block">
        <div className="fluid-container flex flex-col-reverse lg:flex-row md:justify-between items-center text-center">
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
    </div>
  );
};

export default Footer;
