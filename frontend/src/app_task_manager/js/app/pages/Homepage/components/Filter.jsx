import React, { useCallback, useMemo } from 'react'
import UserSelect from '../../../components/UserSelect'
import Button from 'common/react_components/Button'

const Filter = (props) => {
    const { values, onChange, onReset } = props

    const isEmpty = useMemo(() => {
        return !(Object.keys(values).length && Object.values(values).some(v => !!v.value))
    }, [values])

    const handleChange = useCallback((key, value, strict) => {
        onChange(key, value, strict)
    }, [])

    const handleReset = useCallback(() => {
        onReset()
    }, [])

    return (
        <div className="row d-flex">
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-name" className="form-label">
                    Название
                </label>
                <input
                    id="filter-name"
                    onChange={(e) => {
                        handleChange('name', e.target.value)
                    }}
                    className="form-control"
                    placeholder="Название"
                    value={values.name?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-description" className="form-label">
                    Описание
                </label>
                <input
                    id="filter-description"
                    onChange={(e) => {
                        handleChange('description', e.target.value)
                    }}
                    className="form-control"
                    placeholder="Описание"
                    value={values.description?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Автор
                </label>
                <UserSelect
                    onChange={(value) => {
                        handleChange('author', value, true)
                    }}
                    placeholder="Автор"
                    value={values.author?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Исполнитель
                </label>
                <UserSelect
                    onChange={(value) => {
                        handleChange('assignee', value, true)
                    }}
                    placeholder="Исполнитель"
                    value={values.assignee?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Теги
                </label>
                <input className="form-control" placeholder="Теги" />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Приоритет
                </label>
                <input className="form-control" placeholder="Приоритет" />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Статус
                </label>
                <input className="form-control" placeholder="Статус" />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label for="" className="form-label">
                    Только мои задачи
                </label>
                <input className="form-control" placeholder="Статус" />
            </div>
            <div className="col-lg-12 mb-2" style={{ height: 38 }}>
                {!isEmpty &&
                    <Button onClick={handleReset}>
                        Очистить фильтры
                    </Button>
                }
            </div>
        </div>
    )
}

export default Filter