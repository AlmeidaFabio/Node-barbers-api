import { app } from "./app";

app.listen(process.env.Port || 3000, () => {
    console.log(`Server is running in ${process.env.BaseUrl}:${process.env.Port}`)
})