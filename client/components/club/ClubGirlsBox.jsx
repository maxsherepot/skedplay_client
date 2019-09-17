import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { ArrowNextSvg } from "icons";
import { GirlCard } from "UI";

const ClubGirlsBox = ({ employees }) => {
  const router = useRouter();
  const { id } = router.query;

  const rows = [];

  for (var i = 0; i < 3; i++) {
    const employee = employees[i];

    rows.push(
      <div className="sm:w-1/2 lg:w-1/3 px-3" key={employee.id}>
        <GirlCard
          girl={employee}
          labels={false}
          slider={false}
          height="310px"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-end my-5">
        <div className="text-3xl font-extrabold tracking-tighter leading-none">
          Our girls
        </div>
        <Link href="/clubs/[id]/girls" as={`/clubs/${id}/girls`}>
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">All girls</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>
      <div className="girls flex flex-col sm:flex-row sm:justify-start sm:flex-wrap -mx-3">
        {rows}
      </div>
    </>
  );
};

ClubGirlsBox.defaultProps = {
  employees: []
};

ClubGirlsBox.propTypes = {
  employees: PropTypes.array
};

export default ClubGirlsBox;
