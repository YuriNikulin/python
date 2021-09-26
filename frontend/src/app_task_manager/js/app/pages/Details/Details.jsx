import React, { useContext, createContext, useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createTaskRequest, deleteTaskRequest, fetchDetails, logTimeRequest, patchDetails } from '../../store/actions';
import { detailsSelector, loadingSelector } from '../../store/selectors';
import Preloader from 'common/react_components/Preloader'
import Button from 'common/react_components/Button'
import Date from 'common/react_components/Date'
import { ChevronLeftIcon } from 'common/react_components/Icon'
import Field from './components/Field';
import UserSelect from '../../components/UserSelect'
import TagSelect from '../../components/TagSelect'
import Enum from '../../components/Enum'
import LogTime from './components/LogTime';
import TaskSelect from '../../components/TaskSelect';
import { LinkIcon } from '../../../../../common/js/react_components/Icon';
import TagsReadonly from '../../components/TagsReadonly';

const Details = (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(loadingSelector)
    const details = useSelector(detailsSelector)
    const [values, setValues] = useState({})
    const [changedValues, setChangedValues] = useState({})

    const taskId = useMemo(() => {
        return params.id
    }, [params])

    const isCreate = useMemo(() => {
        return taskId === undefined
    }, [taskId])

    useEffect(() => {
        if (taskId !== undefined) {
            dispatch(fetchDetails(taskId))
        } else {
            setValues({})
        }
    }, [taskId])

    useEffect(() => {
        if (details.name) {
            document.title = details.name
        }


        setValues({
            ...details,
            ...changedValues
        })
    }, [details])

    useEffect(() => {
        return () => {
            setValues({})
        }
    }, [])

    const handleFieldChange = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value
        })

        setChangedValues({
            ...changedValues,
            [key]: value
        })
    }, [values, changedValues])

    const handleFieldSave = useCallback((name) => {
        if (name && values[name]) {
            dispatch(patchDetails({ [name]: values[name] }))
        }


        setChangedValues(Object.entries(changedValues).reduce((acc, [key, value]) => {
            if (key === name) return acc

            return {
                ...acc,
                [key]: value
            }
        }, {}))
    }, [values, changedValues])

    const handleLogTime = useCallback((value) => {
        dispatch(logTimeRequest(value))
    }, [])

    const handleCreate = useCallback(() => {
        dispatch(createTaskRequest(values))
    }, [values])

    const handleDelete = useCallback(() => {
        dispatch(deleteTaskRequest(values.id))
    }, [values])

    return (
        <div className="details">
            <div className="mb-4 d-flex container">
                <Link
                    className="title link-reset text-hover-primary me-3 d-flex align-items-center"
                    to="/"
                    style={{ marginLeft: -6 }}
                >
                    <ChevronLeftIcon />
                    Вернуться к списку
                </Link>
                {!isCreate &&
                    <LogTime onChange={handleLogTime} />
                }
            </div>
            <Preloader in={loading} />
            <div className="details-items container">
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="name"
                    readComponent={<h2>{details.name}</h2>}
                    editComponent={<input
                        placeholder="Название"
                        className="form-control form-control-lg"
                    />}
                    value={values.name}
                    originalValue={details.name}
                    fullWidth
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="description"
                    title="Описание"
                    readComponent={<p>{details.description}</p>}
                    editComponent={<textarea
                        className="form-control"
                        style={{ maxHeight: 400 }}
                    />}
                    value={values.description}
                    originalValue={details.description}
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="status"
                    title="Статус"
                    readComponent={<p>{details.status}</p>}
                    editComponent={<Enum type="STATUSES" />}
                    alwaysEdited
                    value={values.status}
                    originalValue={details.status}
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="priority"
                    title="Приоритет"
                    readComponent={<p>{details.priority}</p>}
                    editComponent={<Enum type="PRIORITIES" />}
                    alwaysEdited
                    value={values.priority}
                    originalValue={details.priority}
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="assignee"
                    title="Исполнитель"
                    readComponent={<p>{details.assignee?.name}</p>}
                    editComponent={<UserSelect />}
                    alwaysEdited
                    value={values.assignee}
                    originalValue={details.assignee}
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="author"
                    title="Автор"
                    readComponent={<p>{details.author?.name}</p>}
                    editComponent={<UserSelect />}
                    readonly
                    value={values.author}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="tags"
                    title="Теги"
                    readComponent={<p><TagsReadonly value={details.tags} /></p>}
                    editComponent={<TagSelect creatable />}
                    value={values.tags}
                    originalValue={details.tags}
                    isCreate={isCreate}
                />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="related_tasks"
                    title="Связанные задачи"
                    readComponent={
                        <div
                            onClickCapture={(e) => {
                                e.stopPropagation()
                            }}
                            onMouseDownCapture={(e) => e.stopPropagation()}
                        >
                            {details.related_tasks?.map(t => {
                                return (
                                    <div key={t.id}>
                                        <Link to={`/task/${t.id}`} target="_blank">
                                            {t.name}
                                            <LinkIcon size={18} className="ms-1" />
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    editComponent={<TaskSelect />}
                    value={values.related_tasks}
                    originalValue={details.related_tasks}
                    isCreate={isCreate}
                />
                <div className="details-divider" />
                <Field
                    onChange={handleFieldChange}
                    onSave={handleFieldSave}
                    name="time_estimated"
                    title="Запланированное время (в часах)"
                    readComponent={<p>{details.time_estimated}</p>}
                    editComponent={
                        <input
                            className="form-control form-control-lg"
                            type="number"
                        />}
                    value={values.time_estimated}
                    originalValue={details.time_estimated}
                    isCreate={isCreate}
                />
                {!isCreate && <>
                    <Field
                        onChange={handleFieldChange}
                        onSave={handleFieldSave}
                        name="time_spent"
                        title="Потраченное время (в часах)"
                        readComponent={<p>{details.time_spent}</p>}
                        value={values.time_spent}
                        originalValue={details.time_spent}
                        readonly
                    />
                    <Field
                        onChange={handleFieldChange}
                        onSave={handleFieldSave}
                        name="time_remaining"
                        title="Оставшееся время (в часах)"
                        readComponent={<p>{details.time_remaining}</p>}
                        value={values.time_remaining}
                        originalValue={details.time_remaining}
                        readonly
                    />
                </>}
                {!isCreate &&
                    <>
                        <div className="details-divider" />
                        <Field
                            onChange={handleFieldChange}
                            onSave={handleFieldSave}
                            name="created"
                            title="Дата создания"
                            readComponent={<Date value={details.created} />}
                            value={values.created}
                            originalValue={details.created}
                            readonly
                        />
                        <Field
                            onChange={handleFieldChange}
                            onSave={handleFieldSave}
                            name="updated"
                            title="Дата обновления"
                            readComponent={<Date value={details.updated} />}
                            value={values.updated}
                            originalValue={details.updated}
                            readonly
                        />
                    </>
                }
            </div>
            <footer className="details-footer">
                <div className="container">
                    {isCreate ?
                        <Button style={{ minWidth: 200 }} onClick={handleCreate}>
                            Создать
                        </Button> : (
                            <>
                                <LogTime onChange={handleLogTime} />
                                <div className="divider" />
                                <Button type="danger" onClick={handleDelete}>
                                    Удалить задачу  
                                </Button>
                                <Link to="/task/create" className="ms-3">
                                    <Button>
                                        Создать другую задачу
                                    </Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </footer>
        </div>
    )
}

export default Details;
