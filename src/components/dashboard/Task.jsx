import { CardContent, Typography } from "@mui/material"
import { User } from "../common/User"


export const Task = ({task}) => {
    return (
        <CardContent>
            <Typography color="textPrimary" gutterBottom sx={{ fontSize: 18}}>
                {task.title}
            </Typography>
            <Typography color="textPrimary" gutterBottom >
                {task.description}
            </Typography>
            <User user={task.assignee}/>
        </CardContent>
    )
}

