import Cookies from 'js-cookie';
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Button } from "UI";
import Link from 'components/SlashedLink'

const CookiesBlock = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(Cookies.get('cookies_allowed') === 'true');

  const { t } = useTranslation();

  if (typeof document === 'undefined') {
    return '';
  }

  const allowCookies = () => {
    setCookiesAllowed(true);

    Cookies.set('cookies_allowed', 'true', { expires: 365 })
  };

  if (cookiesAllowed) {
    return '';
  }

  return (
    <div className="fixed bottom-0 py-10 px-4 items-center bg-light-grey-transparent w-full flex justify-center text-light-grey z-10" style={{ backgroundColor: "rgba(27,27,27,.9)" }}>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center">
        <div style={{ maxWidth: 550 }}>
          <Trans i18nKey="cookies.text">
            This site uses cookies to offer you a better browsing experience. Find out more on&nbsp;
                <a href="/helpcenter/privacy-policy/" className="underline">how we use cookies</a>&nbsp;
            and&nbsp;
                <a href="/helpcenter/terms-and-conditions/" className="underline">how you can change your settings</a>.
              </Trans>
        </div>
        <div className="w-full sm:w-auto flex justify-end">
          <div className="w-full mt-1 mr-5" style={{ minWidth: 120, maxWidth: 120 }}>
            <Button className="ml-4 px-2 text-light-grey1 w-full" level="primary" size="sm" onClick={allowCookies}>
              {t('common.okay')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesBlock;
