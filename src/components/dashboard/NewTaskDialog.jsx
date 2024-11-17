import { Dialog, DialogContent, DialogTitle, TextField, Box, FormLabel, FormControl, DialogActions, Button, Select } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useCallback, useState } from "react"
import { useStore } from "../../context/useStore"

export const NewTaskDialog = observer(({
    open, 
    handleClose = () => {},
    activeSection,
}) => {
    const { users, boards } = useStore()

    const [ formState , setFormState] = useState({
        title: '',
        description: '',
        assignee: ''
    })

    const updateFormState = useCallback((event) => {
        const { name, value } = event.target
        setFormState(prev => {
            return {
                ...prev,
                [name]: value.trim() ? value : ""
            }
        })
    }, [setFormState])

    console.log({activeSection, formState});

    const handleSubmit = (event) => {
        event.preventDefault()
        debugger
        boards?.active.addTask(activeSection, formState)
        setFormState({})
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Creating A New Task:
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent style={{ minWidth: 500}}>
                    <Box p={1}>
                        <TextField
                            type="text"
                            fullWidth
                            required
                            name="title"
                            label="Title"
                            value={formState?.title || ""}
                            onChange={updateFormState}
                        >
                        </TextField>
                    </Box>
                    <Box p={1}>
                        <TextField
                            type="text"
                            fullWidth
                            required
                            name="description"
                            label="Description"
                            value={formState?.description || ""}
                            onChange={updateFormState}
                        >
                        </TextField>
                    </Box>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <FormLabel>
                                Assignee
                            </FormLabel>
                            <Select style={{
                                        backgroundColor: '#fff',
                                        marginLeft: 10
                                    }}
                                    native
                                    name='assignee'
                                    value={formState?.assignee || ''}
                                    onChange={updateFormState}
                                >   
                                    <option value='' disabled>
                                        -
                                    </option>
                                    {users && users.list?.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user?.name}
                                        </option>
                                    ))}
                                </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color='primary'
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        color='secondary'
                    >
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})

