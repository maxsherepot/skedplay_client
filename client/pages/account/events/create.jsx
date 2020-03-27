import React from "react";
import redirect from "lib/redirect";
import {EventForm} from "components/event";
import {getLayout} from "components/account/AccountLayout";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";
import {getErrors} from "utils";
import {
  CREATE_EMPLOYEE_EVENT,
  GET_MY_EMPLOYEE_EVENTS_COUNT,
  EVENTS_BY_OWNER,
} from "queries";
import {useMutation} from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";

const AccountEventsCreate = ({user}) => {
  const router = useRouter();
  const [createUserEvent] = useMutation(CREATE_EMPLOYEE_EVENT, {
    refetchQueries: [
      {
        query: GET_MY_EMPLOYEE_EVENTS_COUNT,
      }
    ]
  });
  const {t, i18n} = useTranslation();

  const handleSubmits = async (
    values,
    {setSubmitting, setErrors}
  ) => {
    values.days = (values.days || [])
      .map((checked, day) => checked ? day : null)
      .filter(day => day !== null);

    try {
      await createUserEvent({
        variables: {
          employee: user.employee.id,
          input: values,
        }
      });

      router.back();
    } catch (e) {
      if (getErrors(e) instanceof Object) {
        setErrors(getErrors(e));
      }
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="text-4xl font-extrabold tracking-tighter leading-none mb-5">
        {t('account.create_event')}
      </div>

      <EventForm
        initialValues={{
          title: "",
          event_type_id: "",
          description: "",
          mode: "1",
          address: "",
          start_date: "",
          end_date: "",
          start_time: "",
          days: [],
          employees_ids: [],
          club_id: null,
          photos: [],
          price: null,
        }}
        onSubmit={handleSubmits}
      />
    </>
  );
};

AccountEventsCreate.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return {user};
};

AccountEventsCreate.getLayout = getLayout;

export default AccountEventsCreate;
