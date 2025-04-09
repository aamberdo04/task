import React, { useState } from "react";

function DateValidation({ selectedDate, setSelectedDate }) {
    const today = new Date().toISOString().split('T')[0]; // Default to today's date

    // Store the raw value temporarily
    const [tempDate, setTempDate] = useState(selectedDate || today);

    const handleDateChange = (e) => {
        // Temporary update when the user is selecting a date
        setTempDate(e.target.value);
    };

    const handleDateBlur = () => {
        // Only save the date when the user has picked it
        if (tempDate && tempDate !== selectedDate) {
            setSelectedDate(tempDate); // Log only when the date is selected (not on arrow click)
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-6 mx-3">
            <label htmlFor="due-date" className="md:font-bold block text-sm font-medium text-gray-900">
                Due Date
            </label>
            <input
                type="date"
                id="due-date"
                min={today} // Prevent dates before today
                value={tempDate}  // Display the temporary date value
                onChange={handleDateChange} // Update the temp date when changing date
                onBlur={handleDateBlur} // Save the date only when the user leaves the input field (after selecting)
                className="border w-full border-gray-200 outline-none p-3 rounded-md text-[12px]"
            />
        </div>
    );
}

export default DateValidation;
