import {Footer, Loader} from "UI";
import checkLoggedIn from "lib/checkLoggedIn";
import About from 'components/about';
import {useQuery} from "@apollo/react-hooks";
import React from "react";
import {GET_PAGE} from 'queries';
import translation from "services/translation";
import { NextSeo } from 'next-seo';
import {useTranslation} from "react-i18next";

const AboutPage = ({ user }) => {
  const {i18n} = useTranslation();

  const { data: { page } = {}, loading} = useQuery(GET_PAGE, {
    variables: {
      key: 'about'
    }
  });

  if (loading) {
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

      <About user={user}/>
      <Footer user={user}/>
    </>
  );
};

AboutPage.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return [];
  }
  return {user};
};

AboutPage.getLayout = (page) => page;

export default AboutPage;
