import { Button } from "UI";
import {
  CardsSvg,
  ApplePaySvg,
  InstagramSvg,
  PayPal1Svg,
  SmartphoneSvg,
  TwitterSvg,
  YoutubeSvg,
  SofortSvg,
} from "icons";
import { useTranslation } from "react-i18next";
import Link from 'components/SlashedLink'
import React, { useState } from "react";
import ContactsPopup from "components/popups/ContactsPupup";
import ContactsCallbackSuccessPopup from "components/popups/ContactsCallbackSuccessPopup";
import { setCookie } from "utils";
import { CookiesBlock } from 'UI';
import redirect from "lib/redirect";
import Centrifugo from "components/centrifuge";
import { useApolloClient } from "@apollo/react-hooks";
import Content from "UI/Popup/Content";
import { useQuery } from "@apollo/react-hooks";
import Popup from "reactjs-popup";
import { GET_ME } from "queries/userQuery";
import * as moment from "moment";
import cx from 'classnames';

const HoveredComponent = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  const childrenArray = React.Children.map(children, child => {
    return React.cloneElement(child, {
      hovered
    });
  });

  const Children = children;

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {typeof children === 'function' ? <Children hovered={hovered} /> : childrenArray}
    </div>
  );
};

const HoveredIcon = ({ icon, text, className }) => {
  const Icon = icon;

  return (
    <HoveredComponent>
      {({ hovered }) => {
        return (
          <div className={cx("flex flex-col items-center justify-center", className)}>
            <div style={{ height: !!text ? '33px' : 'inherit' }}
              className="flex items-center justify-center">
              <Icon color={hovered ? '#FF3366' : '#909090'} />
            </div>

            {!!text &&
              <span className={cx(
                "block text-sm mt-2",
                hovered ? "text-red" : "text-grey"
              )}>
                {text}
              </span>
            }
          </div>
        );
      }}
    </HoveredComponent>
  );
};

const FooterLeftIcons = () => {
  const icons = [
    { icon: TwitterSvg, link: 'https://twitter.com/skedplay', text: 'Twitter' },
    { icon: InstagramSvg, link: 'https://www.instagram.com/skedplay.ch/', text: 'Instagram' },
    { icon: YoutubeSvg, link: 'https://www.youtube.com/channel/UCYS75jNy4n-NNAyp0eLlhfw/', text: 'Youtube' },
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <a
          href={icon.link}
          key={i}
          className={cx(
            "block ",
            i === 0 ? "lg:mr-5" : "lg:mx-5",
          )}
          target="_blank"
        >
          <HoveredIcon icon={icon.icon} text={icon.text} />
        </a>
      ))}
    </>
  );
};
const FooterRightIcons = () => {
  const icons = [
    { icon: CardsSvg, text: 'Cards' },
    { icon: SmartphoneSvg, text: 'Phone' },
    { icon: PayPal1Svg, text: 'Paypal' },
    { icon: ApplePaySvg, text: 'Apple pay' },
    { icon: SofortSvg, text: 'Sofort' },
  ];
  return (
    <>
      {icons.map((icon, i) => (
        <HoveredIcon key={i} icon={icon.icon} text={icon.text} className="mr-2" />
      ))}
    </>
  );
};

function Footer({ user }) {
  const { t, i18n } = useTranslation();
  const client = useApolloClient();
  const {
    data: { me } = {},
    loading
  } = useQuery(GET_ME);
  const [banPopupShow, setBanPopupShow] = useState(false);
  const [contactsSuccessOpen, setContactsSuccessOpen] = useState(false);
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
      if (!centrifuge) {
        return;
      }
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
  const startYear = moment(new Date('2020')).format('YYYY');
  let currentYear = moment().format('YYYY');
  let dateYear = currentYear > startYear ? startYear + " - " + currentYear : startYear;
  const onSuccessContacts = () => {
    setContactsSuccessOpen(true);
  };
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

      <div className="container no-scale flex flex-col md:flex-row-reverse lg:justify-between w-full text-white my-6 lg:my-4 box">

        <div className="flex flex-col justify-center text-center links-footer__div ">
          <ul className="flex items-center justify-around leading-loose links-footer__div-full text-lg">
            <li className="mr-8 scale">
              <Link href='/about'>
                <a className="text-white">
                  {t('layout.about')}
                </a>
              </Link>
            </li>
            {/* Only odd */}
            <ContactsPopup className="mr-8 scale" user={user} onSuccess={onSuccessContacts} />
            <ContactsCallbackSuccessPopup user={user} open={contactsSuccessOpen} setOpen={setContactsSuccessOpen} />
            <li className="scale">
              <Link href={`/helpcenter`}>
                <a>
                  {t('layout.help_center')}
                </a>
              </Link>
            </li>
          </ul>
        </div>


        <div className="w-full flex flex-col sm:flex-row sm:justify-center md:justify-between md:w-1/2 lg:w-1/3 ">
          {/*<Button size="xs" className="my-4 md:mr-4 md:w-40" outline>*/}
          {/*  {t('layout.create_site')}*/}
          {/*</Button>*/}
          {!user &&
            <Link href="/register">
              <Button size="xs" className="my-4 px-4 btn-footer__div" outline>
                {t('layout.join_now')}
              </Button>
            </Link>
          }
        </div>
      </div>
      
      
      <div className="border-dark-grey border-b" />




      <div className="container w-full pl-10 pr-10">
        <div className="without-p w-full flex flex-col justify-between items-center lg:flex-row lg:max-w-full">
          
          <div className="w-full lg:w-1/4 flex justify-between lg:justify-start items-end my-6">
            <FooterLeftIcons />
          </div>

          <div className="text-xs md:text-sm w-2/3 lg:w-2/4 my-11 mt-2 inline-block h-full text-center">
            <div className="text-grey">
              {t('layout.copyright')} {dateYear} {t('layout.all_rights_reserved')}
            </div>

            <div className="text-grey">
              <a href="/helpcenter/terms-and-conditions/" className="hover:text-red">
                {t('layout.terms_conditions')}
              </a> & &nbsp;
              <a href="/helpcenter/privacy-policy/" className="hover:text-red">
                {t('layout.privacy_policy')}
              </a>
            </div>
          </div>
          {/* <div className="w-full lg:w-1/4 my-6 inline-block flex justify-around">
            <FooterRightIcons />
          </div> */}

          <div className="hidden md:flex w-full lg:w-1/4 my-6 inline-block justify-around lg:-mr-4 hd:-mr-6">
            <FooterRightIcons />
          </div>
        </div>
      </div>
      <CookiesBlock />
    </div>
  );
};
export default Footer;