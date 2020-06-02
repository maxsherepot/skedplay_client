import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import { Lightbox, Gallery, ChatList, Modal,  ChatRoom, Loader } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import {useTranslation} from "react-i18next";
import EmployeeClientChat from "components/chat/EmployeeClientChat";
import {LoginBox} from "components/login";
import LangSelector from "UI/LangSelector";
import {NextSeo} from "next-seo";

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

  if (employee.user_status === 2 || employee.status === 2) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
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

  const lastBreadcrumbs = [
    {
      label: t('employees.chat'),
    }
  ];

  return (
    <>
      <NextSeo
        title={employee.name + ' ' + t('employees.chat').toLowerCase()}
      />

      <EmployeeBox employee={employee} user={user} viewed={false} lastBreadcrumbs={lastBreadcrumbs}>
        <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
          <div className="hidden w-full xl:block xl:w-3/12 px-3">
            <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
            {sidebarColumn}
          </div>
          <div className="w-full xl:w-9/12">
            {!user ? (
              <div className="mt-1">
                <Modal
                  title={t('common.login')}
                  right={<LangSelector />}
                  modalDialogStyle={{height: '650px'}}
                >
                  <div className="mt-3 mb-2 bg-red p-3 w-2/3 text-center mx-auto">
                            <span className="text-white">
                              {t('chat.chat_available_for_authorized')}
                            </span>
                  </div>
                  <LoginBox />
                </Modal>
              </div>
            ) : (
              <EmployeeClientChat user={user} employee={employee}/>
            )}
          </div>
        </div>
      </EmployeeBox>
    </>
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
