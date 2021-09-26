import React, { useCallback } from 'react'
import MenuApi from '../../../../common/js/react_components/MenuApi'
import makeRequest from 'common/request'

const TagSelect = (props) => {
    const handleCreate = useCallback(async (name) => {
        return await makeRequest('/api/task_manager/tag', {
            method: 'POST',
            body: { name }
        })
    }, [])

    return (
        <MenuApi
            url="/api/task_manager/tag"
            multi
            onCreate={props.creatable ? handleCreate : undefined}
            onCreateText="Создать тег"
            {...props}
        />
    )
}

export default TagSelect