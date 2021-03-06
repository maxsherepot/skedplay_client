import {useRouter} from "next/router";
import {usePagination} from "hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {Avatar, MasonryLayout, Pagination, Loader} from "UI";
import {GET_EMPLOYEE, ALL_REVIEWS, CREATE_REVIEW, ALL_EMPLOYEES} from "queries";
import {useQuery, useMutation} from "@apollo/react-hooks";
import EmployeeBox from "components/employee/EmployeeBox";
import Button from "@material-ui/core/Button";
import {NewReviewForm} from "components/review";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {NextSeo} from "next-seo";

const EmployeeReviews = ({user}) => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const {t, i18n} = useTranslation();
  const router = useRouter();
  const {id} = router.query;
  const [page, setPage] = usePagination();

  const [createReview] = useMutation(CREATE_REVIEW);

  const {data: {employee} = {}, loading: employeeLoading} = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const {data: {reviews} = {}, loading: reviewsLoading} = useQuery(
    ALL_REVIEWS,
    {
      variables: {
        first: 15,
        page,
        reviewable_id: id
      }
    }
  );

  const { data: employeesData, loading: loadingEmployees, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (employeeLoading || reviewsLoading || loadingEmployees) {
    return <Loader/>;
  }

  const employees = employeesData.employees.data || [];

  if (!employees) {
    return <Loader/>;
  }

  if (employee.user_status === 2 || employee.status === 2) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const ViewReply = ({replies}) => {
    const [reply] = replies;

    return (
      <div className="bg-xs-grey rounded-lg p-3 mt-4">
        <div className="flex items-center">
          <div className="text-lg text-red font-medium">
            {reply.user ? reply.user.name : 'Deleted user'}
          </div>
          <div className="text-sm text-grey ml-2">{reply.created_at}</div>
        </div>
        <div className="text-lg">{reply.body}</div>
      </div>
    );
  };

  const sidebarColumn = (
    <div className="bg-white border-2 border-black rounded-lg px-7 py-5">
      <NewReviewForm employee={employee} onSubmit={createReview}/>
    </div>
  );

  const contentColumn = (
    <>
      <div className="flex -mx-3">
        <div className="w-full px-3">
          <div className="text-2xl font-bold my-5">
            {t('employees.reviews', {first_name: employee.first_name, last_name: employee.last_name})}
          </div>
          <MasonryLayout
            breakpoints={{
              default: 3,
              768: 2,
              468: 1
            }}
            gap={20}
          >
            {reviews &&
            reviews.data.map(review => (
              <div key={review.id} className="flex-auto bg-white rounded-lg">
                <div className="flex flex-col px-7 py-5">
                  <div className="flex items-center">
                    <Avatar
                      className="w-10 h-10 mr-4"
                      src="/static/img/Avatar.webp"
                    />
                    <div>
                      <div className="text-lg font-medium">
                        {review.user && review.user.name}
                      </div>
                      <div className="text-sm text-grey">
                        {review.created_at}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">{review.title}</div>
                  <div className="text-lg">{review.body}</div>

                  {review.replies && review.replies.length && (
                    <ViewReply replies={review.replies}/>
                  )}
                </div>
              </div>
            ))}
          </MasonryLayout>

          <Pagination
            page={page}
            setPage={setPage}
            {...reviews.paginatorInfo}
          />
        </div>
      </div>
    </>
  );

  const lastBreadcrumbs = [
    {
      label: t('common.reviews'),
    }
  ];


  return (
    <>
      <NextSeo
        title={employee.name + ' ' + t('common.reviews').toLowerCase()}
      />

      <EmployeeBox employee={employee} user={user} employees={employees} lastBreadcrumbs={lastBreadcrumbs}>
          {
              !isReviewFormOpen ?
                    <div className="flex justify-center hd:hidden mb-4 sm:mb-2">
                        <Button variant="outlined"  color="secondary" onClick={() => setIsReviewFormOpen(true)}>{t('employees.leave_comment')}</Button>
                    </div>
                    :
                    null
          }

        <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
            <span className="w-full flex justify-center hd:hidden">
                {isReviewFormOpen &&
                    <div className="w-full px-3" style={{maxWidth: "500px"}}>
                      <div className="flex justify-center text-center text-2xl font-bold my-5">
                        {t('employees.leave_comment')}
                      </div>
                      {sidebarColumn}
                    </div>
                }
            </span>
            <div className="w-full hd:w-3/12 px-3 hidden hd:block">
              <div className="text-2xl font-bold my-5">
                {t('employees.leave_comment')}
              </div>
              {sidebarColumn}
            </div>
          <div className="w-full hd:w-9/12 px-3">{contentColumn}</div>
        </div>
      </EmployeeBox>
    </>
  );
};

EmployeeReviews.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return {user};
};

EmployeeReviews.getLayout = page => page;

export default EmployeeReviews;
