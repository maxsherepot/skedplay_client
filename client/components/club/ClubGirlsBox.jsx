import React from "react";
import Link from 'components/SlashedLink'
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";
import {useTranslation} from "react-i18next";

import Slider from "react-slick";
import cx from "classnames";

const ClubGirlsBox = ({ employees, club, user }) => {
  const router = useRouter();
  const { id } = router.query;
  const {t, i18n} = useTranslation();

  // const rows = [];
  //
  // for (let i = 0; i < 4; i++) {
  //   const employee = employees[i];
  //
  //   if (employee) {
  //     rows.push(
  //         <div className="sm:w-5/6 lg:w-3/12 md:w-6/12 girl_card__div" key={employee.id}>
  //           <GirlCard profileCard={true} girl={employee} labels={false} slider={false} available />
  //         </div>
  //     );
  //   }
  // }

  // const customPaging = i => (
  //   <span
  //     className={cx(
  //       "block cursor-pointer rounded-full w-2 h-2",
  //       index === i ? "bg-red" : "bg-divider"
  //     )}
  //   />
  // );

  const appendDots = dots => (
    <ul
      style={{
        width: "100%",
      }}
    >
      {dots}
    </ul>
  );

  const responsive = [
    {
      breakpoint: 1780,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1001,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        appendDots,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        appendDots,
        // customPaging
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots,
        // customPaging
      }
    }
  ];

  return (
    <>
      <div className="flex items-end my-5">
        <div className="text-2xl font-extrabold tracking-tighter leading-none">
          {t('common.our_girls')}
        </div>
        <Link
          href={`/clubs/canton/city/id/girls?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`}
          as={`/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/girls`}
        >
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">{t('common.all_girls')}</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <Slider
        className="-mx-3"
        arrows={false}
        slidesToShow={4}
        responsive={responsive}
        infinite={false}
      >
        {employees &&
        employees.map(employee => (
          <div
            key={employee.id}
            // className="sm:w-1/2 md:w-1/4 lg:w-1/12 hd:w-1/12 px-1 hd:px-3"
            className="md:px-2 sm:px-0"
          >
            <GirlCard profileCard={true} girl={employee} labels={false} slider={false} available user={user} />
          </div>
        ))}
      </Slider>
    </>
  );
};

ClubGirlsBox.defaultProps = {
  employees: []
};

ClubGirlsBox.propTypes = {
  employees: PropTypes.array
};

export default ClubGirlsBox;
