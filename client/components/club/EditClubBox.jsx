import React from "react";
import {useMutation} from "@apollo/react-hooks";
import {
  UPDATE_CLUB,
  SYNC_CLUB_PRICES,
  SYNC_CLUB_SERVICES,
  UPLOAD_CLUB_FILES,
  UPDATE_CLUB_SCHEDULE,
} from "queries";
import {getErrors, defaultSchedule} from "utils";
import {EditClubForm} from "components/club";
import {
  InformationStep,
  ServicesAndPricesStep,
  MediaStep,
  ScheduleStep,
} from "./steps";
import StepBox from "components/StepBox";
import {useTranslation} from "react-i18next";

const EditClubBox = ({club, user, refetchClub}) => {
  const {t, i18n} = useTranslation();

  const [updateClub] = useMutation(UPDATE_CLUB);
  const [syncClubPrices] = useMutation(SYNC_CLUB_PRICES);
  const [syncClubServices] = useMutation(SYNC_CLUB_SERVICES);
  const [uploadClubFiles] = useMutation(UPLOAD_CLUB_FILES);
  const [updateClubSchedule] = useMutation(UPDATE_CLUB_SCHEDULE);

  let services = {};
  let prices = {};

  club.services.forEach(s => {
    services[s.id] = {
      active: true,
      price: s.pivot.price,
    }
  });

  club.prices.forEach(p => prices[p.id] = p.pivot.price);

  const initialValues = {
    name: club.name,
    club_type_id: +club.type.id,
    description: club.description,
    index: club.index || "",
    city_id: club.city_id || "",
    address: club.address,
    phones: JSON.parse(club.phones),
    email: club.email,
    website: club.website,
    start_time: club.start_time,
    end_time: club.end_time,
    prices,
    services,
    photos: [],
    videos: [],
    custom_properties: [],
    schedule: defaultSchedule(club.schedule)
  };

  const onSubmitInfo = async values => {
    try {
      const {
        data: {
          updateClub: {status, message}
        }
      } = await updateClub({
        variables: {
          club: club.id,
          input: {
            ...values,
            phones: JSON.stringify(values.phones),
            prices: JSON.stringify(values.prices),
            services: JSON.stringify(values.services),
            schedule: JSON.stringify(values.schedule),
          }
        }
      });

      return {
        status,
        message
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const onSubmitPricesAndServices = async values => {
    try {
      const {
        data: {
          syncClubPrices: {status: priceStatus, message: priceMessage}
        }
      } = await syncClubPrices({
        variables: {
          club: club.id,
          prices: JSON.stringify(values.prices)
        }
      });

      const {
        data: {
          syncClubServices: {
            status: serviceStatus,
            message: serviceMessage
          }
        }
      } = await syncClubServices({
        variables: {
          club: club.id,
          services: JSON.stringify(values.services)
        }
      });

      return {
        status: serviceStatus && priceStatus,
        message: `${priceMessage}, ${serviceMessage}`
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const onSubmitMedia = async values => {
    try {
      const {
        data: {
          uploadClubFiles: {status: statusPhoto, message: messagePhoto}
        }
      } = await uploadClubFiles({
        variables: {
          club: club.id,
          collection: "club-photo",
          files: values.photos,
          custom_properties: JSON.stringify(values.custom_properties),
        }
      });

      const {
        data: {
          uploadClubFiles: {status: statusVideo, message: messageVideo}
        }
      } = await uploadClubFiles({
        variables: {
          club: club.id,
          collection: "club-video",
          files: values.videos,
        }
      });

      return {
        status: statusPhoto && statusVideo,
        message: messagePhoto || messageVideo
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const onSubmitSchedule = async values => {
    try {
      let payload = values.schedule.map(({day, start, end, order}) => {
        return {
          day,
          start: start === 0 ? null : start,
          end: start === 0 ? null : end,
          available: start !== 0,
          order,
          employee_id: null,
          club_id: club.id
        }

      });
      const {
        data: {
          updateClubSchedule: {status, message}
        }
      } = await updateClubSchedule({
        variables: {
          input: payload,
        }
      });

      const {
        data: {
          updateClub: {statusUpdateTime, messageUpdateTime}
        }
      } = await updateClub({
        variables: {
          club: club.id,
          input: {
            start_time: values.start_time,
            end_time: values.end_time,
          }
        }
      });

      return {
        status: status && statusUpdateTime,
        message: message || messageUpdateTime
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const links = [
    t('account.links.information'),
    t('account.links.services_and_prices'),
    t('account.links.photos_and_videos'),
    t('account.links.schedule_and_activation'),
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <StepBox links={links} canSetStep={true} />
      </div>

      <div className="border-b border-divider" />

      <EditClubForm initialValues={initialValues} user={user}>
        <EditClubForm.Step
          validationSchema={InformationStep.validationSchema}
          onStepSubmit={onSubmitInfo}
        >
          <InformationStep club={club}/>
        </EditClubForm.Step>

        <EditClubForm.Step onStepSubmit={onSubmitPricesAndServices}>
          <ServicesAndPricesStep/>
        </EditClubForm.Step>

        <EditClubForm.Step onStepSubmit={onSubmitMedia} showSubmit={false}>
          <MediaStep club={club} refetchClub={refetchClub}/>
        </EditClubForm.Step>

        <EditClubForm.Step onStepSubmit={onSubmitSchedule}>
          <ScheduleStep/>
        </EditClubForm.Step>
      </EditClubForm>
    </>
  );
};

export default EditClubBox;
