import { Card } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Draggable } from "react-beautiful-dnd"
import { Task } from "./Task"


function getItemStyle (draggableStyle) {
    return {
        padding: 8,
        marginBottom: 8,
        ...draggableStyle
    }
}

export const Column = observer(function Column ({section}) {
    return (
        <div>
            {section.tasks.map((task, index) => (
                <Draggable 
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                >
                    {(provided) => (
                        <Card 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                        >
                            <Task task={task}/>
                        </Card>
                    )}
                </Draggable>
            ))}
        </div>
    )
})

