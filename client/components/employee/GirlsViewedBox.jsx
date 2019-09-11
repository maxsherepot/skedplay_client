import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { ALL_EMPLOYEES } from "queries";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";

const GirlsViewedBox = () => {
  const { data, loading, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex items-end">
        <div className="text-3xl font-extrabold tracking-tighter leading-none">
          Zuvor angesehen
        </div>
        <Link href="/girls">
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">All girls</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-3">
        {data.employees &&
          data.employees.data.map(employee => (
            <div
              className="sm:w-1/2 md:w-1/4 lg:w-1/5 hd:flex-1 px-3"
              key={employee.id}
            >
              <GirlCard
                girl={employee}
                labels={false}
                slider={false}
                height="310px"
              />
            </div>
          ))}
      </div>
    </>
  );
};

GirlsViewedBox.propTypes = {};

export default GirlsViewedBox;
