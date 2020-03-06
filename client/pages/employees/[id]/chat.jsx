import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowPrevSvg, ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, Gallery, ChatList, ChatRoom, Loader } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import EmployeeClientChat from "components/chat/EmployeeClientChat";


const ClientChatComponent = ({ user, type = 'client' }) => {
  const router = useRouter();
  const { id } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);
  const {t, i18n} = useTranslation();

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  if (employeeLoading) {
    return <Loader/>;
  }

  const handleLightboxClick = index => {
    setLightboxIndex(index);
    toggleModalOpen(true);
  };

  const onClose = () => {
    setLightboxIndex(null);
    toggleModalOpen(false);
  };

  const sidebarColumn = (
    <>
      <Lightbox
        open={isModalOpen}
        index={lightboxIndex}
        onClose={onClose}
        images={employee.photos}
      />

      <Gallery
        photos={employee.photos}
        handleClick={handleLightboxClick}
        favorite={
          <FavoriteButton
            variables={{ model_id: employee.id, model_type: "employee" }}
            favorited={employee.favorited}
            large={true}
          />
        }
      >{t('chat.large')}</Gallery>
    </>
  );

  return (
    <EmployeeBox employee={employee} user={user} viewed={false}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="hidden w-full xl:block xl:w-3/12 px-3">
          <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
          {sidebarColumn}
        </div>

        <div className="w-full xl:w-9/12">
          <EmployeeClientChat user={user} employee={employee}/>
        </div>
      </div>
    </EmployeeBox>
  );
};

ClientChatComponent.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ClientChatComponent.getLayout = (page) => page;

export default ClientChatComponent;
