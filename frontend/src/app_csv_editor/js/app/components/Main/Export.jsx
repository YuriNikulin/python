import React, { useCallback } from 'react';
import Button from 'common/react_components/Button'
import Menu from 'common/react_components/Menu'
import { useStore } from '../..';
import { exportDocument } from '../../store/actions';

const Export = () => {
    const [state, dispatch] = useStore()

    const handleMenuClick = useCallback(({value}) => {
        dispatch(exportDocument(value))
    }, [])

    return (
        <Menu
            onItemClick={handleMenuClick}
            menuButton={(
                <div>
                    <Button>
                        Экспорт файла
                    </Button>
                </div>
            )}
        >
            <Menu.Item value="csv">
                CSV
            </Menu.Item>
            <Menu.Item value="xls">
                XLS
            </Menu.Item>
        </Menu>
    )
}

export default Export;
