import { Button, CssBaseline, Stack, TextField } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import WebSocket from "ws"
import { generateImageFromMessage, generateLabelXml } from "./backend/DymoHelper"
import { wss } from "./backend/WebsocketServer"
import { StickerRequest } from "./types/StickerRequest"


export const App = () => {

    const [recentSticker, setRecentSticker] = useState<string | null>(null)

    const getSicker = async (request: StickerRequest) => {
        const labelXml = generateLabelXml(request)
        console.log(labelXml)
        const result = ((await generateImageFromMessage(labelXml)) as string).replaceAll('\\', "").replaceAll('"', "")
        // console.log(result)
        setRecentSticker(result as string)
    }

    const wsHandler = (ws: WebSocket) => {
        ws.on('message', (message) => {
            try {
                const parsedMessage = StickerRequest.fromJson(JSON.parse(message.toString()))
                console.log(parsedMessage)
                ws.send({status:"recieved",requestID: parsedMessage.requestID})
            } catch (error) {
                console.error(error)
                ws.send({ status: "error", message: "Error in parsing request message" })
            }
        })
    }

    useEffect(() => {
        wss.on('connection', wsHandler);
        console.log("Starting")

        const request = new StickerRequest(
            "test lautsprecher",
            "test subline",
            "test position",
            // v4(),
            "testID-123456",
            "testRequest",
        );

        getSicker(request);

        return () => {
            wss.off('connection', wsHandler)
        }
    },[])

    return (
        <div>
            <SnackbarProvider anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }} maxSnack={10}>
                <CssBaseline />
                <img src={`data:image/png;base64,${recentSticker}`} />
            </SnackbarProvider>

        </div>
    )
}