import React from 'react'
import MenuApi from '../../../../common/js/react_components/MenuApi'

const UserMenu = (props) => {
    return (
        <MenuApi url="/api/task_manager/user" {...props} />
    )
}

export default UserMenu