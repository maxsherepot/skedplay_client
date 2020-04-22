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

const EditClubBox = ({club, user}) => {
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
        index: club.index,
        city_id: club.city_id,
        address: club.address,
        phones: JSON.parse(club.phones),
        email: club.email,
        website: club.website,
        prices,
        services,
        photos: [],
        videos: [],
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
                    files: values.photos
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
                    files: values.videos
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
            let payload = values.schedule.map(({day, start, end, order }) => {
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

    return (
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

            <EditClubForm.Step onStepSubmit={onSubmitMedia}>
                <MediaStep club={club}/>
            </EditClubForm.Step>

            <EditClubForm.Step onStepSubmit={onSubmitSchedule}>
                <ScheduleStep/>
            </EditClubForm.Step>
        </EditClubForm>
    );
};

export default EditClubBox;
