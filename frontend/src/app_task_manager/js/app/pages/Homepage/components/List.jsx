import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import Preloader from '../../../../../../common/js/react_components/Preloader';
import Priority from '../../../components/Priority';
import Status from '../../../components/Status';
import { Link } from 'react-router-dom'
import Date from 'common/react_components/Date'
import { LinkIcon } from '../../../../../../common/js/react_components/Icon';
import TagsReadonly from '../../../components/TagsReadonly';

const TaskField = ({ title, value }) => {
    return (
        <div>
            <h6 className="title">{title}:</h6>
            <p>{value} </p>
        </div>
    )
}

const Task = ({ task }) => {
    return (
        <div className="card flex-grow-1">
            <div className="card-header">
                <Link to={`/task/${task.id}`} className="link-reset">
                    <h5 className="mb-0 d-flex align-items-center text-hover-primary">
                        {task.name}
                        <LinkIcon size={18} className="ms-1" />
                    </h5>
                </Link>
            </div>
            <div className="card-body">
                <TaskField title="Описание" value={task.description} />
                <TaskField title="Статус" value={<Status value={task.status} />} />
                <TaskField title="Приоритет" value={<Priority value={task.priority} />} />
                <TaskField title="Исполнитель" value={task.assignee?.name} />
                <TaskField title="Автор" value={task.author?.name} />
                <TaskField title="Теги" value={<TagsReadonly value={task.tags} />} />
                <TaskField title="Дата создания" value={<Date value={task.created} />} />
                <TaskField title="Дата обновления" value={<Date value={task.updated} />} />
            </div>
        </div>
    )
}

const List = (props) => {
    return (
        <div className="row position-relative list" style={{ minHeight: 50 }}>
            <Preloader in={props.loading} />
            {!!props.data.length ? props.data.map((task) => {
                return (
                    <div className="col-xl-6 mb-4 d-flex flex-column" key={task.id}>
                        <Task task={task} />
                    </div>
                )
            }) : !props.loading ? <p>Ничего не найдено</p> : null}
        </div>
    )
}

export default List;
