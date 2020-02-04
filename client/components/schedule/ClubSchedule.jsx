import React from "react";
import PropTypes from "prop-types";
import { GET_CLUB_SCHEDULE } from "queries";
import { useQuery } from "@apollo/react-hooks";
import Schedule from "./Schedule";
import {Loader} from 'UI';

const ClubSchedule = ({ club, ...rest }) => {
  const {
    data: { schedule_period, club_schedule: schedule } = {},
    loading
  } = useQuery(GET_CLUB_SCHEDULE, {
    variables: {
      club_id: club.id
    }
  });

  if (loading) {
    return <Loader/>;
  }

  return (
    <Schedule schedule={schedule} schedule_period={schedule_period} {...rest} />
  );
};

ClubSchedule.propTypes = {
  title: PropTypes.string.isRequired,
  club: PropTypes.object
};

export default ClubSchedule;
