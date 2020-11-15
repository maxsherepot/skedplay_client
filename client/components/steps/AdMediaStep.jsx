import React, {useState} from "react";
import { AddPhotoSvg, BlackPlusSvg } from "icons";
import { Button, MultiPhotoField, MultiVideoField, DeletePopup } from "UI";
import {useTranslation} from "react-i18next";

const AdMediaStep = ({ photos, videos, employeeId, refetchEmployee, submitOnChange = true }) => {
  const {t, i18n} = useTranslation();
  const [key, setKey] = useState(1);

  const reset = () => {
    if (refetchEmployee) {
      refetchEmployee().then(() => {
        setKey(+key + 1);
      });
    }
  };

  return (
    <>
      <MultiPhotoField
        key={key}
        name="photos"
        label=""
        initialValues={photos}
        submitOnChange={submitOnChange}
        refetchEntity={reset}
        modelId={employeeId}
        modelType={'employee'}
        mediaCollection={'employee-photo'}
        trigger={
          <div className="border border-light-grey border-dashed rounded-lg sm:w-full w-1/2 md:w-38 rounded-lg px-2 mb-6 min flex items-center justify-center -mt-4">
            <div className="flex flex-col items-center">
              <AddPhotoSvg />
            </div>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row md:items-end my-5 scale lg:-mt-2">
        <div className="text-xl sm:text-2xl font-bold leading-none">{t('clubs.video')}</div>
        <span className="md:ml-6 text-xs md:text-lg">
          {t('max_size_uploaded.video')}
        </span>
      </div>

      <div className="flex flex-wrap scale lg:-mt-10">
        <MultiVideoField
          name="videos"
          label=""
          accept="video/mp4,video/x-m4v,video/*"
          initialValues={videos}
          submitOnChange={submitOnChange}
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
