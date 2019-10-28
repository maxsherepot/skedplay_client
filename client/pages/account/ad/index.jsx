import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {useMutation} from "@apollo/react-hooks";
import {GET_ME, DELETE_EMPLOYEE} from "queries";
import {Button, DeletePopup} from "UI";
import Link from "next/link";

import { getLayout } from 'components/account/AccountLayout'

const EmployeeCard = ({employee}) => {
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    update(
        cache,
        {
          data: {deleteEmployee}
        }
    ) {
      const {me} = cache.readQuery({
        query: GET_ME,
      });

      let employees = me.employees;
      employees = employees.filter(e => e.id !== deleteEmployee.message);

      cache.writeQuery({
        query: GET_ME,
        data: {
          me: {
            ...me,
            employees
          }
        }
      });
    }
  });

  const handleDelete = () => {
    try {
      deleteEmployee({
        variables: {
          employee: employee.id
        }
      });
    } catch (e) {
      return {
        status: false,
        message: "Server error"
      };
    }
  };

  return (
      <div className="px-3 w-full md:w-1/2 mb-5">
        <div className="p-5 border-light-grey border rounded-lg shadow h-full">
          <div className="truncate">
            {employee.name}
          </div>

          <div className="flex flex-wrap justify-end -mx-2">
            <div className="px-2">
              <Link href={`/account/ad/${employee.id}`}>
                <a>
                  <Button className="px-2" level="secondary" outline size="xxs">
                    Edit
                  </Button>
                </a>
              </Link>
            </div>
            <div className="px-2">
              <DeletePopup onEnter={handleDelete} title={`Delete ${employee.name}?`}>
                <div className="pt-6">
                  <p>Are you sure you want to delete this ad?</p>
                </div>
              </DeletePopup>
            </div>
          </div>
        </div>
      </div>
  )
};

const EmployeesList = ({employees}) => {
  return (
      <>
        <div className="flex flex-wrap -mx-3">
          {employees.map(e => <EmployeeCard key={e.id} employee={e}/>)}
        </div>
      </>
  )
};

const AccountAdIndex = ({ user }) => (
    <>
      <div className="text-2xl font-extrabold tracking-tighter leading-none mb-5">
        My ads
      </div>
      <EmployeesList employees={user.employees} />
    </>
);

AccountAdIndex.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

AccountAdIndex.getLayout = getLayout;

export default AccountAdIndex;
