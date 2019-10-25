import React from "react";
import Link from "next/link";
import { Button } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";

const cards = [
    {
        title: "1 Card / Ad",
        icon: "user",
        buttonText: "Add new",
        link: "/girls/add"
    },
    {
        counter: "employees_events",
        title: "Events",
        icon: "star",
        buttonText: "Add new"
    }
];

const counters = [
    {
        counter: "employees_photos",
        title: "photos",
        icon: "photo",
        buttonText: null
    },
    {
        counter: "employees_videos",
        title: "videos",
        icon: "video",
        buttonText: null
    }
];

const PrivateBox = ({ user }) => {
    return (
        <>
            <div className="flex flex-wrap -mx-3">
                {cards &&
                cards.map(({ counter, title, icon, buttonText, link }, index) => (
                    <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5" key={index}>
                        <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                            <div className="flex flex-col justify-center h-full">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-bold mb-6">{`${counter ? user[counter]: ""} ${title}`}</span>
                                    {icon === "user" ? (
                                        <UserSvg />
                                    ) : (
                                        <StarSvg />
                                    )}
                                </div>
                                {link ? (
                                    <Link href={link}>
                                        <a>
                                            <Button className="w-2/3" size="sm">
                                                {buttonText}
                                            </Button>
                                        </a>
                                    </Link>
                                ) : (
                                    <Button className="w-2/3" size="sm">
                                        {buttonText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap -mx-3">
                {counters &&
                counters.map(({ counter, title, icon, buttonText }, index) => (
                    <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5" key={index}>
                        <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                            <div className="flex flex-col justify-center h-full">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-bold mb-6">{`${counter ? user[counter]: ""} ${title}`}</span>
                                    {icon === "photo" ? (
                                        <PhotoSvg />
                                    ) : (
                                        <VideoSvg />
                                    )}
                                </div>
                                {buttonText && (
                                    <Button className="w-2/3" size="sm">
                                        {buttonText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PrivateBox;
