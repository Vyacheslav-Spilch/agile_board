
import { AppBar, Box, FormControl, Grid2, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../context/useStore'
import { User } from '../common/User'

export const Header = observer(() => {

    const { boards, users } = useStore()


    return (
        <AppBar position='static' sx={{ marginBottom: 5 }}>
            <Toolbar variant='dense'>
                <Grid2 sx={{ width: '100%' }} container justifyContent="space-between" alignItems="center">
                    <Grid2>
                        <Box display='flex' alignItems='center' p={1}>
                            <Typography variant='h6'>
                                Dashboard:
                            </Typography>
                            <FormControl variant='outlined'>
                                <Select style={{
                                        backgroundColor: '#fff',
                                        marginLeft: 10
                                    }}
                                    value={boards?.active?.id || ''}
                                    onChange={() => {}}
                                >   
                                    <MenuItem value='' disabled>
                                        -
                                    </MenuItem>
                                    {boards?.list.map(board => (
                                        <MenuItem key={board?.id} value={board?.id}>
                                            {board?.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid2>

                    <Grid2>
                        <User user={users?.me}/>
                </Grid2>
                </Grid2>
            </Toolbar>
        </AppBar>   
    )
})

