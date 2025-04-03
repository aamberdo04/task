// ImportantUrgentLabel.js
import React from "react";

const ImportantUrgentLabel = ({ importantLabel, urgentLabel }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {importantLabel && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md">{importantLabel}</span>
        )}
        {urgentLabel && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md">{urgentLabel}</span>
        )}
    </div>
);

export default ImportantUrgentLabel;
