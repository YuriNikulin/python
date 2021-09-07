import React, { useContext, useEffect, useRef } from 'react';
import Table from '../Table/Table'
import Button from 'common/react_components/Button'

const Toolbar = () => {
    const fileUploaderRef = useRef()

    const handleFileUploaderButtonClick = () => {
        if (fileUploaderRef.current) {
            fileUploaderRef.current.click()
        }
    }

    return (
        <div>
            {/* <Button onClick={handleFileUploaderButtonClick}>Импорт файла */}
                <input ref={fileUploaderRef} type="file" style={{display: 'block'}} className="ce-file-uploader btn btn-primary" />
            {/* </Button> */}
            <Button className="ms-3">Экспорт файла</Button>
            <Button className="ms-3">Новый документ</Button>
        </div>
    )
}

export default Toolbar;
