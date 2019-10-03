import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg, PlusSvg } from "icons";
import { Lightbox, GalleryWithThumbnail, AddressCard, EventCard } from "UI";
import { GET_EMPLOYEE, ALL_EVENTS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import { EmployeeSchedule } from "components/schedule";

const Information = ({ loggedInUser }) => {
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
            {employee.description}
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

              <section className="my-3">
                <div className="text-grey">Type of woman</div>
                <div className="line" />
                <div className="w-32">Asian</div>
              </section>

              <section className="mt-6 mb-3">
                <div className="text-grey">Growth</div>
                <div className="line" />
                <div className="w-32">165 cm</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Weight</div>
                <div className="line" />
                <div className="w-32">54 kg</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Breast size</div>
                <div className="line" />
                <div className="w-32">Medium (3B)</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Body type</div>
                <div className="line" />
                <div className="w-32">Fitness</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Hair</div>
                <div className="line" />
                <div className="w-32">Black</div>
              </section>

              <section className="my-3">
                <div className="text-grey">Eye color</div>
                <div className="line" />
                <div className="w-32">Blue</div>
              </section>

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
                <div className="flex items-center justify-center bg-red text-white text-xl font-bold w-15 h-15 rounded-full sm:mb-3">
                  VIP
                </div>
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
    <EmployeeBox employee={employee} user={loggedInUser}>
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
          <div className="text-2xl font-extrabold my-5">
            Services and Pricing
          </div>
          <div className="flex flex-col sm:flex-row bg-white text-sm hd:text-base rounded-lg p-4 lg:p-12">
            <div className="w-full sm:w-1/3 px-2 sm:px-0">
              <section className="mb-3">
                <div className="text-grey">15 min</div>
                <div className="line" />
                <div className="w-12">$100</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">30 min</div>
                <div className="line" />
                <div className="w-12">$150</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">45 min</div>
                <div className="line" />
                <div className="w-12">$250</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">1 hour</div>
                <div className="line" />
                <div className="w-12">$300</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">2 hours</div>
                <div className="line" />
                <div className="w-12">$300</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">3 hours</div>
                <div className="line" />
                <div className="w-12">$600</div>
              </section>
              <section className="mb-3">
                <div className="text-grey">Night</div>
                <div className="line" />
                <div className="w-12">$1500</div>
              </section>
            </div>
            <div className="w-full sm:w-2/3 sm:px-2 hd:px-6 py-1">
              <div className="flex flex-wrap -mx-2">
                {event.club.services.map(service => (
                  <div key={service.id} className="px-2">
                    <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                      {service.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-2 my-2">Extra service</div>
              <div className="flex flex-wrap -mx-2">
                <div className="px-2">
                  <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                    Anal <span className="text-red ml-1">+$100</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                    Erotic massage <span className="text-red ml-1">+$100</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="bg-white border border-divider rounded-full px-2 py-2 text-xs mb-4">
                    <PlusSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

Information.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Information;
