import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EventsGallery, Loader } from "UI";
import Link from 'components/SlashedLink'
import React from "react";
import {useTranslation} from "react-i18next";
import {ArrowNextSvg} from 'icons';

const GET_EVENTS = gql`
  {
    events(first: 5, filters: {status: 1, user_status: 1}) {
      data {
        id
        title
        short_title
        city {
          id
          name
          canton {
              id
              name
          }
        }
        status
        user_status
        photos {
          id
          thumb_url
        }
        type {
          id
          name
        }
        club {
          address
          city {
              id
              name
              canton {
                  id
                  name
              }
          }
        }
      }
    }
  }
`;

function EventsBox() {
  const {t, i18n} = useTranslation();
  const { loading, error, data: { events } = {} } = useQuery(GET_EVENTS);

  if (loading) return <Loader/>;
  if (error) return <div>{error.message}</div>;

  if (!events || !events.data.length) {
    return '';
  }

  return (
    <div className="relative md:mt-2 xl:flex xl:self-end xl:mb-6 xl:mt-2 xl:flex-col xl:ml-10 hd:ml-42">
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
