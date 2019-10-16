import * as Yup from "yup";

export const createEmployeeRules = Yup.object().shape({
    name: Yup.string().required(),
    birthday: Yup.string().required(),
    gender: Yup.string().required(),
    race_type_id: Yup.string().required(),
    nationality: Yup.string().required(),
    description: Yup.string().required(),
    index: Yup.string().required(),
    city: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().required(),
    website: Yup.string().required()
});