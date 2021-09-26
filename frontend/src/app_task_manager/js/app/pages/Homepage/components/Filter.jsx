import React, { useCallback, useMemo } from 'react'
import UserSelect from '../../../components/UserSelect'
import Button from 'common/react_components/Button'
import TagSelect from '../../../components/TagSelect'
import Enum from '../../../components/Enum'
import { Link } from 'react-router-dom'
import Sort from './Sort'

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
                <label htmlFor="filter-author" className="form-label">
                    Автор
                </label>
                <UserSelect
                    inputId="filter-author"
                    onChange={(value) => {
                        handleChange('author', value, true)
                    }}
                    placeholder="Автор"
                    value={values.author?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-assignee" className="form-label">
                    Исполнитель
                </label>
                <UserSelect
                    inputId="filter-assignee"
                    onChange={(value) => {
                        handleChange('assignee', value, true)
                    }}
                    placeholder="Исполнитель"
                    value={values.assignee?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-tags" className="form-label">
                    Теги
                </label>
                <TagSelect
                    inputId="filter-tags"
                    onChange={(value) => {
                        handleChange('tags', value, true)
                    }}
                    placeholder="Теги"
                    value={values.tags?.value}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-priority" className="form-label">
                    Приоритет
                </label>
                <Enum
                    inputId="filter-priority"
                    type="PRIORITIES"
                    placeholder="Приоритет"
                    value={values.priority?.value}
                    multi
                    onChange={(value) => {
                        handleChange('priority', value)
                    }}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-status" className="form-label">
                    Статус
                </label>
                <Enum
                    inputId="filter-status"
                    type="STATUSES"
                    placeholder="Статус"
                    value={values.status?.value}
                    multi
                    onChange={(value) => {
                        handleChange('status', value)
                    }}
                />
            </div>
            <div className="filter-item col-lg-3 mb-4">
                <label htmlFor="filter-onlyMyTasks" className="form-label">
                    Только назначенные на меня
                </label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="filter-onlyMyTasks"
                        checked={values.onlyMyTasks?.value}
                        onChange={(e) => {
                            handleChange('onlyMyTasks', e.target.checked)
                        }}
                    />
                </div>
            </div>
            <div className="col-lg-12 mb-2 d-flex" style={{ height: 38 }}>
                <Link to="/task/create">
                    <Button>
                        Создать задачу
                    </Button>
                </Link>
                <Sort />
                {!isEmpty &&
                    <Button onClick={handleReset} className="ms-3" outline>
                        Очистить фильтры
                    </Button>
                }
            </div>
        </div>
    )
}

export default Filter