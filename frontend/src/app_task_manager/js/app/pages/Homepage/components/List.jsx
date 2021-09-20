import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import Preloader from '../../../../../../common/js/react_components/Preloader';
import Priority from '../../../components/Priority';
import Status from '../../../components/Status';

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
                <h5>
                    {task.name}
                </h5>
            </div>
            <div className="card-body">
                <TaskField title="Описание" value={task.description} />
                <TaskField title="Автор" value={task.author?.name} />
                <TaskField title="Исполнитель" value={task.assignee?.name} />
                <TaskField title="Теги" value={task.tags && task.tags.map(t => t.name).join(', ')} />
                <TaskField title="Приоритет" value={<Priority value={task.priority} />} />
                <TaskField title="Статус" value={<Status value={task.status} />} />
            </div>
        </div>
    )
}

const List = (props) => {
    return (
        <div className="row position-relative" style={{ minHeight: 50 }}>
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
