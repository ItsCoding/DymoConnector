import { Button, CssBaseline, Stack, TextField } from "@mui/material"
import { SnackbarProvider } from "notistack"

export const App = () => {
    return (
        <div>
            <SnackbarProvider anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }} maxSnack={10}>
                    <CssBaseline />
            </SnackbarProvider>

        </div>
    )
}