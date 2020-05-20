import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from 'components/SlashedLink'
import Slider from "react-slick";
import cx from "classnames";
import {useTranslation} from "react-i18next";

import { ArrowNextSvg } from "icons";
import { GirlCard, Loader } from "UI";

const GirlsViewedBox = ({employees}) => {
  const [index, setIndex] = useState(0);
  const {t, i18n} = useTranslation();

  if (!employees) {
    employees = [];
  }

  const appendDots = dots => (
    <ul
      style={{
        // margin: "0",
        // display: "flex",
        // justifyContent: "space-around"
      }}
    >
      {dots}
    </ul>
  );
  const customPaging = i => (
    <span
      className={cx(
        "block cursor-pointer rounded-full w-2 h-2",
        index === i ? "bg-red" : "bg-divider"
      )}
    />
  );

  const responsive = [
    // {
    //   breakpoint: 2800,
    //   settings: {
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //   }
    // },
    {
      breakpoint: 999,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        appendDots,
        customPaging
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots,
        customPaging
      }
    }
  ];

  return (
    <>
      <div className="flex items-end my-5">
        <div className="text-3xl font-extrabold tracking-tighter leading-none">
          {t('employees.previously_viewed')}
        </div>
        <Link href="/girls">
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">{t('common.all_girls')}</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>

      <Slider
        className="-mx-2 mb-5"
        arrows={false}
        responsive={responsive}
        beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
        infinite={false}
      >
        {employees &&
          employees.map(employee => (
            <div
              key={employee.id}
              // className="sm:w-1/2 md:w-1/4 lg:w-1/12 hd:w-1/12 px-1 hd:px-3"
            >
              <GirlCard girl={employee} labels={false} slider={false} preview sized={false} viewed={true} />
            </div>
          ))}
      </Slider>

      {/*<div className="girls hidden lg:flex hd:hidden -mx-3">*/}
      {/*  {renderRows(employees, 5, "lg:flex-1")}*/}
      {/*</div>*/}

      {/*<div className="girls hidden hd:flex justify-between -mx-3">*/}
      {/*  {renderRows(employees, 8, "w-38")}*/}
      {/*</div>*/}
    </>
  );
};

GirlsViewedBox.propTypes = {};

export default GirlsViewedBox;
