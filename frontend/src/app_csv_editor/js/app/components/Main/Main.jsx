import React, { useContext, useEffect } from 'react';
import { useStore } from '../../';
import Preloader from '../../../../../common/js/react_components/Preloader';
import { setLoading } from '../../store/actions'
import Table from '../Table/Table'
import Toolbar from './Toolbar';

const Main = () => {
    const [state, dispatch] = useStore()

    return (
        <div>
            <Preloader in={state.loading} />
            <Toolbar />
            <Table />
        </div>
    )
}

export default Main;
