import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db, auth } from '../firebase';
import { uid } from 'uid';
import FormUI from './FormUI';

function Form({ type, handleChangeDate }) {
    const initVals = { name: '', price: '', date: new Date().toISOString().split('T')[0] };
    const [newExpense, setNewExpense] = useState(initVals);

    function handleChange(e) {
        const { id, value } = e.target;
        setNewExpense({ ...newExpense, [id]: value });
    }

    function handleReset() {
        setNewExpense(initVals);
    }

    function addUserExpense(e) {
        e.preventDefault();

        const trimmedExpense = {};
        for (const key in newExpense) {
            if (Object.hasOwnProperty.call(newExpense, key)) {
                trimmedExpense[key] = newExpense[key].trim();
            }
        }
        if (Object.values(trimmedExpense).some(value => value === '')) {
            return;
        }

        const getExpenseDate = new Date(newExpense.date);
        const yearExpense = getExpenseDate.getFullYear();
        const monthExpense = getExpenseDate.getMonth() + 1;
        const idExpense = uid();

        set(
            ref(db, `/users/${auth.currentUser.uid}/${type}/${yearExpense}/${monthExpense}/${idExpense}/`),
            { ...trimmedExpense, id: idExpense }
        )
        .then(() => console.log(`${type !== 'earnings' ? 'Expense' : 'Earning'} saved successfully!`))
        .catch(err => console.log(err));

        setNewExpense(initVals);
        handleChangeDate('month', monthExpense);
    }

    return (
        <FormUI
            handleSubmit={addUserExpense}
            type={type}
            valueData={newExpense}
            handleChange={handleChange}
            handleReset={handleReset}
        />
    );
}

export default Form;
