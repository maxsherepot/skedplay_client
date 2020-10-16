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
          <Button
            className="px-3"
            level="primary-black"
            outline
            size="sm"
            type="button"
          >
            <div className="flex items-center">
              <BlackPlusSvg />
              <span className="ml-2">{t('account.from_device')}</span>
            </div>
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row md:items-end my-5">
        <div className="text-xl sm:text-2xl font-bold leading-none">{t('clubs.video')}</div>
        <span className="md:ml-6 text-xs md:text-lg">
          {t('max_size_uploaded.video')}
        </span>
      </div>

      <div className="flex flex-wrap">
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
