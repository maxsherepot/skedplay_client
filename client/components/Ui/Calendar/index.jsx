import React, {useState} from "react";
import * as dateFns from "date-fns";
import {ArrowNextSvg, ArrowPrevSvg} from "components/icons";
import {useTranslation} from "react-i18next";

const Calendar = ({club}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const employees = club.employees.map(e => ({id: e.id, schedule: e.schedule}));
    const workers = Array(7).fill(0);

    for (let i = 0; i < 7; i++) {
        employees.map(employee => {
            employee.schedule.find(s => (s.day === i) && (s.available === true) && (workers[i] = workers[s.day] + 1))
        });
    }

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header flex flex-row">
                <div className="flex flex-col col-start">
                    <div className="icon" onClick={prevMonth}>
                        <ArrowPrevSvg/>
                    </div>
                </div>
                <div className="flex flex-col col-center">
                    <span>
                      {dateFns.format(currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="flex flex-col col-end" onClick={nextMonth}>
                    <div className="icon">
                        <ArrowNextSvg/>
                    </div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "eee";
        const days = [];
        let startDate = dateFns.startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center text-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="body header flex flex-row text-right">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const {t} = useTranslation();

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                days.push(
                    <div
                        className={`col cell border border-divider rounded-lg ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled" : ""
                        }`}
                        key={day}
                    >
                        <span className="number">{formattedDate}</span>
                        {dateFns.isSameMonth(day, monthStart) && (
                            <span className="describe">{workers[i]} {t('common.workers')}</span>
                        )}
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="flex flex-row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    };

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1));
    };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;