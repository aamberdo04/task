import React from "react";

function ToggleSwitch({ label, isChecked, onToggle }) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={onToggle} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 
                rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
}

export default ToggleSwitch;
