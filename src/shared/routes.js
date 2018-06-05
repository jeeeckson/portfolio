import Home from './Home';
import Home2 from './pages/Home';
import Form from './pages/Form';
import Products from './pages/Products';
import Grid from './Grid';
import fetchPopularRepos from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (url) => fetchPopularRepos(url)
    },
    {
        path: '/home',
        component: Home2
    },
    {
        path: '/form',
        component: Form
    },
    {
        path: '/products',
        component: Products,
        fetchInitialData: (url) => fetchPopularRepos(url)
    }

];

export default routes;