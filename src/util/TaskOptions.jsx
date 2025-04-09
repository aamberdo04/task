import React from 'react';
import ToggleSwitch from './ToggleSwitch';

function TaskOptions({ isUrgent, setUrgent, isImportant, setImportant }) {
    return (
        <div className='mt-4 mx-3'>
            <ToggleSwitch 
                label='Important' 
                isChecked={isImportant}
                onToggle={() => setImportant(!isImportant)}
            />
            <ToggleSwitch 
                label='Urgent' 
                isChecked={isUrgent}
                onToggle={() => setUrgent(!isUrgent)}
            />
        </div>
    );
}

export default TaskOptions;
