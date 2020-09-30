import {useQuery} from "@apollo/react-hooks";
import {GET_MY_EMPLOYEES, SETTINGS} from "queries";

export default ({employeesCount, children}) => {
  const {loading: settingsLoading, data: {settings} = {}} = useQuery(SETTINGS);

  const {loading: employeesLoading, data} = useQuery(GET_MY_EMPLOYEES, {
    skip: employeesCount !== undefined
  });

  const employees = (data && data.me && data.me.employees) || [];

  if (settingsLoading || employeesLoading) {
    return '';
  }

  if (employeesCount === undefined) {
    employeesCount = employees.length;
  }

  const canCreateCard = () => {
    if (!settings) {
      return false;
    }

    const maxCardsCount = settings.find(s => s.key === 'employee_cards_count');

    if (!maxCardsCount) {
      return false;
    }

    return employeesCount < maxCardsCount.value;
  };

  if (!canCreateCard()) {
    const maxCardsCount = (settings || []).find(s => s.key === 'employee_cards_count');
    return `${employeesCount} ${(maxCardsCount || {}).value}`;
    return '';
  }

  return children;
};