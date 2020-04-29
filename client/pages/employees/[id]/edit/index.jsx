import {useRouter} from "next/router";
import {GET_EMPLOYEE} from "queries";
import {useQuery} from "@apollo/react-hooks";
import EmployeeBox from "components/employee/EmployeeBox";
import {EditEmployeeBox} from "components/employee";
import {useTranslation} from "react-i18next";
import {Loader} from "UI";


const EmployeeEdit = ({loggedInUser}) => {
    const router = useRouter();
    const {id} = router.query;
    const {t, i18n} = useTranslation();

    const {data: {employee} = {}, loading, refetch} = useQuery(GET_EMPLOYEE, {
        variables: {
            id
        }
    });

    if (loading) {
        return <Loader/>;
    }

    return (
        <EmployeeBox employee={employee} user={loggedInUser} viewed={false}>
            <div className="bg-white shadow rounded-lg p-8 mt-6">
                <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
                    {t('employees.personal_information')}
                </div>
                <EditEmployeeBox initialValues={employee} refetchEmployee={refetch}/>
            </div>
        </EmployeeBox>
    );
};

export default EmployeeEdit;
