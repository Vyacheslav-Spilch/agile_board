import { useStore } from "../../context/useStore"
import { Box, Button, Grid2, Paper, Typography }  from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Column } from "./Column"
import { observer } from "mobx-react-lite"
import { useCallback, useState } from "react"
import { NewTaskDialog } from "./NewTaskDialog"


function getListStyle (isDraggingOver) {
    return {
        backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
        padding: 8,
        minHeight: 500
    }
}

export const Dashboard = observer(() => {
    const { boards } = useStore()

    const [ newTaskToSection, setNewTaskToSection ] = useState(null)

    const onDragEnd = useCallback((event) => {
        const { source, destination, draggableId: taskId } = event
        
        boards?.active.moveTask(taskId, source, destination)
    }, [boards])

    const handleClose = useCallback(() => setNewTaskToSection(null), [setNewTaskToSection])


    return (
        <Box p={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid2 sx={{ display: 'flex', flexWrap: 'wrap'}} container spacing={3}>
                    {boards?.active?.sections.map(section => (
                        <Grid2 key={section.id} sx={{ flex: 1, minWidth: '20%'}}>
                            <Paper>
                                <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography variant="h5">{section.title}</Typography>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => setNewTaskToSection(section.id)}
                                    >
                                        Add
                                    </Button>
                                </Box>
                                <Droppable droppableId={section.id}>
                                    {(provided, snapshot) => (
                                        <div 
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <Column section={section}/>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </DragDropContext>
            <NewTaskDialog 
                open={!!newTaskToSection} 
                handleClose={handleClose}
                activeSection={newTaskToSection}
            />
        </Box>
    )
})