import { CardContent, Typography } from "@mui/material"


export const Task = ({task}) => {
    return (
        <CardContent>
            <Typography color="textPrimary" gutterBottom sx={{ fontSize: 18}}>
                {task?.title}
            </Typography>
            <Typography color="textPrimary" gutterBottom >
                {task?.description}
            </Typography>
        </CardContent>
    )
}

