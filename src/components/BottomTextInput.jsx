import React, { useState } from 'react';

const BottomTextInput = ({ value, onChange, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return(
        <div>
            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide' : 'Show'} Input
            </button>

        <div
            className={`fixed left-1/2 transform -translate-x-1/2 bottom-10 w-11/12 md:w-1/2 p-4 bg-gray-800 text-white rounded-md shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-white"
                placeholder="Type something..."
            />
        </div>
        </div>
    );
}

export default BottomTextInput;
