import app from './src/app'

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`Server ${NODE_ENV} running on ${HOST}:${PORT}`);
});