import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";
import { Badge, Slick } from "UI";
import { FavoriteButton } from "components/favorite";
import { MessageSvg, CocktailSvg } from "icons";

function GirlCard({
  className,
  previewClass,
  slickClass,
  girl,
  labels,
  slider,
  available,
  preview
}) {
  const availableButtons = () => {
    const type = Math.floor(Math.random() * Math.floor(4));

    switch (type) {
      case 0:
        return (
          <div className="bg-black text-white text-xs rounded-full uppercase px-4">
            coming soon
          </div>
        );
      case 1:
        return (
          <div className="bg-dark-green text-white text-xs rounded-full uppercase px-4">
            available
          </div>
        );
      case 2:
        return (
          <div className="bg-grey text-white text-xs rounded-full uppercase px-4">
            attended us
          </div>
        );
      case 3:
        return (
          <div className="bg-divider text-white text-xs rounded-full uppercase px-4">
            not available
          </div>
        );

      default:
        break;
    }
  };

  const Labels = ({ girl }) => (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col -mb-2 hide-on-hover">
          {girl.isNew && (
            <div className="">
              <Badge className="bg-black">NEW</Badge>
            </div>
          )}
          {girl.isVip && (
            <div className="mt-2">
              <Badge className="bg-red">VIP</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-wrap-reverse show-on-hover mt-2">
          <div className="rounded-full bg-xs-grey text-xs xl:text-sm px-2-5 leading-relaxed py-1 mr-2 mt-2">
            +38 050 145 78 89
          </div>
          <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7">
            <MessageSvg />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-end flex-row show-on-hover">
        <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7">
          <CocktailSvg />
        </button>
        <button className="flex justify-center content-center rounded-full bg-red w-7 h-7 ml-3 mt-2">
          <span className="text-white font-bold text-2xs">100%</span>
        </button>
      </div>
    </>
  );

  const [photo] = girl.photos;

  const getLink = (girl) => {
    if (girl.soon) {
      return (
        <span className="text-sm font-medium leading-tight hover:text-red">
          {girl.name}, {girl.age}
        </span>
      );
    }

    return (
      <Link
        href={girl.soon ? "" : "/employees/[id]/information"}
        as={girl.soon ? "" : `/employees/${girl.id}/information`}
      >
        <a className="text-sm font-medium leading-tight hover:text-red">
          {girl.name}, {girl.age}
        </a>
      </Link>
    );
  };

  return (
    <div className={cx(className, "girls__item bg-white border border-red")}>
      <div className="absolute z-20 top-0 right-0 p-3-5">
        <FavoriteButton
          variables={{ model_id: girl.id, model_type: "employee" }}
          favorited={girl.favorited}
          small={true}
          iconWidth={18}
          iconHeight={16}
        />
      </div>

      {preview ? (
        <img className={previewClass} src={photo.thumb_url} />
      ) : (
        <Slick
          className={slickClass}
          id={girl.id}
          photos={girl.photos}
          labels={labels ? <Labels girl={girl} /> : null}
          slider={slider}
          available={available}
        />
      )}

      <div className="p-3 z-10">
        {getLink(girl)}
        {available ? (
          <div className="flex">{availableButtons()}</div>
        ) : (
          <div className="text-sm text-grey">
            <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
            150 km from me
          </div>
        )}
      </div>
    </div>
  );
}

GirlCard.defaultProps = {
  previewClass:
    "object-cover h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-lg hd:h-e-photo-hd",
  slickClass: "h-photo sm:h-photo-sm md:h-photo-md lg:h-photo-lg hd:h-photo-hd",
  preview: false,
  available: false,
  labels: true,
  slider: true
};

GirlCard.propTypes = {
  className: PropTypes.string,
  previewClass: PropTypes.string,
  slickClass: PropTypes.string,
  preview: PropTypes.bool,
  girl: PropTypes.object,
  labels: PropTypes.bool,
  slider: PropTypes.bool
};

export default GirlCard;
