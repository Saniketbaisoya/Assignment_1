const express = require('express');
const { ServerConfig, Connect } = require('./configuration');
const router = require('./routers/user.registration');

const app = express();

app.use(express.json());
app.use('/api',router);

app.listen(ServerConfig.PORT,async ()=> {
    await Connect.connectDB();
    console.log(`Server is running at PORT ${ServerConfig.PORT} !!`);
});