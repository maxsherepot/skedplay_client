import React from "react";
import * as Yup from "yup";
import { AddPhotoSvg, BlackPlusSvg } from "icons";
import { Button, MultiPhotoField, MultiVideoField } from "UI";

const AdMediaStep = () => {
  return (
    <>
      <div className="flex items-end mb-5">
        <div className="text-4xl font-extrabold leading-none">Photos</div>
        <span className="ml-6 text-lg">
          Maximum size of photos that can be aploaded is 10mb.
        </span>
      </div>

      <div className="flex flex-wrap">
        <MultiPhotoField name="photos" label="">
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

      <div className="flex items-end my-5">
        <div className="text-4xl font-extrabold leading-none">Video</div>
        <span className="ml-6 text-lg">
          Maximum size of video that can be aploaded is 100mb.
        </span>
      </div>

      <div className="flex flex-wrap">
        <MultiVideoField
          name="videos"
          label=""
          accept="video/mp4,video/x-m4v,video/*"
        >
          <div className="border border-light-grey border-dashed rounded-lg px-32 py-21">
            <div className="flex flex-col items-center">
              <AddPhotoSvg />
            </div>
          </div>
        </MultiVideoField>
      </div>
    </>
  );
};

AdMediaStep.validationSchema = Yup.object().shape({
  // phone: Yup.string().required(),
  // recaptcha: Yup.string().required()
});

export default AdMediaStep;
