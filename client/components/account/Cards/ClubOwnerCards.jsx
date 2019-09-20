import React from "react";
import Link from "next/link";
import { Button } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";

const counters = [
  {
    title: "2 Events",
    icon: "star",
    buttonText: "Add new"
  },
  {
    title: "233 photos",
    icon: "photo",
    buttonText: null
  },
  {
    title: "2 videos",
    icon: "video",
    buttonText: null
  }
];

const ClubOwnerCards = ({ user }) => {
  // Temp access to first club
  const [club] = user.clubs;
  const [phone] = JSON.parse(club.phones);

  return (
    <>
      <div className="flex items-center">
        <div className="text-3xl font-extrabold">{club.name}</div>
        <div className="bg-dark-green text-white text-xs rounded-full uppercase mt-1 ml-3 px-3 py-1">
          {club.type.name}
        </div>
      </div>
      <div className="flex items-center my-3">
        <div className="mr-4">{phone}</div>
        <div>Admin: D.Busch</div>
      </div>
      <div className="flex w-2/3 border border-divider rounded-lg p-5">
        {/* Position absolute user icon */}
        <span className="text-2xl font-extrabold">5 sex workers</span>
        <div className="flex">
          <div className="flex flex-col">
            <span className="text-xl">My Cards/AD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Another</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mt-5">
        <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
          <div className="h-full p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between">
                <span className="text-2xl font-extrabold mb-6">1 Event</span>
                <PhotoSvg></PhotoSvg>
              </div>
              <Button className="w-2/3" size="sm">
                Add new
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
          <div className="p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer mb-6">
            <div className="flex flex-col justify-center">
              <div className="flex justify-between">
                <span className="text-2xl font-extrabold mb-6">233 photos</span>
                <PhotoSvg></PhotoSvg>
              </div>
            </div>
          </div>
          <div className="p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-center">
              <div className="flex justify-between">
                <span className="text-2xl font-extrabold mb-6">7 videos</span>
                <PhotoSvg></PhotoSvg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubOwnerCards;
