import HelpCenter from "components/helpCenter/HelpCenter";
import checkLoggedIn from "lib/checkLoggedIn";
import translation from "services/translation";
import { NextSeo } from 'next-seo';
import {useQuery} from "@apollo/react-hooks";
import {Loader} from 'UI';
import React from "react";
import {GET_PAGE} from 'queries';
import {useTranslation} from "react-i18next";

const HelpCenterPage = () => {
  const {i18n} = useTranslation();

  const { data: { page } = {}, loading: pageLoading} = useQuery(GET_PAGE, {
    variables: {
      key: 'help-center'
    }
  });

  if (pageLoading) {
    return <Loader/>
  }

  return (
    <>
      <NextSeo
        title={translation.getLangField(page.title, i18n.language)}
        description={translation.getLangField(page.description, i18n.language)}

        additionalMetaTags={[{
          name: 'keywords',
          content: translation.getLangField(page.keywords, i18n.language)
        }]}
      />

      <HelpCenter header={translation.getLangField(page.header, i18n.language)} page={page}/>
    </>
  );
};

HelpCenterPage.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }
  return { user };
};

export default HelpCenterPage;