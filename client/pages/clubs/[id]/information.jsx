import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";
import checkLoggedIn from "lib/checkLoggedIn";
import {
  ArrowNextSvg,
  CalendarSvg,
  PlusSvg,
  FakeSvg,
  HeartSvg,
  RatingSvg,
  MapSvg,
  MessageSvg
} from "icons";
import { Gallery, EventCard } from "UI";
import { GET_CLUB } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubBox, ClubGirlsBox } from "components/club";

const Information = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  const [isShowPhone, toggleShowPhone] = useState(false);

  const { data: { club } = {}, loading } = useQuery(GET_CLUB, {
    variables: {
      id
    }
  });

  if (loading) {
    return "Loading...";
  }

  const [event] = club.events;
  const [phone] = JSON.parse(club.phones);

  const Contacts = () => (
    <>
      <div className="text-2xl font-extrabold my-5">Address and Contacts</div>

      <div className="bg-white rounded-lg p-4">
        <p className="font-bold">Badenersrasse 109, 8004 Zurich</p>
        <div className="flex items-center my-2">
          <MapSvg />
          <span className="ml-3 text-grey text-sm">12 km from me</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 my-4">
        <p className="font-bold">www.s-pamela.ch</p>
        <div className="flex items-center my-2">
          <MessageSvg />
          <span className="ml-3 text-red text-sm">studiomail@gmail.com</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <p className="font-bold">Administrator: James Uebb</p>
        <div className="flex items-center my-2">
          <div className="flex bg-xs-grey px-3 py-1 mt-2 rounded-full">
            <span
              className={cx("block whitespace-no-wrap overflow-hidden", {
                "w-8": !isShowPhone
              })}
            >
              +{phone}
            </span>
            {!isShowPhone && (
              <span
                className="ml-4 text-red whitespace-no-wrap"
                onClick={() => toggleShowPhone(!isShowPhone)}
              >
                Show number
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const ClubLogo = () => (
    <div className="flex items-center justify-center relative h-full w-full">
      <img src="/static/img/club-logo.png" alt="" />
      <div className="flex absolute inset-0 items-start justify-end m-3">
        <HeartSvg className="stroke-red fill-red"></HeartSvg>
      </div>
      <div className="flex flex-col absolute inset-0 items-center justify-end mb-4">
        <div className="flex mb-2">
          <RatingSvg className="mx-1" />
          <RatingSvg className="mx-1" />
          <RatingSvg className="mx-1" />
          <RatingSvg className="mx-1" />
        </div>
        <div>23 reviews</div>
      </div>
    </div>
  );

  const contentColumn = (
    <>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-9/12 h-64 px-3">
          <div className="flex text-2xl font-extrabold my-5">Description</div>

          <div className="flex flex-wrap bg-white rounded-t-lg">
            <div className="w-2/12 flex items-center justify-center border-r border-divider">
              <ClubLogo />
            </div>
            <div className="flex flex-col justify-between w-10/12 p-4 hd:p-8 h-64">
              {club.description}
              {club.description}
              {club.description}

              <div className="flex items-center text-light-grey">
                <FakeSvg className="float-left" />
                <span className="ml-3">fake or not working</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-3 hidden lg:block">
          <Contacts />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-9/12 px-3">
          <ClubGirlsBox employees={club.employees} />
        </div>
        <div className="w-full lg:w-3/12 px-3 hidden lg:block">
          <div className="flex items-end my-5">
            <div className="text-2xl font-extrabold tracking-tighter leading-none">
              Next Event in {club.name}
            </div>
          </div>

          <div className="-mx-3">
            <EventCard href={`/clubs/${id}/events`} {...event} height={250} />
          </div>

          <Link href={`/clubs/[id]/events`} as={`/clubs/${club.id}/events`}>
            <a className="block text-sm whitespace-no-wrap transition hover:text-red">
              <ArrowNextSvg>
                <span className="mr-2">All events</span>
              </ArrowNextSvg>
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-9/12 px-3">
          <div className="flex -mx-3">
            <div className="w-1/2 px-3">
              <div className="text-2xl font-extrabold mb-5">Photos</div>
              <Gallery photos={club.photos} height="424px" />
            </div>
            <div className="w-1/2 px-3">
              <div className="text-2xl font-extrabold mb-5">
                Services and Pricing
              </div>
              <div className="bg-white text-sm hd:text-base rounded-lg p-6">
                <div className="w-full sm:w-2/4 mb-5">
                  <section className="mb-3">
                    <div className="text-grey">Entry from 16:00</div>
                    <div className="line" />
                    <div className="w-12 text-dark-green">Free</div>
                  </section>

                  <section className="mb-3">
                    <div className="text-grey">Entry from 00:00</div>
                    <div className="line" />
                    <div className="w-12">$100</div>
                  </section>
                </div>

                <div className="text-xl font-medium mb-5">Girls Pricing</div>

                <div className="flex flex-col sm:flex-row">
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
                      {club.services.map(service => (
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
                          Erotic massage
                          <span className="text-red ml-1">+$100</span>
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
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-3 hidden lg:block">
          <div className="flex items-center">
            <div className="text-2xl font-extrabold mb-5">
              My schedule in {club.name}
            </div>
          </div>
          <div className="bg-white text-xs sm:text-sm hd:text-base rounded-lg p-4 lg:p-12">
            <section className="mb-3">
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">17.08</span>
                <span className="hidden sm:block">Sonntag</span>
                <span className="block sm:hidden">{"Sonntag".slice(0, 2)}</span>
              </div>
              <div className="line" />
              <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12">
                <div>19:00 — 05:00</div>
              </div>
            </section>

            <section className="mb-3">
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">18.08</span>
                <span className="hidden sm:block">Montag</span>
                <span className="block sm:hidden">{"Montag".slice(0, 2)}</span>
              </div>
              <div className="line" />
              <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12">
                <div>19:00 — 05:00</div>
              </div>
            </section>

            <section className="mb-3">
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">20.08</span>
                <span className="hidden sm:block">Mittwich</span>
                <span className="block sm:hidden">
                  {"Mittwich".slice(0, 2)}
                </span>
              </div>
              <div className="line" />
              <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12">
                <div>19:00 — 05:00</div>
              </div>
            </section>

            <section className="mb-3">
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">21.08</span>
                <span className="hidden sm:block">Donnerstag</span>
                <span className="block sm:hidden">
                  {"Donnerstag".slice(0, 2)}
                </span>
              </div>
              <div className="line" />
              <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12 text-light-grey">
                <div>Day off</div>
              </div>
            </section>

            <section className="mb-3">
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">23.08</span>
                <span className="hidden sm:block">Samstag</span>
                <span className="block sm:hidden">{"Samstag".slice(0, 2)}</span>
              </div>
              <div className="line" />
              <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12">
                <div>19:00 — 05:00</div>
              </div>
            </section>

            <span className="flex sm:hidden items-center mt-6">
              <span className="text-sm mr-2">View for a month</span>
              <CalendarSvg />
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ClubBox club={club} user={loggedInUser}>
      {contentColumn}
    </ClubBox>
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
