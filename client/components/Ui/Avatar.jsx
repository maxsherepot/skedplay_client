import classNames from "classnames";
import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_ME, UPLOAD_USER_AVATAR} from "queries/userQuery";
import React from "react";
import {Loader} from 'UI';
import Router from "next/router";
import AddPhotoSvg from "components/icons/AddPhotoSvg";

function Avatar({ className, src }) {
  const [uploadUserAvatar] = useMutation(UPLOAD_USER_AVATAR);
  const { data: { me } = {},  loading } = useQuery(GET_ME);

  if (loading) {
    return <Loader/>;
  }

  const handleChange = async fileEvent => {
    try {
      const [avatar] = fileEvent.target.files;

      await uploadUserAvatar({
        variables: {
          avatar: avatar,
          collection: 'user-avatar'
        },
      });

      Router.reload();

    } catch (e) {
      const errors = getErrors(e);
      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  return (
      <>
        {src ? (
            <div className={classNames("c-account__avatar-wrap",className)}>
              <img className="c-account__avatar" src={src}/>
            </div>
        ) : (
            <div className={`c-account__avatar-wrap ${me && me.avatar ? '' : 'c-account__avatar--empty'}`}>
              {me && me.avatar ? <img className="c-account__avatar" src={me.avatar.url}/> : '' }
              <label htmlFor="fileUpload" className="c-account__avatar-plus">
                <AddPhotoSvg/>
              </label>
              <input className="c-account__avatar-input" type="file" id="fileUpload" onChange={handleChange}/>
            </div>
        )}

      </>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string
};

export default Avatar;
