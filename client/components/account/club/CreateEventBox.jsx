import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {getErrors} from "utils";
import {BlackPlusSvg} from "icons";
import {useRouter} from "next/router";
import {Button, TextField, SelectField, TextAreaField, MultiPhotoField} from "UI";

const CreateEventBox = ({ initialValues, onSubmit}) => {
    const { query: {cid}} = useRouter();

    const handleSubmits = async (
        values,
        {setSubmitting, setErrors, setError, setStatus}
    ) => {
        try {
            const {data: {createClubEvent} = {}} = await onSubmit({
                variables: {
                    club: cid,
                    input: values
                }
            });

            if (createClubEvent && createClubEvent.status) {
                setStatus(createClubEvent.message);
            } else {
                setError(createClubEvent.message);
            }
        } catch (e) {
            if (getErrors(e) instanceof Object) {
                setErrors(getErrors(e));
            }
        }

        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().required(),
                event_type_id : Yup.string().required(),
            })}
            onSubmit={handleSubmits}
        >
            {({handleSubmit, isSubmitting, status}) => (
                <form onSubmit={handleSubmit}>
                    <div className="px-2">
                        {status && (
                            <div className="text-dark-green text-white px-1 mb-3">
                                {status}
                            </div>
                        )}

                        <TextField label="Title" name="title"/>

                        <SelectField
                            label="Type"
                            name="event_type_id"
                            options={[
                                {
                                    label: "Special day",
                                    value: 1
                                },
                                {
                                    label: "Parties and shows",
                                    value: 2
                                },
                                {
                                    label: "Discount",
                                    value: 3
                                }
                            ]}
                            placeholder=""
                        />

                        <TextAreaField rows={6} label="Description" name="description"/>

                        <div className="flex flex-wrap mb-4">
                            <MultiPhotoField name="photos" label="" selectable={false}>
                                <Button
                                    className="px-3"
                                    level="primary-black"
                                    outline
                                    size="sm"
                                    type="button"
                                >
                                    <div className="flex items-center">
                                        <BlackPlusSvg/>
                                        <span className="ml-2">from device</span>
                                    </div>
                                </Button>
                            </MultiPhotoField>
                        </div>

                        <Button
                            type="submit"
                            className="px-8"
                            size="sm"
                            disabled={isSubmitting}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default CreateEventBox;
