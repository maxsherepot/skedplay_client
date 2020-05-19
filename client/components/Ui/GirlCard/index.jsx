import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from 'components/SlashedLink'
import { Badge, Slick } from "UI";
import { FavoriteButton } from "components/favorite";
import { MessageSvg, CocktailSvg } from "icons";
import Distance from "components/distance";
import {useTranslation} from "react-i18next";
import MapSvg from "components/icons/MapSvg";
import {LazyLoadImage} from "react-lazy-load-image-component";
import slug from "slug";

function GirlCard({
  className,
  previewClass,
  slickClass,
  girl,
  labels,
  slider,
  available,
  preview,
  sized,
  viewed,
}) {
  function DistanceView({distanceKm}) {
    if (!distanceKm) {
      return (
        <>
          {girl.city &&
          <div className="text-sm text-grey">
            <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
            {girl.index ? girl.index + ', ' : ''}{girl.city.name}
          </div>
          }
        </>
      );
    }

    const {t, i18n} = useTranslation();

    return (
      <div className="text-sm text-grey">
        <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
        {distanceKm} {t('index.km_from_me')}
      </div>
    );
  }

  const availableButtons = () => {
    const type = Math.floor(Math.random() * Math.floor(4));
    const {t, i18n} = useTranslation();
    switch (type) {
      case 0:
        return (
          <div className="bg-black text-white text-xs rounded-full uppercase px-4">
            {t('index.coming_soon')}
          </div>
        );
      case 1:
        return (
          <div className="bg-dark-green text-white text-xs rounded-full uppercase px-4">
            {t('index.available')}
          </div>
        );
      case 2:
        return (
          <div className="bg-grey text-white text-xs rounded-full uppercase px-4">
            {t('index.attended_us')}
          </div>
        );
      case 3:
        return (
          <div className="bg-divider text-white text-xs rounded-full uppercase px-4">
            {t('index.not_available')}
          </div>
        );

      default:
        break;
    }
  };

  const Labels = ({ girl }) => {
    const {t, i18n} = useTranslation();
    return(
        <>
          <div className="flex flex-col">
            <div className="flex flex-col -mb-2 hide-on-hover">
              {girl.isNew && (
                  <div className="">
                    <Badge className="bg-black">{t('status.new')}</Badge>
                  </div>
              )}
              {girl.isVip && (
                  <div className="mt-2">
                    <Badge className="bg-red">{t('status.vip')}</Badge>
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
  }

  const [photo] = girl.photos;

  const girlType = parseInt(girl.type) === 1
    ? 'girls'
    : 'trans';

  const getHref = () => {
    if (!girl.city || !girl.city.canton) {
      return `/employees/id/information?id=${girl.id}`;
    }

    return `/${girlType}/canton/city/id/information?id=${girl.id}&canton=${slug(girl.city.canton.name)}&city=${slug(girl.city.name)}`;
  };

  const getAs = () => {
    if (!girl.city || !girl.city.canton) {
      return `/employees/${girl.id}/information`;
    }

    return `/${girlType}/${slug(girl.city.canton.name)}/${slug(girl.city.name)}/${girl.id}/information`;
  };

  const getLinkHtml = (girl) => {
    if (girl.soon) {
      return (
        <span className="text-sm font-medium leading-tight hover:text-red">
          {girl.name}, {girl.age}
        </span>
      );
    }

    return (
      <Link
        href={getHref()}
        as={getAs()}
      >
        <a className="text-sm font-medium leading-tight hover:text-red">
          {girl.name}, {girl.age}
        </a>
      </Link>
    );
  };

  const getLink = (girl) => {
    if (girl.soon) {
      return '';
    }

    return getAs();
  };

  return (
    <div className={cx(
      className,
      "girls__item bg-white border border-white",
      girl.isVip ? "border border-red" : "",
      sized ? "sized" : "",
      viewed ? "viewed" : "",
    )}>
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
        <LazyLoadImage
            className={previewClass}
            src={photo && photo.thumb_url || '/static/img/girl-no-photo.jpg'}
            alt={``}
        />
      ) : (
        <Slick
          className={slickClass}
          id={girl.id}
          photos={girl.photos}
          labels={labels ? <Labels girl={girl} /> : null}
          slider={slider}
          available={available}
          link={getHref()}
          as={getLink(girl)}
          noPhotoSrc={`/static/img/girl-no-photo.jpg`}
        />
      )}

      <div className="p-3 z-10">
        {getLinkHtml(girl)}
        {available ? (
          <div className="flex">{availableButtons()}</div>
        ) : (
          <>
            <Distance
              originByGeo={true}
              destination={{lat: girl.lat, lng: girl.lng}}
            >
              <DistanceView/>
            </Distance>
          </>
        )}
      </div>
    </div>
  );
}

GirlCard.defaultProps = {
  previewClass:
    "object-cover h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-lg xl:h-e-photo-xl hd:h-e-photo-hd",
  slickClass: "h-photo sm:h-photo-sm md:h-photo-md lg:h-photo-lg hd:h-photo-hd",
  preview: false,
  available: false,
  labels: true,
  slider: true,
  sized: true,
  viewed: false,
};

GirlCard.propTypes = {
  className: PropTypes.string,
  previewClass: PropTypes.string,
  slickClass: PropTypes.string,
  preview: PropTypes.bool,
  girl: PropTypes.object.isRequired,
  labels: PropTypes.bool,
  slider: PropTypes.bool,
  sized: PropTypes.bool,
  viewed: PropTypes.bool,
};

export default GirlCard;
