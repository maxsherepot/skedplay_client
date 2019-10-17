import * as Yup from "yup";

export const employeeRules = Yup.object().shape({
    name: Yup.string().required(),
    birthday: Yup.string(),
    gender: Yup.string().required(),
    race_type_id: Yup.string().required(),
    type: Yup.string(),
    description: Yup.string().required(),
    index: Yup.string(),
    city: Yup.string(),
    address: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
    website: Yup.string()
});
