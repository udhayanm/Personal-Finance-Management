import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase';
import FilterBy from './FilterBy';
import Form from './Form';
import ExpenseList from './ExpenseList';

function SectionType({ type }) {
    const location = useLocation().pathname;
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    
    const currentDate = useMemo(() => ({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    }), []);

    const [date, setDate] = useState(currentDate);
    const [allMonths, setAllMonths] = useState([]);
    const [allYears, setAllYears] = useState([]);

    const handleChangeDate = (id, value) => setDate({ ...date, [id]: value });

    useEffect(() => {
        setDate(currentDate);
    }, [location, currentDate]);

    useEffect(() => {
        const query = `/users/${auth.currentUser.uid}/${type}`;
        onValue(
            ref(db, query),
            snapshot => {
                const snapval = snapshot.val();
                if (snapval !== null) {
                    const availableYears = Object.keys(snapval);
                    if (!availableYears.includes(currentDate.year.toString())) {
                        availableYears.push(currentDate.year.toString());
                    }

                    const allMonthsByYear = Object.entries(snapval).map(([key, dbMonth]) => ({
                        [key]: Object.keys(dbMonth)
                    }));
                    if (!allMonthsByYear.some(year => Object.keys(year)[0] === currentDate.year.toString())) {
                        allMonthsByYear.push({ [currentDate.year.toString()]: [] });
                    }

                    const availableMonths = allMonthsByYear.find(year => Object.keys(year).toString() === date.year.toString())?.[date.year] || [];
                    if (!availableMonths.includes(currentDate.month.toString())) {
                        availableMonths.push(currentDate.month.toString());
                    }

                    setAllYears(availableYears);
                    setAllMonths(availableMonths);
                }
            }
        );
    }, [date, type, currentDate]);

    return (
        <section>
            <nav>
                <h2>{typeTitle}</h2>
                <FilterBy
                    currentDate={currentDate}
                    monthActive={date.month}
                    yearActive={date.year}
                    allMonths={allMonths}
                    allYears={allYears}
                    handleChangeDate={handleChangeDate}
                />
            </nav>

            <Form
                type={type}
                handleChangeDate={handleChangeDate}
            />

            <ExpenseList
                type={type}
                yearActive={date.year}
                monthActive={date.month}
            />
        </section>
    );
}

export default SectionType;
