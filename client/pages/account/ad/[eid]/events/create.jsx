import React from "react";
import redirect from "lib/redirect";
import { EventForm } from "components/event";
import { getLayout } from "components/account/AccountLayout";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";

const AccountAdEventsCreate = () => {
    const router = useRouter();
    const { query: {eid}} = useRouter();
    // Attach in employee
    // account/employee/3/events/create

    const handleSubmits = async (
        values,
        {setSubmitting, setErrors}
    ) => {
        try {
            console.log(eid, values)
            // await onSubmit({
            //     variables: {
            //         club: cid,
            //         input: {
            //             ...values,
            //             club_id: cid,
            //         }
            //     }
            // });
            //
            // router.back();
        } catch (e) {
            // if (getErrors(e) instanceof Object) {
            //     setErrors(getErrors(e));
            // }
        }

        setSubmitting(false);
    };


    return (
        <>
            <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
                Create new event
            </div>

            <EventForm initialValues={{ title: "" }} onSubmit={handleSubmits} />
        </>
    );
};

AccountAdEventsCreate.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

AccountAdEventsCreate.getLayout = getLayout;

export default AccountAdEventsCreate;
