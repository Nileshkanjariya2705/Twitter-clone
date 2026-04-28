import app from "./app";

const port:string|number=process.env.PORT || 8081;

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})