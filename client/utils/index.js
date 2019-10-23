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
    start: null,
    end: null,
    available: true,
    order: 6,
    employee_id: null,
    club_id: null
  },
  {
    day: 1,
    start: null,
    end: null,
    available: true,
    order: 0,
    employee_id: null,
    club_id: null
  },
  {
    day: 2,
    start: null,
    end: null,
    available: true,
    order: 1,
    employee_id: null,
    club_id: null
  },
  {
    day: 3,
    start: null,
    end: null,
    available: true,
    order: 2,
    employee_id: null,
    club_id: null
  },
  {
    day: 4,
    start: null,
    end: null,
    available: true,
    order: 3,
    employee_id: null,
    club_id: null
  },
  {
    day: 5,
    start: null,
    end: null,
    available: true,
    order: 4,
    employee_id: null,
    club_id: null
  },
  {
    day: 6,
    start: null,
    end: null,
    available: true,
    order: 5,
    employee_id: null,
    club_id: null
  }
];

function defaultSchedule(schedule) {
  if (schedule && schedule.length !== 0) {
    return schedule.map(s => {
      return {
        club_id: null,
        ...s,
        start: s.start === null ? 0 : s.start
      }
    })
  }

  return defaultScheduleList;
}

export { transformValidationErrors, getErrors, setCookie, defaultSchedule };
