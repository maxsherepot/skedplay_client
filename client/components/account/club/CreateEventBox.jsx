import React from "react";
import {getErrors} from "utils";
import {EventForm} from "components/event";
import {useRouter} from "next/router";

const CreateEventBox = ({ initialValues, onSubmit}) => {
    const router = useRouter();
    const { query: {cid}} = useRouter();
    const clubId = cid.replace('/', '');

    const handleSubmits = async (
        values,
        {setSubmitting, setErrors}
    ) => {
        try {
            await onSubmit({
                variables: {
                    club: cid,
                    input: {
                        title: values.title,
                        description: values.description,
                        mode: values.mode,
                        address: values.address,
                        start_date: values.start_date,
                        end_date: values.end_date,
                        start_time: values.start_time,
                        days: (values.days || [])
                          .map((checked, day) => checked ? day : null)
                          .filter(day => day !== null),
                        employees_ids: values.employees_ids,
                        event_type_id: values.event_type_id,
                        price: values.price,
                        photos: values.photos instanceof FileList ? values.photos : [],
                        club_id: clubId,
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
