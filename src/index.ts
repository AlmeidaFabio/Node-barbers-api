import { app } from "./app";

app.listen(process.env.Port || 3001, () => {
    console.log(`Server is running in ${process.env.BaseUrl}`)
})