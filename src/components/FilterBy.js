import React, { useState } from 'react';

function FilterBy({ currentDate, allMonths, allYears, handleChangeDate }) {
    const [monthActive, setMonthActive] = useState(currentDate.month);
    const [yearActive, setYearActive] = useState(currentDate.year);

    function getMonthName(monthNumber) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthNumber - 1];
    }

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonthActive(selectedMonth);
        handleChangeDate('month', selectedMonth);
    };

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYearActive(selectedYear);
        handleChangeDate('year', selectedYear);
    };

    return (
        <>
            <select
                id="month"
                value={monthActive}
                onChange={handleMonthChange}
            >
                {allMonths !== undefined && allMonths.length > 0 ?
                    allMonths.map((month, idx) =>
                        <option key={idx} value={month}>
                            {getMonthName(month)}
                        </option>
                    ) :
                    <option value={currentDate.month}>{getMonthName(currentDate.month)}</option>
                }
                <option value="all">See all</option>
            </select>

            <select
                id="year"
                value={yearActive}
                onChange={handleYearChange}
            >
                {allMonths !== undefined && allYears.length > 0 ?
                    allYears.map((year, idx) =>
                        <option key={idx} value={year}>
                            {year}
                        </option>
                    ) :
                    <option value={currentDate.year}>{currentDate.year}</option>
                }
            </select>
        </>
    );
}

export default FilterBy;
