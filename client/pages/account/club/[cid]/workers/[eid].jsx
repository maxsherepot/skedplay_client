import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {EditEmployeeBox} from "components/employee";
import SelectClub from "components/account/SelectClub";
import {Button, DeletePopup} from "UI";
import {
    GET_EMPLOYEE,
    DELETE_EMPLOYEE,
} from "queries";
import StepBox from "components/StepBox";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {getLayout} from "components/account/AccountLayout";

const Header = ({employee}) => {
    const router = useRouter();
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const [photo] = employee.photos;

    const handleDelete = () => {
        try {
            deleteEmployee({
                variables: {
                    employee: employee.id
                }
            });

            router.back();
        } catch (e) {
            return {
                status: false,
                message: "Server error"
            };
        }
    };

    return (
        <div className="flex items-center justify-between border border-divider p-3 mx-8 mt-6 rounded-lg">
            <div className="relative w-30 h-30 mr-4">
                <img className="w-30 h-30 rounded-full object-cover" src={photo && photo.thumb_url}
                     alt={employee.name}/>
                {employee.isVip && (
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className="-mb-0-35 mx-auto bg-red rounded-full w-12 text-center text-white">VIP</div>
                    </div>
                )}
            </div>

            <div className="flex flex-1 px-2">
                <div className="flex w-full items-end -mx-2">
                    <div className="flex flex-col flex-1 px-2">
                        <div className="text-4xl font-extrabold whitespace-no-wrap">{employee.name}</div>
                        <div className="flex items-center text-grey my-2">
                            <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"/>
                            <div className="flex items-center">05.06-07.06</div>
                        </div>

                        <div className="flex items-center">
                            <SelectClub className="w-40" owner={employee.owner}/>

                            <div className="mx-4">1234 views</div>

                            <div className="text-grey">5 day left</div>
                        </div>
                    </div>

                    <div className="flex justify-center flex-col h-full px-2">
                        <Button className="px-3 mb-3" level="primary" outline size="xxs">
                            <span className="text-black">Cancel VIP</span>
                        </Button>
                        <Button className="px-3 mb-3" level="primary" outline size="xxs">
                            <span className="text-black">Deactivate</span>
                        </Button>

                        <DeletePopup onEnter={handleDelete} title={`Delete ${employee.name}?`}>
                            <div className="pt-6">
                                <p>Are you sure you want to delete this card?</p>
                            </div>
                        </DeletePopup>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AccountClubWorkersIndex = ({user}) => {
    const {query: {eid}} = useRouter();
    const {data: {employee} = {}, loading} = useQuery(GET_EMPLOYEE, {
        variables: {
            id: eid
        }
    });

    const links = [
        'Information',
        'Services and Prices',
        'Photos and videos',
        'Schedule and activation',
    ];

    if (loading) return (<div>Loading..</div>);

    return employee && (
        <>
            <Header employee={employee}/>
            <div className="flex flex-col lg:flex-row justify-between">
                <StepBox links={links}/>
            </div>

            <div className="border-b border-divider"/>

            <EditEmployeeBox employee={employee}/>
        </>
    );
};

AccountClubWorkersIndex.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

AccountClubWorkersIndex.getLayout = getLayout;

export default AccountClubWorkersIndex;