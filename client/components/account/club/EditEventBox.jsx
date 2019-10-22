import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { BlackPlusSvg } from "icons";
import { Button, TextField, SelectField, TextAreaField, MultiPhotoField } from "UI";
import { getErrors } from "utils";

const EditEventBox = ({ initialValues, onSubmit }) => {
    const handleSubmits = async (
        values,
        { setSubmitting, setErrors, setError, setStatus }
    ) => {
        try {
            const { data: { updateEvent } = {} } = await onSubmit({
                variables: {
                    event: initialValues.id,
                    input: {
                        title: values.title,
                        description: values.description,
                        event_type_id: values.event_type_id,
                    }
                }
            });

            if (updateEvent && updateEvent.status) {
                setStatus(updateEvent.message);
            } else {
                setError(updateEvent.message);
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

                        <TextField label="Title" name="title" />

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

                        <TextAreaField rows={6} label="Description" name="description" />

                        <div className="flex flex-wrap mb-4">
                            <MultiPhotoField name="photos" label="" initialValues={initialValues.photos} selectable={false}>
                                <Button
                                    className="px-3"
                                    level="primary-black"
                                    outline
                                    size="sm"
                                    type="button"
                                >
                                    <div className="flex items-center">
                                        <BlackPlusSvg />
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
                            Save changes
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default EditEventBox;
