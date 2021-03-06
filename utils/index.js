/** https://github.com/jaredpalmer/formik/issues/33#issuecomment-519081116 */
/** https://github.com/dostu/react-apollo-realworld-example-app/blob/master/src/apolloHelpers.js */

const transformValidationErrors = errors => {
  return errors;
};

const getErrors = e => {
  if (e && e.graphQLErrors && e.graphQLErrors.length) {
    const [error] = e.graphQLErrors;

    switch (error.extensions.category) {
      case "validation":
        return transformValidationErrors(
          error.extensions[error.extensions.category]
        );
      case "authentication":
        return error.message;

      default:
        break;
    }
  }

  return null;
};

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options
  };

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

const defaultScheduleList = [
  {
    day: 0,
    start: 'day_off',
    end: null,
    available: true,
    order: 6,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 1,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 0,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 2,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 1,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 3,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 2,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 4,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 3,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 5,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 4,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  },
  {
    day: 6,
    start: '00:00',
    end: '24:00',
    available: true,
    order: 5,
    employee_id: null,
    club_id: null,
    address: null,
    at_address: 0,
  }
];

function defaultSchedule(schedule) {
  if (schedule && schedule.length !== 0) {
    return schedule.map(s => {
      return {
        ...s,
        start: s.start === null ? 0 : s.start,
        club_id: s.club_id
          ? `${s.club_id}`
          : s.at_address
            ? 0
            : null,
      }
    })
  }

  return defaultScheduleList;
}

export { transformValidationErrors, getErrors, setCookie, defaultSchedule };
