import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, FormGroup, Checkbox } from "UI";
import { getErrors } from "utils";

const EditNotifications = ({ initialValues, onSubmit }) => {
  const handleSubmits = async (
    { news, comments, push },
    { setSubmitting, setErrors, setError, setStatus }
  ) => {
    try {
      console.log(news, comments, push);
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
              <Checkbox
                label="Service News"
                bottom="Subscribe news updates and changes in the service."
                name="news"
              />
            </div>

            <div className="px-1 mb-4">
              <Checkbox
                label="Comment Notifications"
                bottom="Notification of new comments in your profile."
                name="comments"
              />
            </div>

            <div className="px-1 mb-4">
              <Checkbox
                label="Push notifications"
                bottom="Notifications in the browser"
                name="push"
              />
            </div>

            <Button
              type="submit"
              className="px-8"
              size="sm"
              disabled={isSubmitting}
            >
              Save changes
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditNotifications;
