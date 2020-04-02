import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ClubCard, Loader } from "UI";
import Slider from "react-slick";
import React from "react";

const GET_CLUBS = gql`
    {
        clubs(first: 15) {
            data {
                id
                name
                city {
                    id
                    name
                }
                address
                lat
                lng
                phones
                employees {
                    id
                    name
                    isNew
                    inGeneral
                    favorited {
                        id
                    }
                    owner {
                        ... on Club {
                            id
                            name
                        }
                    }
                }
                favorited {
                    id
                }
                type {
                    id
                    name
                }
                logo {
                    url
                }
                photos {
                    url
                }
            }
        }
    }
`;

function ClubsBox() {
  const { loading, error, data: { clubs } = {} } = useQuery(GET_CLUBS);

  if (loading) return <Loader/>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="mt-7 -mx-4">
      <Slider
        className="relative block"
        arrows={false}
        infinite={false}
        // dots={true}
        swipeToSlide={true}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={5}
        responsive={[
          {
            breakpoint: 1780,
            settings: {
              slidesToShow: 4,
              // slidesToScroll: 4,
              dots: false
            }
          },
          {
            breakpoint: 1320,
            settings: {
              slidesToShow: 2,
              // slidesToScroll: 2,
              dots: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              // slidesToScroll: 1,
              dots: true,
            }
          }
        ]}
        // beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
      >
        {clubs &&
        clubs.data.map(club => (
          <ClubCard key={club.id} {...club} gridClasses={false} />
        ))}
      </Slider>
    </div>
  );
}

export default ClubsBox;
