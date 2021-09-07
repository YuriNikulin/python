import React, { useContext, useEffect } from 'react';
import { useStore } from '../../';
import { setLoading } from '../../store/actions'
import Table from '../Table/Table'
import Toolbar from './Toolbar';

const Main = () => {
    const [state, dispatch] = useStore()

    return (
        <div>
            <Toolbar />
            <Table />
        </div>
    )
}

export default Main;
