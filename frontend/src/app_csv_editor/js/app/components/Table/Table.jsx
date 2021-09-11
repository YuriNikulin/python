import React, { useContext, useEffect, useRef } from 'react';
import { setLoading } from '../../store/actions'

const Table = (props) => {
    const { data } = props
    const containerRef = useRef()

    useEffect(() => {
        if (containerRef.current && !props.loading) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [props.loading])

    return (
        <div className="mt-3 page-table" ref={containerRef}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {data.keys.map(item => {
                            return (
                                <th key={item.name}>
                                    {item.name}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.values.map((row, index) => {
                        return (
                            <tr key={index}>
                                {row.map((cell, index) => {
                                    return (
                                        <td key={index}>
                                            {cell}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
