import React, { useState } from "react";
import classNames from "classnames";
import Link from 'components/SlashedLink'

import { ProfileSvg, CrownSvg } from "icons";
import { Logo, Button, Lang, FavoritesCount, MobileDrawerMenu, MobileDrawerCategory } from "UI";
// import { UserDropdown } from "components/user";
import { usePrevious, useWindowScrollPosition } from "hooks";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import favorites from "services/favorites";
import cx from 'classnames';

import dynamic from "next/dynamic";

const UserDropdown = dynamic(import("components/user/UserDropdown"));

const FavoriteBlock = () => {
  const { data: { favorites_count } = {}, client } = favorites.getFavoritesCount();

  return (
    <Link href="/favorites/girls">
      <a className="menu-icons__item hovered">
        {favorites_count > 0 ? (
          <svg
            className="inline-block stroke-red fill-red mr-1"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8434 2.14929C14.4768 1.78493 14.0417 1.4959 13.5627 1.2987C13.0837 1.1015 12.5704 1 12.0519 1C11.5335 1 11.0201 1.1015 10.5411 1.2987C10.0621 1.4959 9.62698 1.78493 9.26046 2.14929L8.49981 2.90512L7.73916 2.14929C6.99882 1.41366 5.9947 1.00038 4.94771 1.00038C3.90071 1.00038 2.89659 1.41366 2.15626 2.14929C1.41592 2.88493 1 3.88267 1 4.92302C1 5.96336 1.41592 6.9611 2.15626 7.69674L2.91691 8.45256L8.49981 14L14.0827 8.45256L14.8434 7.69674C15.21 7.33255 15.5009 6.90014 15.6994 6.42422C15.8979 5.94829 16 5.43818 16 4.92302C16 4.40785 15.8979 3.89774 15.6994 3.42182C15.5009 2.94589 15.21 2.51348 14.8434 2.14929Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="inline-block stroke-red mr-1"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8434 2.14929C14.4768 1.78493 14.0417 1.4959 13.5627 1.2987C13.0837 1.1015 12.5704 1 12.0519 1C11.5335 1 11.0201 1.1015 10.5411 1.2987C10.0621 1.4959 9.62698 1.78493 9.26046 2.14929L8.49981 2.90512L7.73916 2.14929C6.99882 1.41366 5.9947 1.00038 4.94771 1.00038C3.90071 1.00038 2.89659 1.41366 2.15626 2.14929C1.41592 2.88493 1 3.88267 1 4.92302C1 5.96336 1.41592 6.9611 2.15626 7.69674L2.91691 8.45256L8.49981 14L14.0827 8.45256L14.8434 7.69674C15.21 7.33255 15.5009 6.90014 15.6994 6.42422C15.8979 5.94829 16 5.43818 16 4.92302C16 4.40785 15.8979 3.89774 15.6994 3.42182C15.5009 2.94589 15.21 2.51348 14.8434 2.14929Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <FavoritesCount/>
      </a>
    </Link>
  );
};

const VipButton = ({whiteTheme}) => {
  const { t, i18n } = useTranslation();
  const [vipHover, setVipHover] = useState(false);

  const getColor = () => {
    if (!whiteTheme) {
      return '#FFF'
    }

    return vipHover ? '#FFF' : '#FF3366';
  };

  const getTextClass = () => {
    if (!whiteTheme) {
      return '#FFF'
    }

    return vipHover ? 'text-white' : 'text-red'
  };

  return (
    <Link href="/vip-escort">
      <Button
        size="xxs"
        weight="normal"
        level="primary"
        className="flex items-center px-2 text-xs"
        outline
        onMouseEnter={() => setVipHover(true)}
        onMouseLeave={() => setVipHover(false)}
      >
        <CrownSvg color={getColor()}/>
        <span
          className={cx(
            "ml-1",
            // vipHover ? 'text-white' : 'text-red',
            getTextClass()
          )}
        >
          {t('common.vip').toUpperCase()}
        </span>
      </Button>
    </Link>
  );
};

const NAV_HEIGHT = 90;

function Nav({ user, className }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [nav, toggleNav] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  let { y: currentY } = useWindowScrollPosition({
    throttle: 500
  });

  const prevY = usePrevious(currentY || 0);

  const isYMoreNavHeight = currentY >= NAV_HEIGHT;

  const isHidden = currentY >= prevY && isYMoreNavHeight;
  const isInverse = currentY < prevY && isYMoreNavHeight;

  const handleToggleNav = () => {
    // if (!nav) {
    //   document.querySelector("body").classList.add("fixed");
    // } else {
    //   document.querySelector("body").classList.remove("fixed");
    // }

    toggleNav(!nav);
  };

  // const whiteTheme = (className || '').indexOf('nav__theme_white') !== -1;
  const whiteTheme = isInverse || router.pathname !== '/';

  return (
    <nav
      className={classNames(
        "nav fixed border-b border-black-opacity-10 top-0 left-0 w-full z-50",
        {
          "nav-up": isHidden,
          nav__theme_white: isInverse
        },
        className
      )}
    >
      <div className="container mx-auto h-full">
        <div className="flex justify-between h-full items-center">
          <div className="flex h-full items-center">
            <Link href="/">
              <a className="logo -mt-1">
                <Logo color={isInverse ? "black" : "white"} />
              </a>
            </Link>
            <ul className="menu">
              <li className="menu__item menu__item_dropdown select__section">
                <ul>
                  <li>
                    <Link href="/girls">
                      <a>{t('common.girls')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trans">
                      <a>{t('common.trans')}</a>
                    </Link>
                  </li>
                </ul>
                <span>
                  <span className="capitalize">
                    {t('common.girls')}
                  </span>
                  <span className="inline-block">
                    <img src="/static/img/arrow-down.svg"/>
                  </span>
                  <svg
                    className="inline-block strokeWhite"
                    width="15"
                    height="8"
                    viewBox="0 0 15 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 1L7.5 7L1 1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>
              <li className="menu__item">
                <Link href="/clubs">
                  <a>{t('common.clubs')}</a>
                </Link>
              </li>
              <li className="menu__item">
                <Link href="/events">
                  <a>{t('common.events')}</a>
                </Link>
              </li>
              <li className="flex items-center">
                <VipButton whiteTheme={whiteTheme}/>
              </li>
            </ul>
          </div>
          <div className="menu-icons flex items-center justify-between">
            <span className="menu-icons__item hidden md:block">
              <Lang black={isInverse || router.pathname !== '/'}/>
            </span>

            {(user && user.is_club_owner && user.clubs.length > 0) &&
              <Link href="/account">
                <a className="menu-icons__item hidden sm:block">
                  <button className="bg-red text-white px-5 py-2 rounded-full">
                    {t('layout.edit_my_clubs')}
                  </button>
                </a>
              </Link>
            }

            {(user && user.is_employee && !user.employee) &&
              <Link href="/girls/add">
                <a className="menu-icons__item hidden sm:block">
                  <button className="bg-red text-white px-5 py-2 rounded-full">
                    {t('common.add_new_ad')}
                  </button>
                </a>
              </Link>
            }

            {/*{(user && user.is_employee && user.employee) &&*/}
            {/*  <Link href="/account/ad">*/}
            {/*    <a className="menu-icons__item hidden sm:block">*/}
            {/*      <button className="bg-red text-white px-5 py-2 rounded-full">*/}
            {/*        {t('layout.edit_ad')}*/}
            {/*      </button>*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*}*/}

            <Button
              size="xxs"
              weight="normal"
              level="primary"
              className="category-button flex items-center px-2 text-xs mx-2 sm:hidden"
              outline
              onClick={() => setIsCategoryOpen(true)}
            >
              CATEGORY
            </Button>


            <FavoriteBlock/>

            {(user && !user.is_club_owner) &&
              <Link href="/account/messages-and-chats">
                <a className="menu-icons__item hovered">
                  <svg
                    className="inline-block fill-red mr-1"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.33333 12.6667V12.1667C4.20073 12.1667 4.07355 12.2193 3.97978 12.3131L4.33333 12.6667ZM1 16H0.5C0.5 16.2022 0.621821 16.3846 0.808658 16.4619C0.995496 16.5393 1.21055 16.4966 1.35355 16.3536L1 16ZM2.66667 1V0.5V1ZM14.3333 1V0.5V1ZM4.6 3.5C4.32386 3.5 4.1 3.72386 4.1 4C4.1 4.27614 4.32386 4.5 4.6 4.5V3.5ZM12.4 4.5C12.6761 4.5 12.9 4.27614 12.9 4C12.9 3.72386 12.6761 3.5 12.4 3.5V4.5ZM4.6 5.9C4.32386 5.9 4.1 6.12386 4.1 6.4C4.1 6.67614 4.32386 6.9 4.6 6.9V5.9ZM10 6.9C10.2761 6.9 10.5 6.67614 10.5 6.4C10.5 6.12386 10.2761 5.9 10 5.9V6.9ZM4.6 8.3C4.32386 8.3 4.1 8.52386 4.1 8.8C4.1 9.07614 4.32386 9.3 4.6 9.3V8.3ZM11.2 9.3C11.4761 9.3 11.7 9.07614 11.7 8.8C11.7 8.52386 11.4761 8.3 11.2 8.3V9.3ZM15.5 11C15.5 11.3094 15.3771 11.6062 15.1583 11.825L15.8654 12.5321C16.2717 12.1257 16.5 11.5746 16.5 11H15.5ZM15.1583 11.825C14.9395 12.0437 14.6428 12.1667 14.3333 12.1667V13.1667C14.908 13.1667 15.4591 12.9384 15.8654 12.5321L15.1583 11.825ZM14.3333 12.1667H4.33333V13.1667H14.3333V12.1667ZM3.97978 12.3131L0.646447 15.6464L1.35355 16.3536L4.68689 13.0202L3.97978 12.3131ZM1.5 16V2.66667H0.5V16H1.5ZM1.5 2.66667C1.5 2.35725 1.62292 2.0605 1.84171 1.84171L1.1346 1.1346C0.728273 1.54093 0.5 2.09203 0.5 2.66667H1.5ZM1.84171 1.84171C2.0605 1.62292 2.35725 1.5 2.66667 1.5V0.5C2.09203 0.5 1.54093 0.728273 1.1346 1.1346L1.84171 1.84171ZM2.66667 1.5H14.3333V0.5H2.66667V1.5ZM14.3333 1.5C14.6428 1.5 14.9395 1.62292 15.1583 1.84171L15.8654 1.1346C15.4591 0.728273 14.908 0.5 14.3333 0.5V1.5ZM15.1583 1.84171C15.3771 2.0605 15.5 2.35725 15.5 2.66667H16.5C16.5 2.09203 16.2717 1.54093 15.8654 1.1346L15.1583 1.84171ZM15.5 2.66667V11H16.5V2.66667H15.5ZM4.6 4.5H12.4V3.5H4.6V4.5ZM4.6 6.9H10V5.9H4.6V6.9ZM4.6 9.3H11.2V8.3H4.6V9.3Z" />
                  </svg>
                  <span>
                    {user.is_employee ? user.employee.unread_messages_count || 0 : user.unread_messages_count || 0}
                  </span>
                </a>
              </Link>
            }

            {user ? (
              <UserDropdown user={user} />
            ) : (
              <>
                <Link href="/login">
                  <a className="menu-icons__item hovered menu-icons__item_last hidden sm:block">
                    <ProfileSvg />
                    {t('common.login')}
                  </a>
                </Link>

                <Link href="/register">
                  <a className="menu-icons__item hovered menu-icons__item_last hidden sm:block last">
                    {t('common.sign_up')}
                  </a>
                </Link>
              </>
            )}

            <button
              className="menu-icons__item menu-icons__item_last md:hidden pr-0"
              id="menu-hamburger"
              onClick={() => setIsAccountOpen(true)}
            >
                <ProfileSvg />
            </button>
          </div>
        </div>
      </div>
      <MobileDrawerMenu user={user} isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)}/>
      <MobileDrawerCategory user={user} isOpen={isCategoryOpen} onClose={() => setIsCategoryOpen(false)}/>
      <div
        className={classNames("hidden mobile-menu", {
          open: nav
        })}
        id="mobile-menu"
      >
        <div className="container">
          <ul>
            <li onClick={handleToggleNav}>
              <Link href="/girls">
                <a>{t('common.girls')}</a>
              </Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href="/trans">
                <a>{t('common.trans')}</a>
              </Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href="/clubs">
                <a>{t('common.clubs')}</a>
              </Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href="/events">
                <a>{t('common.events')}</a>
              </Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href="/vip-escort">
                <a>{t('common.vip')}</a>
              </Link>
            </li>
          </ul>
          {(user && user.is_club_owner) &&
            <Link href="/clubs/add">
              <a>
                <Button className="w-full text-2xl mt-1" onClick={handleToggleNav}>{t('common.add_new_club')}</Button>
              </a>
            </Link>
          }
          {(user && user.is_employee && !user.employee) &&
            <Link href="/girls/add">
              <a>
                <Button className="w-full text-2xl mt-1" onClick={handleToggleNav}>{t('common.add_new_ad')}</Button>
              </a>
            </Link>
          }
          {(user && user.is_employee && user.employee) &&
            <Link href="/account/ad">
              <a>
                <Button className="w-full text-2xl mt-1" onClick={handleToggleNav}>{t('layout.edit_ad')}</Button>
              </a>
            </Link>
          }
          {user ? (
            <Link href="/account" as={`/account`}>
              <a onClick={handleToggleNav} className="block text-center transition tracking-tighter text-white hover:text-red text-2xl font-medium my-8">
                {t('common.my_account')}
              </a>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <a onClick={handleToggleNav} className="block text-center transition tracking-tighter text-white hover:text-red text-2xl font-medium my-8">
                  {t('common.login')}
                </a>
              </Link>
              <Link href="/register">
                <a onClick={handleToggleNav} className="block text-center transition tracking-tighter text-white hover:text-red text-2xl font-medium my-8">
                  {t('common.sign_up')}
                </a>
              </Link>
            </>
          )}
          <Lang mobile={true} />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
