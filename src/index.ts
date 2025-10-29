import colors from 'colors'
import app from "./server";

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(colors.cyan.bold(`Server is running in: https://linkcanopy-backend.onrender.com`));
    console.log(colors.cyan.bold(`Documentation aviable in https://linkcanopy-backend.onrender.com/api-docs`));

})