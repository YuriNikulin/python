import React, { useCallback, useContext, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortSelector } from '../../../store/selectors'
import Button from 'common/react_components/Button'
import Menu from 'common/react_components/Menu'
import { SORTINGS } from '../../../constants'
import { changeSort } from '../../../store/actions'

const DESC_TITLE = 'по убыванию'
const ASC_TITLE = 'по возрастанию'

const getValueTitle = (value) => value === 'asc' ? ASC_TITLE : DESC_TITLE

const Sort = (props) => {
    const sort = useSelector(sortSelector)
    const dispatch = useDispatch()

    const currentSort = useMemo(() => {
        return SORTINGS.find(s => s.key === sort.key)
    }, [sort])

    const handleChange = useCallback(({ value }) => {
        dispatch(changeSort(value))
    }, [])

    return (
        <Menu
            menuButton={
                <div className="ms-3">
                    <Button outline>
                        Отсортировано по {currentSort.name} ({getValueTitle(sort.value)})
                    </Button>
                </div>
            }
            fullWidth={false}
            portal
            style={{
                width: 300
            }}
            onItemClick={handleChange}
        >
            {SORTINGS.map((sorting) => {
                return (
                    <Menu.Item value={sorting.key}>
                        Отсортировать по
                        {` ${sorting.name}`} ({
                            getValueTitle(
                                currentSort.key === sorting.key
                                && 
                                sort.value === 'desc' ? 'asc' : 'desc')
                        })
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

export default Sort