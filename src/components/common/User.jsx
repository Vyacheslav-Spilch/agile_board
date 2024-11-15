
import { Avatar, Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const User = observer(({user}) => {

    return (
        <Box display='flex' alignItems='center'>
            <Avatar alt={user?.name} src={user?.avatar}/>
            <span style={{ padding: 5 }}>
                {user?.name}
            </span>
        </Box>
    )
})

