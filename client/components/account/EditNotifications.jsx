import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, FormGroup, CheckboxField } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";

const EditNotifications = ({ initialValues, onSubmit }) => {
  const {t, i18n} = useTranslation();

  const handleSubmits = async (
    { news, comments, push },
    { setSubmitting, setErrors, setError, setStatus }
  ) => {
    try {
      // console.log(news, comments, push);
      // const { data: { updateUser } = {} } = await onSubmit({
      //   variables: {
      //     user: initialValues.id,
      //     input: {
      //       news,
      //       comments,
      //       push
      //     }
      //   }
      // });
      // if (updateUser && updateUser.status) {
      //   setStatus(updateUser.message);
      // } else {
      //   setError(updateUser.message);
      // }
    } catch (e) {
      // if (getErrors(e) instanceof Object) {
      //   setErrors(getErrors(e));
      // }
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        news: Yup.string(),
        comments: Yup.string(),
        push: Yup.string()
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}
            <div className="px-1 mb-4">
              <CheckboxField
                label={t('account.service_news')}
                bottom={t('account.subscribe_news_updates_and_changes')}
                name="news"
              />
            </div>

            <div className="px-1 mb-4">
              <CheckboxField
                label={t('account.comment_notifications')}
                bottom={t('account.notification_new_comments_in_your_profile')}
                name="comments"
              />
            </div>

            <div className="px-1 mb-4">
              <CheckboxField
                label={t('account.push_notifications')}
                bottom={t('account.notifications_in_browser')}
                name="push"
              />
            </div>

            <Button
              type="submit"
              className="px-8"
              size="sm"
              disabled={isSubmitting}
            >
              {t('account.save_changes')}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditNotifications;
