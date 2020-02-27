import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";
import {useTranslation} from "react-i18next";

const ClubGirlsBox = ({ employees }) => {
  const router = useRouter();
  const { id } = router.query;
  const {t, i18n} = useTranslation();

  const rows = [];

  for (let i = 0; i < 4; i++) {
    const employee = employees[i];

    if (employee) {
      rows.push(
          <div className="sm:w-1/2 lg:w-1/4 px-3" key={employee.id}>
            <GirlCard girl={employee} labels={false} slider={false} available />
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
        <Link href="/clubs/[id]/girls" as={`/clubs/${id}/girls`}>
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">{t('common.all_girls')}</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <div className="girls flex flex-col sm:flex-row sm:justify-start sm:flex-wrap -mx-3">
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
