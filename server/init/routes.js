import userRoute from '../routes/userRoute';

export default (app) => {
    /*
     * User Routes
     */
    app.use('/user', userRoute);
};
