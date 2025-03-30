import React, { useState } from 'react';

const ProfilePage = () => {

    const [incomeEntries, setIncomeEntries] = useState([]);
    const [expenseEntries, setExpenseEntries] = useState([]);

    const addIncome = () => {
        setIncomeEntries([...incomeEntries, { id: Date.now(), name: '', date: '', amount: ''}]);
    };

    const addExpense = () => {
        setExpenseEntries([...expenseEntries, { id: Date.now(), name: '', date: '', amount: ''}]);
    };

    const updateEntry = (type, id, field, value) => {
        const setFunction = type === 'income' ? setIncomeEntries : setExpenseEntries;
        let entries = type === 'income' ? incomeEntries : expenseEntries;

        setFunction(entries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
    };


    const deleteEntry = (type, id) => {
        const setFunction = type === 'income' ? setIncomeEntries : setExpenseEntries;
        const entries = type === 'income' ? incomeEntries : expenseEntries;

        setFunction(entries.filter(entry => entry.id !== id));
    };

    let totalIncome = incomeEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    let totalExpenses = expenseEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const totalCapital = totalIncome - totalExpenses;

    return (
        <div className="max-h-fit flex flex-col p-4">
        <div className="max-w-4xl mx-auto w-full bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Budget Calculator</h2>

            <div className="flex justify-center gap-4 mb-4">
            <button 
                onClick={addIncome} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Add Income
            </button>
            <button 
                onClick={addExpense} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            + Add Expense
            </button>
            </div>

            <table className="w-full">
            <thead>
                <tr className="text-left text-sm text-gray-600">
                <th className="p-2">Type</th>
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount ($)</th>
                <th className="p-2 w-12"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
                
                {[...incomeEntries.map(e => ({ ...e, type: 'Income' })), ...expenseEntries.map(e => ({ ...e, type: 'Expense' }))].map((entry) => (
                    <tr
                    key={entry.id}
                    className={`rounded-lg shadow-sm ${entry.type === 'Income' ? 'bg-green-100' : 'bg-red-100'} mb-4`}
                    >
                    <td className="p-2">{entry.type}</td>
                    <td className="p-2">
                        <input
                        type="text"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.name}
                        onChange={(e) => updateEntry(entry.type.toLowerCase(), entry.id, 'name', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="date"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.date}
                        onChange={(e) => updateEntry(entry.type.toLowerCase(), entry.id, 'date', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="number"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.amount}
                        onChange={(e) => updateEntry(entry.type.toLowerCase(), entry.id, 'amount', e.target.value)}
                        />
                    </td>
                    <td className="p-2 text-center">
                        <button
                        onClick={() => deleteEntry(entry.type.toLowerCase(), entry.id)}
                        className="text-red-800 font-bold hover:text-red-900 text-lg"
                        >
                        &minus;
                        </button>
                    </td>
                    </tr>
                ))}
            </tbody>

            </table>

            <div className="mt-6 text-center text-lg font-medium">
            <p>Total Income: <span className="text-green-600">${totalIncome.toFixed(2)}</span></p>
            <p>Total Expenses: <span className="text-red-600">${totalExpenses.toFixed(2)}</span></p>
            <p className="mt-2 text-xl">
                <strong>Total Capital: ${totalCapital.toFixed(2)}</strong>
            </p>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;
