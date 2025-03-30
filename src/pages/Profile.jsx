import React, { useState } from 'react';

const ProfilePage = () => {

    //Budget States
    const [incomeEntries, setIncomeEntries] = useState([]);
    const [expenseEntries, setExpenseEntries] = useState([]);

    //Budget Functions
    const addIncome = () => {
        setIncomeEntries([...incomeEntries, { id: Date.now(), name: '', date: '', amount: ''}]);
    };

    const addExpense = () => {
        setExpenseEntries([...expenseEntries, { id: Date.now(), name: '', date: '', amount: ''}]);
    };

    const updateAccount = (type, id, field, value) => {
        const setFunction = type === 'income' ? setIncomeEntries : setExpenseEntries;
        let entries = type === 'income' ? incomeEntries : expenseEntries;

        setFunction(entries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
    };


    const deleteAccount = (type, id) => {
        const setFunction = type === 'income' ? setIncomeEntries : setExpenseEntries;
        const entries = type === 'income' ? incomeEntries : expenseEntries;

        setFunction(entries.filter(entry => entry.id !== id));
    };

    const totalIncome = incomeEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const totalExpenses = expenseEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const totalCapital = totalIncome - totalExpenses;


    //Portfolio State
    const [portfolioEntries, setPortfolioEntries] = useState([]);

    //Portfolio Functions
    const addHolding = () => {
        setPortfolioEntries([...portfolioEntries, { id: Date.now(), type: 'Stock', name: '', date: '', quantity: '', buyPrice: '', currentPrice: ''}]);
    };

    const updateHolding = (id, field, value) => {
        setPortfolioEntries(portfolioEntries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
    };

    const deleteHolding = (id) => {
        setPortfolioEntries(portfolioEntries.filter(entry => entry.id !== id));
    };

    const getCalculation = (entry) => {
        return (Number(entry.currentPrice || 0) - Number(entry.buyPrice || 0)) * Number(entry.quantity || 0);
    }

    const totalProfit = portfolioEntries.reduce((sum, e) => sum + getCalculation(e), 0)

    return (
        <div className="max-h-fit max-w flex flex-col p-4">
        <div className="mx-auto w-full bg-gray-100 p-6 rounded-xl shadow-md">
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
                        onChange={(e) => updateAccount(entry.type.toLowerCase(), entry.id, 'name', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="date"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.date}
                        onChange={(e) => updateAccount(entry.type.toLowerCase(), entry.id, 'date', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="number"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.amount}
                        onChange={(e) => updateAccount(entry.type.toLowerCase(), entry.id, 'amount', e.target.value)}
                        />
                    </td>
                    <td className="p-2 text-center">
                        <button
                        onClick={() => deleteAccount(entry.type.toLowerCase(), entry.id)}
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
            <p className="mt-2 text-xl font-bold">
                Total Capital: ${totalCapital.toFixed(2)}
            </p>
            </div>
        </div>
        <div className="mx-auto w-full bg-gray-600 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Portfolio Tracker</h2>

            <div className="flex justify-center gap-4 mb-4">
            <button 
                onClick={addHolding} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Add Holding
            </button>
            </div>

            <table className="w-full">
            <thead>
                <tr className="text-left text-sm text-white">
                <th className="p-2">Type</th>
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Buy Price ($)</th>
                <th className="p-2">Current Price ($)</th>
                <th className="p-2 w-12"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
                
                {portfolioEntries.map((entry) => (
                    <tr
                        key={entry.id}
                        className={`rounded-lg shadow-sm ${
                        entry.type === "Stock" ? "bg-green-800" :
                        entry.type === "Bond" ? "bg-purple-800" :
                        entry.type === "Crypto" ? "bg-blue-800" :
                        "bg-orange-800"
                        } mb-4`}
                    >
                    <td className="p-2">
                    <select
                        className="w-full rounded px-2 py-1 border"
                        value={entry.type}
                        onChange={(e) => updateHolding(entry.id, 'type', e.target.value)}
                    >
                        <option value="Stock">Stock</option>
                        <option value="Bond">Bond</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Other">Other</option>
                    </select>
                    </td>
                    <td className="p-2">
                        <input
                        type="text"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.name}
                        onChange={(e) => updateHolding(entry.type.toLowerCase(), entry.id, 'name', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="date"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.date}
                        onChange={(e) => updateHolding(entry.id, 'date', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="number"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.amount}
                        onChange={(e) => updateHolding(entry.id, 'quantity', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="number"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.amount}
                        onChange={(e) => updateHolding(entry.id, 'buyPrice', e.target.value)}
                        />
                    </td>
                    <td className="p-2">
                        <input
                        type="number"
                        className="w-full rounded px-2 py-1 border"
                        value={entry.amount}
                        onChange={(e) => updateHolding(entry.id, 'currentPrice', e.target.value)}
                        />
                    </td>
                    <td className="p-2 text-center">
                        <button
                        onClick={() => deleteHolding(entry.id)}
                        className="text-red-800 font-bold hover:text-red-900 text-lg"
                        >
                        &minus;
                        </button>
                    </td>
                    </tr>
                ))}
            </tbody>

            </table>

            <div className="mt-6 text-center text-xl font-medium">
            <p className="mt-2 text-xl font-bold">
                Total Profit: ${totalProfit.toFixed(2)}
            </p>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;
