import * as Yup from "yup";

export const employeeRules = Yup.object().shape({
    name: Yup.string().required(),
    // birthday: Yup.string().nullable(),
    // gender: Yup.string().required().nullable(),
    race_type_id: Yup.string().required().nullable(),
    type: Yup.string().nullable(),
    description: Yup.string().required().nullable(),
    index: Yup.string().nullable(),
    // city: Yup.string().nullable(),
    address: Yup.string().required(),
    // phone: Yup.string().nullable(),
    email: Yup.string().nullable(),
    website: Yup.string().nullable()
});
