import classNames from "classnames";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {GET_ME} from "queries/userQuery";
import React from "react";
import {Loader} from 'UI';

function Avatar({ className, src }) {
  const {
    data: { me } = {},
    loading
  } = useQuery(GET_ME);

  if (loading) {
    return <Loader/>;
  }

  return (
      <>
      {me.avatar ? <img className={classNames(className, "rounded-full w-1/4")} src={me.avatar.url}/> :
          <img className={classNames(className, "rounded-full")} src={src}/>}
      </>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string
};

export default Avatar;
