import { useStore } from "../../context/useStore"
import { Box, Grid2, Paper, Typography }  from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Column } from "./Column"
import { observer } from "mobx-react-lite"
import { useCallback } from "react"


function getListStyle (isDraggingOver) {
    return {
        backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
        padding: 8,
        minHeight: 500
    }
}

export const Dashboard = observer(() => {
    const { boards } = useStore()

    const onDragEnd = useCallback((event) => {
        const { source, destination, draggableId: taskId } = event
        
        boards?.active.moveTask(taskId, source, destination)
    }, [boards])


    return (
        <Box p={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid2 container spacing={3}>
                    {boards?.active?.sections.map(section => (
                        <Grid2 key={section.id} item sx>
                            <Paper>
                                <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant="h5">{section.title}</Typography>
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
        </Box>
    )
})