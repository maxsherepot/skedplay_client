import React from "react";
import { AddPhotoSvg, BlackPlusSvg } from "icons";
import { Button, MultiPhotoField, MultiVideoField } from "UI";

const AdMediaStep = ({ photos, videos }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end mb-5">
        <div className="text-4xl font-extrabold leading-none">Photos</div>
        <span className="md:ml-6 text-xs md:text-lg">
          Maximum size of photos that can be aploaded is 10mb.
        </span>
      </div>

      <div className="flex flex-wrap">
        <MultiPhotoField name="photos" label="" initialValues={photos}>
          <Button
            className="px-3"
            level="primary-black"
            outline
            size="sm"
            type="button"
          >
            <div className="flex items-center">
              <BlackPlusSvg />
              <span className="ml-2">from device</span>
            </div>
          </Button>
        </MultiPhotoField>
      </div>

      <div className="flex flex-col md:flex-row md:items-end my-5">
        <div className="text-4xl font-extrabold leading-none">Video</div>
        <span className="md:ml-6 text-xs md:text-lg">
          Maximum size of video that can be aploaded is 100mb.
        </span>
      </div>

      <div className="flex flex-wrap">
        <MultiVideoField
          name="videos"
          label=""
          accept="video/mp4,video/x-m4v,video/*"
          initialValues={videos}
        >
          <div className="border border-light-grey border-dashed rounded-lg px-24 md:px-32 py-10 md:py-21">
            <div className="flex flex-col items-center">
              <AddPhotoSvg />
            </div>
          </div>
        </MultiVideoField>
      </div>
    </>
  );
};

export default AdMediaStep;
