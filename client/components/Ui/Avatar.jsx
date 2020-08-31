import classNames from "classnames";
import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_ME, UPLOAD_USER_AVATAR} from "queries/userQuery";
import React from "react";
import {Loader} from 'UI';
import Router from "next/router";
import AddPhotoSvg from "components/icons/AddPhotoSvg";
import ProfileSvg from "components/icons/ProfileSvg";

function Avatar({ className, src, isEmpty }) {
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

  if (isEmpty) {
      return (

          <div className={`c-account__avatar-wrap c-account__avatar--empty`}>
            <label className="c-account__avatar-plus">
                <svg class="inline-block" style={{width: 30, fill: "#FF3366"}} focusable="false" viewBox="0 0 15 15" aria-hidden="true" role="presentation"><path d="M11.9498 9.05023C11.1873 8.28784 10.2799 7.72343 9.28974 7.38177C10.3502 6.65139 11.0469 5.42905 11.0469 4.04688C11.0469 1.81543 9.23144 0 7 0C4.76856 0 2.95312 1.81543 2.95312 4.04688C2.95312 5.42905 3.64982 6.65139 4.71029 7.38177C3.72017 7.72343 2.81269 8.28784 2.05026 9.05023C0.728137 10.3724 0 12.1302 0 14H1.09375C1.09375 10.7433 3.74328 8.09375 7 8.09375C10.2567 8.09375 12.9062 10.7433 12.9062 14H14C14 12.1302 13.2719 10.3724 11.9498 9.05023ZM7 7C5.37165 7 4.04688 5.67525 4.04688 4.04688C4.04688 2.4185 5.37165 1.09375 7 1.09375C8.62835 1.09375 9.95312 2.4185 9.95312 4.04688C9.95312 5.67525 8.62835 7 7 7Z" /></svg>
        </label>
          </div>
      )
  }

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
