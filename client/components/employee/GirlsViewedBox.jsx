import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import Slider from "react-slick";
import cx from "classnames";

import { ALL_EMPLOYEES } from "queries";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";

const GirlsViewedBox = () => {
  const [index, setIndex] = useState(0);

  const { data, loading, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const appendDots = dots => (
    <ul
      style={{
        margin: "0",
        display: "flex",
        justifyContent: "space-around"
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
    {
      breakpoint: 1319,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 999,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false
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

  const renderRows = (entities, length, rowClass) => {
    const rows = [];

    for (var i = 0; i < length; i++) {
      const employee = entities[i];

      rows.push(
        <GirlCard
          key={employee.id}
          className={rowClass}
          girl={employee}
          labels={false}
          slider={false}
          preview
        />
      );
    }

    return rows;
  };

  return (
    <>
      <div className="flex items-end my-5">
        <div className="text-3xl font-extrabold tracking-tighter leading-none">
          Zuvor angesehen
        </div>
        <Link href="/girls">
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">All girls</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>

      <Slider
        className="-mx-2 hd:-mx-3 lg:hidden"
        arrows={false}
        responsive={responsive}
        beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
      >
        {data.employees &&
          data.employees.data.map(employee => (
            <div
              key={employee.id}
              className="sm:w-1/2 md:w-1/4 lg:w-1/12 hd:w-1/12 px-1 hd:px-3"
            >
              <GirlCard girl={employee} labels={false} slider={false} preview />
            </div>
          ))}
      </Slider>

      <div className="girls hd:hidden lg:flex flex-col sm:flex-row sm:justify-start -mx-3">
        {renderRows(data.employees.data, 5, "sm:w-1/2 md:w-1/5 lg:flex-1 px-3")}
      </div>

      <div className="girls hidden hd:flex justify-between">
        {renderRows(data.employees.data, 8, "w-38")}
      </div>
    </>
  );
};

GirlsViewedBox.propTypes = {};

export default GirlsViewedBox;
