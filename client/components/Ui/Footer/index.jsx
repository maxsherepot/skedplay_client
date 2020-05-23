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
import {useTranslation} from "react-i18next";
import Link from 'components/SlashedLink'
import React, {useState} from "react";
import ContactsPopup from "components/popups/ContactsPupup";
import ContactsCallbackSuccessPopup from "components/popups/ContactsCallbackSuccessPopup";
import { setCookie } from "utils";
import {CookiesBlock} from 'UI';
import redirect from "lib/redirect";
import Centrifugo from "components/centrifuge";
import {useApolloClient} from "@apollo/react-hooks";
import Content from "UI/Popup/Content";
import {useQuery} from "@apollo/react-hooks";
import Popup from "reactjs-popup";
import {GET_ME} from "queries/userQuery";
import * as moment from "moment";
import cx from 'classnames';

const HoveredComponent = ({children}) => {
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

const HoveredIcon = ({icon, text}) => {
  const Icon = icon;

  return (
    <HoveredComponent>
      {({hovered}) => {
        return (
          <div className="flex flex-col items-center justify-center">
            <div style={{height: !!text ? '33px' : 'inherit'}} className="flex items-center justify-center">
              <Icon color={hovered ? '#FF3366' : '#909090'}/>
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
    {icon: TwitterSvg, link: 'https://twitter.com/skedplay', text: 'Twitter'},
    {icon: InstagramSvg, link: 'https://www.instagram.com/skedplay.ch/', text: 'Instagram'},
    {icon: YoutubeSvg, link: 'https://www.youtube.com/channel/UCYS75jNy4n-NNAyp0eLlhfw/', text: 'Youtube'},
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <a
          href={icon.link}
          key={i}
          className={cx(
            "block ",
            i === 0 ? "xl:mr-5" : "xl:mx-5",
          )}
          target="_blank"
        >
          <HoveredIcon icon={icon.icon} text={icon.text}/>
        </a>
      ))}
    </>
  );
};

const FooterRightIcons = () => {
  const icons = [
    {icon: CardsSvg, text: 'Cards'},
    {icon: SmartphoneSvg, text: 'Phone'},
    {icon: PayPal1Svg, text: 'Paypal'},
    {icon: ApplePaySvg, text: 'Apple pay'},
    {icon: SofortSvg, text: 'Sofort'},
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <HoveredIcon key={i} icon={icon.icon} text={icon.text}/>
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

  const startYear = moment('2020').format( 'YYYY');
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

      <div className="container flex flex-col md:flex-row-reverse lg:justify-between w-full text-white my-6">
        <div className="flex flex-col justify-center text-center md:w-1/2 lg:w-1/3 xl:w-1/4">
          <ul className="flex items-center justify-around leading-loose text-lg">
            <li className="w-1/3">
              <Link href='/about'>
                <a className="text-white">
                  {t('layout.about')}
                </a>
              </Link>
            </li>
            {/* Only odd */}

            <ContactsPopup user={user} onSuccess={onSuccessContacts}/>
            <ContactsCallbackSuccessPopup user={user} open={contactsSuccessOpen} setOpen={setContactsSuccessOpen}/>

            <li className="w-1/3">
              <Link href={`/helpcenter`}>
                <a>
                  {t('layout.help_center')}
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:justify-center md:justify-between md:w-1/2 lg:w-1/3">
          {/*<Button size="xs" className="my-4 md:mr-4 md:w-40" outline>*/}
          {/*  {t('layout.create_site')}*/}
          {/*</Button>*/}
          {!user &&
            <Link href="/register">
              <Button size="xs" className="my-4 sm:w-40" outline>
                {t('layout.join_now')}
              </Button>
            </Link>
          }
        </div>
      </div>

      <div className="border-dark-grey border-b"/>

      <div className="container">
        <div className="container without-p w-full md:max-w-3/4 flex flex-col justify-between items-center lg:flex-row lg:max-w-full">

          <div className="w-full xl:w-1/4 flex justify-around xl:justify-start items-end my-6">
            <FooterLeftIcons/>
          </div>

          <div className="w-full xl:w-2/4 my-11 mt-2 inline-block h-full text-center">
            <div className="text-grey text-sm">
              {t('layout.copyright')} {dateYear} {t('layout.all_rights_reserved')}
            </div>

            <div className="text-grey text-sm">
              <a href="https://skidplay.tk/helpcenter/terms-of-use" className="hover:text-red">
                {t('layout.terms_conditions')}
              </a> & &nbsp;
              <a href="https://skidplay.tk/helpcenter/private-policy" className="hover:text-red">
                {t('layout.privacy_policy')}
              </a>
            </div>
          </div>

          <div className="w-full xl:w-1/4 my-6 inline-block flex justify-around">
            <FooterRightIcons/>
          </div>
        </div>
      </div>

      <CookiesBlock/>
    </div>
  );
};

export default Footer;
