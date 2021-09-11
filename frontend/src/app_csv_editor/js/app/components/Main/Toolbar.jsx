import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Table from '../Table/Table'
import Button from 'common/react_components/Button'
import { useStore } from '../..';
import { changeFilter, importFile, resetFilter } from '../../store/actions';

const Toolbar = () => {
    const [state, dispatch] = useStore()
    const fileUploaderRef = useRef()

    const handleFileUploaderChange = useCallback((e) => {
        const file = e.target.files[0]
        dispatch(importFile(file))
    }, [])

    const handleFiltersReset = useCallback(() => {
        dispatch(resetFilter())
    }, [])

    return (
        <div>
            <Button className="ce-file-uploader-button position-relative">Импорт файла
                <input
                    ref={fileUploaderRef}
                    type="file"
                    className="ce-file-uploader btn btn-primary"
                    onChange={handleFileUploaderChange}
                    accept=".csv, .xls, .xlsx"
                />
            </Button>
            <Button className="ms-3">Экспорт файла</Button>
            <Button className="ms-3">Новый документ</Button>
            {!!state.data.filters.length && (
                <Button className="ms-3" type="outline-primary" onClick={handleFiltersReset}>
                    Очистить фильтры
                </Button>
            )}
        </div>
    )
}

export default Toolbar;
