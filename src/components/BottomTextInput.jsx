import React, { useState } from 'react';

const BottomTextInput = ({ value, onChange, placeholder = "Type something..." }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <button 
                onClick={toggleVisibility}
                className="fixed right-4 bottom-4 bg-yellow-300 text-white px-4 py-2 rounded-md shadow-lg hover:bg-orange-700"
            >
                Duck
            </button>
            <div
                className={`fixed left-1/2 transform -translate-x-1/2 bottom-10 w-11/12 md:w-1/2 p-4 bg-gray-800 text-white rounded-3xl shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 rounded-xl bg-gray-700 text-white"
                    placeholder={placeholder}
                />
            </div>
        </>
    );
};

export default BottomTextInput;