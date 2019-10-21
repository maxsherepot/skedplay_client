import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, GalleryWithThumbnail, AddressCard, EventCard } from "UI";
import { GET_EMPLOYEE, ALL_EVENTS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import { EmployeeSchedule } from "components/schedule";
import PriceAndService from "components/price/PriceAndService";
import Index from "../../index";

const EmployeeInformation = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const { data: { events } = {}, loading: eventsLoading } = useQuery(
    ALL_EVENTS,
    {
      variables: {
        first: 1,
        page: 1
      }
    }
  );

  if (employeeLoading || eventsLoading) {
    return "Loading...";
  }

  const handleLightboxClick = index => {
    setLightboxIndex(index);
    toggleModalOpen(true);
  };

  const onClose = () => {
    setLightboxIndex(null);
    toggleModalOpen(false);
  };

  const [event] = events.data;

  const sidebarColumn = (
    <>
      <Lightbox
        open={isModalOpen}
        index={lightboxIndex}
        onClose={onClose}
        images={employee.photos}
      />

      <GalleryWithThumbnail
        photos={employee.photos}
        handleClick={handleLightboxClick}
        favorite={
          <FavoriteButton
            variables={{ model_id: employee.id, model_type: "employee" }}
            favorited={employee.favorited}
            large={true}
          />
        }
        large
      />
    </>
  );

  const AddressAndEvent = () => (
    <>
      <AddressCard isAvailable={false} />

      <div className="flex items-end my-5">
        <div className="text-2xl font-extrabold tracking-tighter leading-none">
          Nachste event
        </div>
        <Link
          href={`/employees/[id]/events`}
          as={`/employees/${employee.id}/events`}
        >
          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
            <ArrowNextSvg>
              <span className="mr-1">All my events</span>
            </ArrowNextSvg>
          </a>
        </Link>
      </div>

      <div className="-mx-3">
        <EventCard href={`/employees/${id}/events`} {...event} />
      </div>
    </>
  );

  const contentColumn = (
    <>
      <div className="flex -mx-3">
        <div className="w-full hd:w-2/3 px-3">
          <div className="text-2xl font-extrabold my-5">Beschreibung</div>
          <div className="bg-white rounded-t-lg p-4 hd:p-8">
            {employee.description}
          </div>
          <div className="border-b border-divider" />
          <div className="flex flex-col sm:flex-row bg-white rounded-b-lg p-4 hd:p-8">
            <div className="w-full sm:w-3/5">
              <section className="mb-3">
                <div className="text-grey">Gender</div>
                <div className="line" />
                <div className="w-32">Female</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Gender Type</div>
                <div className="line" />
                <div className="w-32">TS</div>
              </section>

              <section className="mt-3 mb-6">
                <div className="text-grey">Type of woman</div>
                <div className="line" />
                <div className="w-32">Asian</div>
              </section>

              {employee.parameters.map(p => (
                  <section className="my-3" key={p.id}>
                    <div className="text-grey">{p.display_name}</div>
                    <div className="line" />
                    <div className="w-32">{p.pivot.display_value}</div>
                  </section>
              ))}

              <section className="mt-6 mb-3">
                <div className="text-grey">Languages</div>
                <div className="line" />
                <div className="w-32">
                  <div className="flex items-center justify-between mb-2">
                    Russia
                    <span className="flex justify-between w-16">
                      <div className="flex ml-2">
                        <RatingSvg /> <RatingSvg /> <RatingSvg />
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    English
                    <span className="flex justify-between w-16">
                      <div className="flex ml-2">
                        <RatingSvg /> <RatingSvg />
                        <RatingSvg checked={false} />
                      </div>
                    </span>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-full sm:w-2/5">
              <div className="flex sm:flex-col items-end">
                {employee.isVip && (
                    <div className="flex items-center justify-center bg-red text-white text-xl font-bold w-15 h-15 rounded-full sm:mb-3">
                      VIP
                    </div>
                )}
                <div className="flex items-center justify-center bg-black text-white font-bold w-15 h-15 rounded-full mx-4 sm:mx-0 sm:mb-3">
                  100%
                </div>
                <div className="flex items-center justify-center bg-white border-2 border-divider w-15 h-15 rounded-full">
                  <CocktailSvg height={30} width={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 px-3 hidden hd:block">
          <AddressAndEvent />
        </div>
      </div>
    </>
  );

  return (
    <EmployeeBox employee={employee} user={user}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="w-full sm:w-2/3 hd:w-2/5 px-3">
          <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
          {sidebarColumn}
        </div>
        <div className="w-full sm:w-1/3 px-3 block hd:hidden">
          <AddressAndEvent />
        </div>
        <div className="w-full hd:w-3/5 px-3">{contentColumn}</div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full hd:w-2/5 px-3">
          <PriceAndService title="Services and Pricing" prices={employee.prices} services={employee.services} />
        </div>
        <div className="w-full hd:w-2/5 px-3">
          <EmployeeSchedule
            title={`My schedule in ${employee.club ? employee.club.name : ""}`}
            employee={employee}
          />
        </div>
      </div>
    </EmployeeBox>
  );
};

EmployeeInformation.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

EmployeeInformation.getLayout = (page) => page;

export default EmployeeInformation;
