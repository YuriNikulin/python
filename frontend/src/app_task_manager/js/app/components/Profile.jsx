import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { UserIcon } from 'common/react_components/Icon'
import Menu from 'common/react_components/Menu'
import Button from 'common/react_components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile, patchProfileRequest } from '../store/actions'
import { profileSelector } from '../store/selectors'

const container = document.querySelector('#header-content .header-content-right')

const Profile = () => {
    const [values, setValues] = useState({})
    const dispatch = useDispatch()
    const profile = useSelector(profileSelector)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

    useEffect(() => {
        // setValues(profile)
    }, [profile])

    const handleSave = useCallback(() => {
        dispatch(patchProfileRequest(values))
    }, [values])

    const handleNameChange = useCallback((e) => {
        setValues({
            name: e.target.value
        })
    }, [])

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    return (
        <div className="profile">
            {profile &&
                <Menu
                    fullWidth={false}
                    menuButton={
                        <button className="reset-button profile-button">
                            <span title={profile.name} className="profile-name">
                                {profile.name}
                            </span>
                            <span className="profile-icon">
                                <UserIcon />
                            </span>
                        </button>
                    }
                >
                    <div className="px-3 py-2">
                        <input
                            className="form-control form-control-sm"
                            placeholder="Введите имя пользователя"
                            value={values.name}
                            onChange={handleNameChange}
                            onKeyDown={handleInputKeyDown}
                        />
                        <Button onClick={handleSave} disabled={!values.name} className="mt-3" small>
                            Сохранить
                        </Button>
                    </div>
                </Menu>
            }
        </div>
    )
}

const ProfilePortal = () => {
    return (
        createPortal(<Profile />, container)
    )
}

export default ProfilePortal