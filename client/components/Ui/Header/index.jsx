import './Header.scss'

function Header() {
    return (
        <header className="relative">
            <nav className="fixed border-b border-black-opacity-10 top-0 left-0 w-full z-20">
                <div className="container mx-auto h-full">
                    <div className="flex justify-between h-full items-center">
                        <div className="flex h-full items-center"><a className="logo -mt-1" href="/"><img
                            src="/img/logo.svg" /></a>
                            <ul className="menu">
                                <li className="menu__item menu__item_dropdown">
                                    <ul>
                                        <li><a href="/girls.html">girls</a></li>
                                        <li><a href="/boys.html">boys</a></li>
                                        <li><a href="/couple.html">couple</a></li>
                                    </ul>
                                    <span>Girls
                    <svg className="inline-block stroke-white ml-1" width="15" height="8" viewBox="0 0 15 8" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 1L7.5 7L1 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg></span>
                                </li>
                                <li className="menu__item"><a href="/clubs.html">clubs</a></li>
                                <li className="menu__item"><a href="/events.html">events</a></li>
                            </ul>
                        </div>
                        <div className="menu-icons flex justify-between"><a className="menu-icons__item hidden md:block"
                                                                            href="#">EN
                            <svg className="inline-block stroke-red ml-1" width="11" height="6" viewBox="0 0 11 6"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1L5.5 5L1 1" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg></a><a className="menu-icons__item" href="#">
                            <svg className="inline-block stroke-red mr-1" width="17" height="15" viewBox="0 0 17 15"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.8434 2.14929C14.4768 1.78493 14.0417 1.4959 13.5627 1.2987C13.0837 1.1015 12.5704 1 12.0519 1C11.5335 1 11.0201 1.1015 10.5411 1.2987C10.0621 1.4959 9.62698 1.78493 9.26046 2.14929L8.49981 2.90512L7.73916 2.14929C6.99882 1.41366 5.9947 1.00038 4.94771 1.00038C3.90071 1.00038 2.89659 1.41366 2.15626 2.14929C1.41592 2.88493 1 3.88267 1 4.92302C1 5.96336 1.41592 6.9611 2.15626 7.69674L2.91691 8.45256L8.49981 14L14.0827 8.45256L14.8434 7.69674C15.21 7.33255 15.5009 6.90014 15.6994 6.42422C15.8979 5.94829 16 5.43818 16 4.92302C16 4.40785 15.8979 3.89774 15.6994 3.42182C15.5009 2.94589 15.21 2.51348 14.8434 2.14929Z"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            23</a><a className="menu-icons__item" href="#">
                            <svg className="inline-block fill-red mr-1" width="17" height="17" viewBox="0 0 17 17"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.33333 12.6667V12.1667C4.20073 12.1667 4.07355 12.2193 3.97978 12.3131L4.33333 12.6667ZM1 16H0.5C0.5 16.2022 0.621821 16.3846 0.808658 16.4619C0.995496 16.5393 1.21055 16.4966 1.35355 16.3536L1 16ZM2.66667 1V0.5V1ZM14.3333 1V0.5V1ZM4.6 3.5C4.32386 3.5 4.1 3.72386 4.1 4C4.1 4.27614 4.32386 4.5 4.6 4.5V3.5ZM12.4 4.5C12.6761 4.5 12.9 4.27614 12.9 4C12.9 3.72386 12.6761 3.5 12.4 3.5V4.5ZM4.6 5.9C4.32386 5.9 4.1 6.12386 4.1 6.4C4.1 6.67614 4.32386 6.9 4.6 6.9V5.9ZM10 6.9C10.2761 6.9 10.5 6.67614 10.5 6.4C10.5 6.12386 10.2761 5.9 10 5.9V6.9ZM4.6 8.3C4.32386 8.3 4.1 8.52386 4.1 8.8C4.1 9.07614 4.32386 9.3 4.6 9.3V8.3ZM11.2 9.3C11.4761 9.3 11.7 9.07614 11.7 8.8C11.7 8.52386 11.4761 8.3 11.2 8.3V9.3ZM15.5 11C15.5 11.3094 15.3771 11.6062 15.1583 11.825L15.8654 12.5321C16.2717 12.1257 16.5 11.5746 16.5 11H15.5ZM15.1583 11.825C14.9395 12.0437 14.6428 12.1667 14.3333 12.1667V13.1667C14.908 13.1667 15.4591 12.9384 15.8654 12.5321L15.1583 11.825ZM14.3333 12.1667H4.33333V13.1667H14.3333V12.1667ZM3.97978 12.3131L0.646447 15.6464L1.35355 16.3536L4.68689 13.0202L3.97978 12.3131ZM1.5 16V2.66667H0.5V16H1.5ZM1.5 2.66667C1.5 2.35725 1.62292 2.0605 1.84171 1.84171L1.1346 1.1346C0.728273 1.54093 0.5 2.09203 0.5 2.66667H1.5ZM1.84171 1.84171C2.0605 1.62292 2.35725 1.5 2.66667 1.5V0.5C2.09203 0.5 1.54093 0.728273 1.1346 1.1346L1.84171 1.84171ZM2.66667 1.5H14.3333V0.5H2.66667V1.5ZM14.3333 1.5C14.6428 1.5 14.9395 1.62292 15.1583 1.84171L15.8654 1.1346C15.4591 0.728273 14.908 0.5 14.3333 0.5V1.5ZM15.1583 1.84171C15.3771 2.0605 15.5 2.35725 15.5 2.66667H16.5C16.5 2.09203 16.2717 1.54093 15.8654 1.1346L15.1583 1.84171ZM15.5 2.66667V11H16.5V2.66667H15.5ZM4.6 4.5H12.4V3.5H4.6V4.5ZM4.6 6.9H10V5.9H4.6V6.9ZM4.6 9.3H11.2V8.3H4.6V9.3Z"></path>
                            </svg>
                            7</a><a className="menu-icons__item menu-icons__item_last hidden sm:block"
                                    href="/login.html">
                            <svg className="inline-block stroke-red mr-1" width="14" height="14" viewBox="0 0 14 14"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.9498 9.05023C11.1873 8.28784 10.2799 7.72343 9.28974 7.38177C10.3502 6.65139 11.0469 5.42905 11.0469 4.04688C11.0469 1.81543 9.23144 0 7 0C4.76856 0 2.95312 1.81543 2.95312 4.04688C2.95312 5.42905 3.64982 6.65139 4.71029 7.38177C3.72017 7.72343 2.81269 8.28784 2.05026 9.05023C0.728137 10.3724 0 12.1302 0 14H1.09375C1.09375 10.7433 3.74328 8.09375 7 8.09375C10.2567 8.09375 12.9062 10.7433 12.9062 14H14C14 12.1302 13.2719 10.3724 11.9498 9.05023ZM7 7C5.37165 7 4.04688 5.67525 4.04688 4.04688C4.04688 2.4185 5.37165 1.09375 7 1.09375C8.62835 1.09375 9.95312 2.4185 9.95312 4.04688C9.95312 5.67525 8.62835 7 7 7Z"></path>
                            </svg>
                            Login</a>
                            <button className="menu-icons__item menu-icons__item_last md:hidden pr-0"
                                    id="menu-hamburger" onClick="toggleMobileMenu()">
                                <svg className="stroke-white mt-1" width="20" height="14" viewBox="0 0 20 14"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7H19M1 1H19M1 13H19" stroke="white" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <svg className="stroke-white mt-1" width="18" height="18" viewBox="0 0 22 22"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 2L2 20M2 2L20 20" stroke-width="3" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu" id="mobile-menu">
                    <div className="container">
                        <ul>
                            <li><a href="/girls.html">girls</a></li>
                            <li><a href="/boys.html">boys</a></li>
                            <li><a href="/couple.html">couple</a></li>
                            <li><a href="/clubs.html">clubs</a></li>
                            <li><a href="/events.html">events</a></li>
                        </ul>
                        <button className="btn text-2xl mt-1">Add new ad
                        </button>
                        <a className="block text-center transition tracking-tighter text-white hover:text-red text-2xl font-medium my-8 "
                           href="#">My account</a>
                        <div className="locales"><a className="active" href="#ru">ru</a><a href="#en">en</a><a
                            href="#ch">ch</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto relative z-10 overflow-hidden">
                <div className="flex flex-col xl:flex-row">
                    <div className="flex flex-col md:flex-row xl:flex-col">
                        <div className="block text-white pl-1 pt-7 sm:pl-4 sm:pt-8 md:pl-8 xl:pl-0 xl:pt-22">
                            <div
                                className="block relative z-10 font-extrabold uppercase tracking-tighter leading-tight text-4-65xl sm:text-5-75xl md:text-6-5xl xl:text-7xl">
                                <div className="block">Intimate
                                </div>
                                <div
                                    className="block ml-15 -mt-4 sm:ml-20 sm:-mt-6 md:ml-26 md:-mt-8 xl:-mt-10">serveces
                                </div>
                            </div>
                            <div
                                className="flex items-center font-medium tracking-tighter whitespace-no-wrap text-4xl -mt-6 sm:text-5xl sm:-mt-8 md:text-5-5xl md:-mt-8 xl:text-6xl xl:-mt-10">
                                <div className="block mr-5 md:mr-6">of Switzerland
                                </div>
                                <div className="block header-red-ellipse md:-mt-1">№1
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-wrap mt-6 sm:mt-10 sm:justify-between md:flex-col md:ml-12 md:mt-12 lg:ml-24 xl:flex-row xl:justify-start xl:ml-0 xl:mt-16">
                            <div
                                className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                                <div className="block text-white font-extrabold text-2xl">11 243
                                </div>
                                <div className="flex text-white text-xl">
                                    <div className="w-9 border-t border-yellow mr-3 mt-3"></div>
                                    girls
                                </div>
                            </div>
                            <div
                                className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                                <div className="block text-white font-extrabold text-2xl">350
                                </div>
                                <div className="flex text-white text-xl">
                                    <div className="w-9 border-t border-yellow mr-3 mt-3"></div>
                                    clubs
                                </div>
                            </div>
                            <div
                                className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                                <div className="block text-white font-extrabold text-2xl">23
                                </div>
                                <div className="flex text-white text-xl">
                                    <div className="w-9 border-t border-yellow mr-3 mt-3"></div>
                                    events today
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative md:mt-2 xl:flex xl:self-end xl:mb-6 xl:mt-0 xl:flex-col xl:ml-10 hd:ml-42">
                        <div className="flex text-white items-end leading-none">
                            <div className="text-4xl font-extrabold tracking-tighter">Fresh events
                            </div>
                            <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4" href="#">All
                                events
                                <svg className="inline-block stroke-red ml-1" width="13" height="16" viewBox="0 0 13 16"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 8H12M12 8L5.14286 15M12 8L5.14286 1" stroke-linejoin="round"></path>
                                </svg></a>
                        </div>
                        <div className="mt-7 md:hidden">
                            <div className="flex relative events-slide"><img className="block object-cover w-full"
                                                                             src="/uploads/models/8.jpg" />
                                <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                    <div
                                        className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none absolute top-0 left-0 bg-yellow mt-5 ml-5">SPECIAL
                                        D.
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6">
                                        <div
                                            className="font-extrabold text-2xl leading-tight mb-1 sm:text-4xl sm:mb-3">Fünfter
                                            European- Blowjob- Contest
                                        </div>
                                        <div className="flex font-medium text-lg leading-none">
                                            <div className="block">18.07</div>
                                            <div className="block ml-4">Karlheinz Stockhausen, 23</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5">
                                <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-red"></div>
                                <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider"></div>
                                <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider"></div>
                                <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider"></div>
                                <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider"></div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="gallery-accordion mt-7">
                                <div className="gallery-accordion__item flex relative"><img
                                    className="block object-cover w-full" src="/uploads/models/1.jpg" />
                                    <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                        <div
                                            className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-yellow">SPECIAL
                                            D.
                                        </div>
                                        <div className="gallery-accordion__item__name">Fünfter European-Blowjob-Contest
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                                            <div className="flex font-medium text-lg leading-none">
                                                <div className="block">18.07</div>
                                                <div className="block ml-4 gallery-accordion__item__address">Karlheinz
                                                    Stockhausen, 23
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-accordion__item flex relative"><img
                                    className="block object-cover w-full" src="/uploads/models/8.jpg" />
                                    <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                        <div
                                            className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-red">SPECIAL
                                            D.
                                        </div>
                                        <div className="gallery-accordion__item__name">Fünfter European-Blowjob-Contest
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                                            <div className="flex font-medium text-lg leading-none">
                                                <div className="block">18.07</div>
                                                <div className="block ml-4 gallery-accordion__item__address">Karlheinz
                                                    Stockhausen, 23
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-accordion__item flex relative"><img
                                    className="block object-cover w-full" src="/uploads/models/9.jpg"/>
                                    <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                        <div
                                            className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-light-blue">SPECIAL
                                            D.
                                        </div>
                                        <div className="gallery-accordion__item__name">Silvester Party
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                                            <div className="flex font-medium text-lg leading-none">
                                                <div className="block">18.07</div>
                                                <div className="block ml-4 gallery-accordion__item__address">Karlheinz
                                                    Stockhausen, 23
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-accordion__item flex relative"><img
                                    className="block object-cover w-full" src="/uploads/models/11.jpg" />
                                    <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                        <div
                                            className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-pink">SPECIAL
                                            D.
                                        </div>
                                        <div className="gallery-accordion__item__name">Mega Poolparty
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                                            <div className="flex font-medium text-lg leading-none">
                                                <div className="block">18.07</div>
                                                <div className="block ml-4 gallery-accordion__item__address">Karlheinz
                                                    Stockhausen, 23
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-accordion__item flex relative"><img
                                    className="block object-cover w-full" src="/uploads/models/12.jpg" />
                                    <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                                        <div
                                            className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-green">SPECIAL
                                            D.
                                        </div>
                                        <div className="gallery-accordion__item__name">Übernachtungsmöglichkeiten
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                                            <div className="flex font-medium text-lg leading-none">
                                                <div className="block">18.07</div>
                                                <div className="block ml-4 gallery-accordion__item__address">Karlheinz
                                                    Stockhausen, 23
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;