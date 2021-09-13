import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Button from 'common/react_components/Button'
import Menu from 'common/react_components/Menu'
import ColumnsSettings from './ColumnsSettings'
import { useStore } from '../..';
import { addColumn, createDocument, importFile, resetFilter } from '../../store/actions';

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

    const handleAddColumnSubmit = useCallback(() => {
        const input = document.getElementById('add-column-input') 
        const value = input.value
        if (!value) {
            return
        }

        dispatch(addColumn(value))
    }, [])

    const handleAddColumnKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddColumnSubmit()
        }
    }

    const handleNewDocumentClick = useCallback(() => {
        dispatch(createDocument())
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
            <Button className="ms-3" onClick={handleNewDocumentClick}>Новый документ</Button>
            <ColumnsSettings />
            <Menu
                menuButton={(<span><Button className="ms-3">Добавить столбец</Button></span>)}
                portal={true}
            >
                <div className="px-3 py-2">
                    <div>
                        <input
                            placeholder="Название столбца"
                            className="form-control form-control-sm"
                            id="add-column-input"
                            onKeyDown={handleAddColumnKeyDown}
                        />
                        <div className="mt-2">
                            <Button type="primary" small onClick={handleAddColumnSubmit}>
                                Добавить
                            </Button>
                        </div>
                    </div>
                </div>
            </Menu>
            {!!state.data.filters.length && (
                <Button className="ms-3" type="outline-primary" onClick={handleFiltersReset}>
                    Очистить фильтры
                </Button>
            )}
        </div>
    )
}

export default Toolbar;
