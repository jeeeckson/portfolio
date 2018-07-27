import ordersRoute from '../routes/ordersRoute';

export default (app) => {
    /*
     * User Routes
     */
    app.use('/orders', ordersRoute);
};
