import { EventsGallery, Loader } from "UI";
import Link from 'components/SlashedLink'
import React from "react";
import {useTranslation} from "react-i18next";
import {ArrowNextSvg} from 'icons';

function EventsBox({events}) {
  const {t, i18n} = useTranslation();

  if (!events || !events.data.length) {
    return '';
  }

  return (
    <div className="relative md:mt-2 lg:flex lg:self-end lg:mb-6 lg:mt-2 lg:flex-col lg:ml-10 hd:ml-42">
      <div className="flex text-white items-end leading-none">
        <div className="text-4xl font-extrabold tracking-tighter">
          {t('index.fresh_events')}
        </div>
        <Link href="/events">
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">{t('common.all_events')}</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <div className="mt-7">
        <EventsGallery events={events.data} />
      </div>
    </div>
  );
}

export default EventsBox;
