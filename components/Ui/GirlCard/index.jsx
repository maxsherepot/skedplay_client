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
  profileCard,
  viewed,
  user,
  style
}) {
  function DistanceView({distanceKm}) {
    if (!distanceKm) {
      return (
        <>
          {girl.city &&
          <div className="text-sm text-grey">
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
    let type = Math.floor(Math.random() * Math.floor(4));

    if (girl.soon) {
      type = 0;
    }

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
              {!!girl.soon && (
                <div className="">
                  <Badge className="bg-black">{t('index.coming_soon')}</Badge>
                </div>
              )}
              {girl.isVip && (
                <div className="mt-2">
                  <Badge className="bg-red">{t('status.vip')}</Badge>
                </div>
              )}
            </div>
            <div className="flex flex-wrap-reverse show-on-hover mt-2">
              {girl.phone &&
                <div className="rounded-full bg-xs-grey text-xs xl:text-sm px-2-5 leading-relaxed py-1 mr-2 mt-2">
                  {girl.phone}
                </div>
              }
              <button className="hidden hd:flex items-center justify-center rounded-full bg-xs-grey w-7 h-7">
                <MessageSvg />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-end flex-row show-on-hover">
            <button className="flex items-center justify-center rounded-full bg-xs-grey w-7 h-7">
              <CocktailSvg />
            </button>
            {(girl.status === 1 && girl.user_status === 1) ? (
              <button className="flex items-center justify-center rounded-full bg-red w-7 h-7 ml-3 mt-2">
                <span className="text-white font-bold text-2xs">100%</span>
              </button>
            ) : ''}

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

    return `/${girlType}/canton/city/id/information?id=${girl.id}&canton=${girl.city.canton.slug}&city=${girl.city.slug}`;
  };

  const getAs = () => {
    if (!girl.city || !girl.city.canton) {
      return `/employees/${girl.id}/information`;
    }

    return `/${girlType}/${girl.city.canton.slug}/${girl.city.slug}/${girl.id}/information`;
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
          {girl.name}, {girl.age} <div className="inline-block bg-dark-green rounded-full w-2 h-2 ml-1" style={{marginBottom: 1.5}}></div>
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


  const isBlurPhoto = (photo) => {
    if (!photo) {
      return '';
    }


    return JSON.parse(photo.custom_properties).porn && !user;
  };

  const getPhoto = (photo) => {
    if (!photo) {
      return '/static/img/girl-no-photo.jpg';
    }

    if (isBlurPhoto(photo)) {
      // if (photo.thumb_blur_url) {
        photo.vip = true;
        // return photo.thumb_blur_url;
      // }
    }

    if (photo.thumb_url) {
      return photo.thumb_url;
    }

    return photo.url;
  };


  return (
    <div style={style || {}} className={cx(
      className ? className : "",
      profileCard ? 'girl_card-club' :'girls__item w-full',
      "bg-white border border-white",
      girl.isVip ? "border border-red" : "",
      sized ? "sized" : "",
      viewed ? "viewed" : ""
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
        <img
            className={cx(
              previewClass,
              isBlurPhoto(photo) ? 'blur' : ''
            )}
            src={getPhoto(photo)}
            alt={``}
        />
      ) : (
        <Slick
          className={cx(
              'lg:h-photo-lg w-full',
              slickClass
          )}
          id={girl.id}
          photos={girl.photos}
          labels={labels ? <Labels girl={girl} /> : null}
          slider={slider}
          available={available}
          link={getHref()}
          as={getLink(girl)}
          noPhotoSrc={`/static/img/girl-no-photo.jpg`}
          user={user}
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
    "object-cover w-full h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-md xl:h-e-photo-xl hd:h-e-photo-hd",
  slickClass: "h-photo sm:h-photo-sm md:h-photo-md hd:h-photo-md lg:h-photo-md",
  preview: false,
  available: false,
  labels: true,
  slider: true,
  sized: true,
  profileCard: false,
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
  profileCard: PropTypes.bool,
  viewed: PropTypes.bool,
};

export default GirlCard;
