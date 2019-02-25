export const publicRouter = app => {
    app.use('/api', (req, res) => res.send('Hello World'))
}

export const protectedRouter = app => {
}