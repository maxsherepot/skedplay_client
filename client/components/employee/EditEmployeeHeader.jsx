import {useRouter} from "next/router";
import {useMutation} from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import React from "react";
import {getErrors} from "utils/index";
import SelectClub from "components/account/SelectClub";
import {
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPLOAD_EMPLOYEE_FILES,
} from "queries";
import {Button, DeletePopup} from "UI";
import {ChangePhotoSvg} from 'icons';
import cx from 'classnames';

const EditEmployeeHeader = ({user, employee, refetchEmployee, classes}) => {
  const router = useRouter();
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [uploadEmployeeFiles] = useMutation(UPLOAD_EMPLOYEE_FILES);
  const {t, i18n} = useTranslation();

  const avatarRef = React.createRef();

  const handleUploadAvatar = async values => {
    try {
      const {
        data: {
          uploadEmployeeFiles: { status: statusAvatar, message: messageAvatar }
        }
      } = await uploadEmployeeFiles({
        variables: {
          employee: employee.id,
          collection: "avatar",
          files: avatarRef.current.files
        }
      });

      if (refetchEmployee) {
        refetchEmployee();
      }

      return {
        status: statusAvatar,
        message: messageAvatar
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const handleDelete = () => {
    try {
      deleteEmployee({
        variables: {
          employee: employee.id
        }
      });

      router.back();
    } catch (e) {
      return {
        status: false,
        message: t('errors.server_error')
      };
    }
  };

  const handleAddToGeneral = async () => {
    try {
      const {
        data: {
          updateEmployee: {status, message}
        }
      } = await updateEmployee( {
        variables: {
          employee: employee.id,
          input: {
            inGeneral: !employee.inGeneral,
          }
        }
      });

      if (status) {
        router.reload();
      }
      return {
        status,
        message
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const handleIsVip = async () => {
    try {
      const {
        data: {
          updateEmployee: {status, message}
        }
      } = await updateEmployee( {
        variables: {
          employee: employee.id,
          input: {
            isVip: !employee.isVip,
          }
        }
      });

      if (status) {
        router.reload();
      }
      return {
        status,
        message
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const handleToggleActive = async () => {
    try {
      const {
        data: {
          updateEmployee: {status, message}
        }
      } = await updateEmployee( {
        variables: {
          employee: employee.id,
          input: {
            active: !employee.active,
          }
        }
      });

      if (refetchEmployee) {
        refetchEmployee();
      }

      return {
        status,
        message
      };
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
    <div className={cx(classes)}>
      <div className="relative">
        <input
          className="hidden"
          type="file"
          ref={avatarRef}
          onChange={handleUploadAvatar}
        />
        {employee.avatar ?
          <img
            className="w-30 h-30 rounded-full object-cover"
            src={employee.avatar && employee.avatar.url}
            alt={employee.name}
          />
          :
          <div
            className="w-30 h-30 rounded-full object-cover bg-light-grey"
          />
        }
        <div className="absolute left-0 top-0 cursor-pointer" onClick={() => avatarRef.current.click()}>
          <ChangePhotoSvg/>
        </div>
        {employee.isVip && (
          <div className="absolute bottom-0 left-0 w-full">
            <div className="-mb-0-35 mx-auto bg-red rounded-full w-12 text-center text-white">
              {t('status.vip')}
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="flex w-full items-end -mx-2">
          <div className="flex flex-col flex-1 px-2">
            <div className="text-4xl font-extrabold whitespace-no-wrap">{employee.name}</div>
            <div className="flex items-center text-grey my-2">
              <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"/>
              <div className="flex items-center">05.06-07.06</div>
            </div>

            <div className="flex items-center">
              <SelectClub className="w-40" owner={employee.owner}/>

              <div className="mx-4">{t('account.count_views', {count: 1234})}</div>

              <div className="text-grey">{t('account.day_left', {days: 5})}</div>
            </div>
          </div>

          <div className="flex justify-between flex-col h-full px-2">
            {!user.is_employee &&
              <Button onClick={handleIsVip} className="px-3 mb-3" level="primary" outline size="xxs">
                {employee.isVip ? (
                  <span className="text-black">{t('account.cancel_vip')}</span>
                ) : (
                  <span className="text-black">{t('account.make_vip')}</span>
                )}
              </Button>
            }
            <Button
              onClick={handleToggleActive}
              className="px-3 mb-3"
              level="primary"
              outline
              size="xxs"
            >
              <span className="text-black">
                {employee.active ? t('account.deactivate') : t('account.activate')}
              </span>
            </Button>

            {employee.isVip && (
              <Button onClick={handleAddToGeneral} className="px-3 mb-3" level="primary" outline size="xxs">
                {employee.inGeneral ? (
                  <span className="text-black">
                    {t('account.only_for_exist_user')}
                  </span>
                ) : (
                  <span className="text-black">
                    {t('account.available_for_all')}
                  </span>
                )}
              </Button>
            )}
            {!user.is_employee &&
              <DeletePopup onEnter={handleDelete} title={`${t('act.delete')} ${employee.name}?`}>
                <div className="pt-6">
                  <p>{t('account.sure_delete_card')}</p>
                </div>
              </DeletePopup>
            }
          </div>
        </div>
      </div>
    </div>
  )
};

EditEmployeeHeader.defaultProps = {
  classes: "flex items-center flex-wrap justify-center xl:flex-no-wrap xl:justify-between border border-divider p-3 mx-8 mt-6 rounded-lg"
};

export default EditEmployeeHeader;