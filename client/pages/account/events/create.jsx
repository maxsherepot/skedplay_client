import React from "react";
import redirect from "lib/redirect";
import { EventForm } from "components/event";
import { getLayout } from "components/account/AccountLayout";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";
import {getErrors} from "utils";
import {
    CREATE_EMPLOYEE_EVENT,
} from "queries";
import {useMutation} from "@apollo/react-hooks";

const AccountEventsCreate = ({ user }) => {
    const router = useRouter();
    const [createUserEvent] = useMutation(CREATE_EMPLOYEE_EVENT);

    const handleSubmits = async (
        values,
        {setSubmitting, setErrors}
    ) => {
        try {
            await createUserEvent({
                variables: {
                    employee: user.id,
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
            <div className="text-2xl font-extrabold tracking-tighter leading-none mb-5">
                Create new event
            </div>

            <EventForm initialValues={{ title: "", event_type_id: "", description: "", club_id: null }} onSubmit={handleSubmits} />
        </>
    );
};

AccountEventsCreate.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

AccountEventsCreate.getLayout = getLayout;

export default AccountEventsCreate;
