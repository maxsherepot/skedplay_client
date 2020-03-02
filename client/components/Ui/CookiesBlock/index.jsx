import Cookies from 'js-cookie';
import {useState} from "react";
import {useTranslation, Trans} from "react-i18next";
import {Button} from "UI";
import Link from "next/link";

const CookiesBlock = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(Cookies.get('cookies_allowed') === 'true');

  const {t} = useTranslation();

  const allowCookies = () => {
    setCookiesAllowed(true);

    Cookies.set('cookies_allowed', 'true', { expires: 365 })
  };

  if (cookiesAllowed) {
    return '';
  }

  return (
    <div className="fixed bottom-0 py-10 px-4 items-center bg-light-grey-transparent w-full flex justify-center text-light-grey z-10">
      <div className="text-center">
        <Trans i18nKey="cookies.text">
          This site uses cookies to offer you a better browsing experience. Find out more on&nbsp;
          <a href="#" className="underline">how we use cookies</a>&nbsp;
          and&nbsp;
          <a href="#" className="underline">how you can change your settings</a>.
        </Trans>
        <Button className="ml-4 px-2 text-light-grey" size="sm" outline onClick={allowCookies}>
          {t('common.okay')}
        </Button>
      </div>
    </div>
  );
};

export default CookiesBlock;
