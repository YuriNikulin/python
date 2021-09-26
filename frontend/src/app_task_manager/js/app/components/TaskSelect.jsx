import React from 'react'
import MenuApi from '../../../../common/js/react_components/MenuApi'

const TaskSelect = (props) => {
    return (
        <MenuApi url="/api/task_manager/task" multi {...props} />
    )
}

export default TaskSelect