import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { ArrowPrevSvg, ArrowNextSvg } from "icons";
import {useTranslation} from "react-i18next";

function Pagination({ page, setPage, total, lastPage }) {
  const {t, i18n} = useTranslation();

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const handleChange = ({ selected }) => {
    let current = selected + 1;
    if (page !== current) {
      setPage(current);
    }
  };

  return (
    <div className="flex items-center justify-center my-5">
      <div className="flex items-center cursor-pointer" onClick={prev}>
        <ArrowPrevSvg disabled={page <= 1}>
          <span className="mx-1 lg:mx-3">{t('common.prev')}</span>
        </ArrowPrevSvg>
      </div>
      <ReactPaginate
        forcePage={page - 1}
        breakLabel={"..."}
        pageCount={lastPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handleChange}
        previousClassName="hidden"
        nextClassName="hidden"
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <div className="flex items-center cursor-pointer" onClick={next}>
        <ArrowNextSvg disabled={page >= lastPage}>
          <span className="mx-1 lg:mx-3">{t('common.next')}</span>
        </ArrowNextSvg>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired
};

export default Pagination;
