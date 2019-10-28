import React from "react";
import {getErrors} from "utils";
import {EventForm} from "components/event";
import {useRouter} from "next/router";

const CreateEventBox = ({ initialValues, onSubmit}) => {
    const router = useRouter();
    const { query: {cid}} = useRouter();

    const handleSubmits = async (
        values,
        {setSubmitting, setErrors}
    ) => {
        try {
            await onSubmit({
                variables: {
                    club: cid,
                    input: {
                        ...values,
                        club_id: cid,
                    }
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
        <EventForm initialValues={initialValues} onSubmit={handleSubmits} />
    );
};

export default CreateEventBox;
