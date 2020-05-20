import React from "react";
import Link from 'components/SlashedLink'
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";
import {useTranslation} from "react-i18next";
import slug from "slug";

const ClubGirlsBox = ({ employees, club }) => {
  const router = useRouter();
  const { id } = router.query;
  const {t, i18n} = useTranslation();

  const rows = [];

  for (let i = 0; i < 4; i++) {
    const employee = employees[i];

    if (employee) {
      rows.push(
          <div className="sm:w-5/6 lg:w-3/12 md:w-6/12 girl_card__div" key={employee.id}>
            <GirlCard profileCard={true} girl={employee} labels={false} slider={false} available />
          </div>
      );
    }
  }

  return (
    <>
      <div className="flex items-end my-5">
        <div className="text-2xl font-extrabold tracking-tighter leading-none">
          {t('common.our_girls')}
        </div>
        <Link
          href={`/clubs/canton/city/id/girls?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
          as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/girls`}
        >
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">{t('common.all_girls')}</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <div className="girls flex flex-col sm:flex-row sm:justify-start sm:flex-wrap w-full -mx-3">
        {rows}
      </div>
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
