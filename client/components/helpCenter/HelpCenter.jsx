import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {Loader, PageCard} from "UI";
import {getLayout as getMainLayout} from 'layouts'
import {AccountLabel} from "components/account";
import {AddSvg, ChevronDownSvg, ChevronRightSvg} from "icons";
import {useQuery} from "@apollo/react-hooks";
import {HELP_CENTER_CATEGORIES} from 'queries';
import {useTranslation} from "react-i18next";
import cx from 'classnames';

function getLangField(field, lang) {
  field = JSON.parse(field);

  if (!field[lang]) {
    return field.en;
  }

  return field[lang];
}

const CategoryItem = ({category, topicSlug, first}) => {
  function isHasTopic() {
    if (!topicSlug) {
      return false;
    }

    for (let i in category.topics) {
      if (category.topics[i].slug === topicSlug) {
        return true;
      }
    }

    return false;
  }

  const hasTopic = isHasTopic();

  const {t, i18n} = useTranslation();
  const [open, setOpen] = useState(first || hasTopic || false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const getPrefix = () => {
    return (
      <div
        className={cx([
          'inline-block transition',
        ])}
        style={{
          transform: !open ? 'none' : 'rotate(-90deg)'
        }}
      >
        <ChevronDownSvg/>
      </div>
    );
  };

  return (
    <div>
      <span
        className="flex items-center text-xl font-medium px-0 py-2 hover:cursor-pointer"
        onClick={toggleOpen}
      >
        {getPrefix()}
        <span className="truncate ml-3">{getLangField(category.name, i18n.language)}</span>
      </span>

      <ul
        className={cx([
          "transition overflow-hidden w-full text-lg text-red font-medium leading-loose ml-8",
        ])}
        style={{
          height: open ? `${category.topics.length * 34}px` : '0',
        }}
      >
        {(category.topics || []).map(topic => (
          <li
            className={cx([
              topicSlug === topic.slug ? "text-black border border-red border-l-0 border-t-0 border-b-0" : ""
            ])}
            style={{
              marginRight: 'calc(2rem - 1px)',
            }}
            key={topic.id}
          >
            {topic.hyphen === 1 &&
              <span className="text-black mr-2">
                -
              </span>
            }
            <Link as={`/helpcenter/${topic.slug}`} href={`/helpcenter/[topic]`}>
              <a>
                {getLangField(topic.name, i18n.language)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Sidebar = ({categories, topicSlug}) => {
  const {t, i18n} = useTranslation();


  return (
    <div className="flex lg:flex-1 justify-end w-auto border-divider border-b lg:border-r">
      <div className="flex flex-col py-10" style={{minWidth: '14rem'}}>
        {categories.map((category, i) => (
          <CategoryItem category={category} first={i === 0} key={category.id} topicSlug={topicSlug}/>
        ))}
      </div>
    </div>
  );
};

const HelpCenter = ({contentClass, user, className, topicSlug}) => {
  const {t, i18n} = useTranslation();

  const getClass = () => {
    if (className) return className;
    if (contentClass) return contentClass;

    return "lg:w-3/5 lg:ml-10 px-8 py-12";
  };

  const {data: {helpCenterCategories} = {}, loading} = useQuery(HELP_CENTER_CATEGORIES);

  if (loading) {
    return <Loader/>
  }

  let selectedTopic = null;

  if (topicSlug) {
    for (let i in helpCenterCategories) {
      for (let k in helpCenterCategories[i].topics) {
        if (helpCenterCategories[i].topics[k].slug === topicSlug) {
          selectedTopic = helpCenterCategories[i].topics[k];
        }
      }
    }
  }

  return (
    <>
      <PageCard className="my-10">
        <div className="flex flex-col lg:flex-row justify-between">
          <Sidebar categories={helpCenterCategories} topicSlug={topicSlug}/>
          <div className={getClass()}>
            {selectedTopic ?
              <>
                <div className="text-4xl font-extrabold tracking-tighter leading-none mb-5">
                  {getLangField(selectedTopic.name, i18n.language)}
                </div>
                <div dangerouslySetInnerHTML={{__html: getLangField(selectedTopic.content_html, i18n.language)}} />
              </>
              :
              <div className="text-4xl font-extrabold tracking-tighter leading-none mb-5">
                {t('layout.help_center')}
              </div>
            }
          </div>
        </div>
      </PageCard>
    </>
  );
};

export default HelpCenter;
