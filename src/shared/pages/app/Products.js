import React, {Component} from 'react';
import Grid from '../../components/Grid';
import axios from 'axios';
import withRoot from './../../withRoot';

/**
 * Component that displays the list of products loaded into the app.
 * This component is only available to authenticated users of the app.
 */
class Products extends Component {

    /**
     * Constructor with mandatory parameters.
     *
     * @param {Object} props The properties to be set to the component, cannot be null.
     */
    constructor(props) {
        super();
        this.state = {
            inProgress: false
        };
        this.props = props;
        this.tabIndex = 0;
        this.offset = 0;
        this.querySearch = "";
        this.isAsc = 'asc';
        this.limit = 10;
        this.page = 0;
        this.total = 0;
        this.orderBy = "sku";
        this.selectedRows = [];
        this.selectedRowsIndex = [];
        this.totalSearch = 0;
    }

    /**
     * Performs actions before the component gets mounted.
     */
    componentWillMount() {
        this.inProgress = false;
        this.findElements();
    }

    /**
     * Searches for elements.
     */
    findElements(props = undefined) {
        if (props) {
            this.offset = props.offset !== undefined ? props.offset : this.offset;
            this.querySearch = props.querySearch !== undefined ? props.querySearch : this.querySearch;
            this.isAsc = props.isAsc !== undefined ? props.isAsc : this.isAsc;
            this.limit = props.limit !== undefined ? props.limit : this.limit;
            this.orderBy = props.orderBy !== undefined ? props.orderBy : this.orderBy;
            this.page = props.page !== undefined ? props.page : this.page;
        }

        //this.setState({inProgress: true});
        let queryString = "offset=" + this.offset + "&limit=" + this.limit + "&orderBy=" +
            this.orderBy + "&isAsc=" + this.isAsc;
        if (this.querySearch) {
            queryString = queryString + "&text=" + this.querySearch;
        }
        axios.get('/user/getUserByName').then(result => {
            if (result && result.data && result.data.result) {
                this.rows = result.data.result;
                this.total = result.data.result.length;
                this.totalSearch = result.data.result.length;
                this.setState({inProgress: false});
            }
        }).catch((err)=>{
            console.log(err);
        });

        /*
        axios.get('/product')
            .then((response) => {
                debugger;
                /*if (this.querySearch && this.querySearch === response.data.search) {
                    this.rows = response.data.data;
                    this.totalSearch = response.data.count;
                    this.setState({inProgress: false});
                } else if (!this.querySearch) {
                    this.rows = response.data.data;
                    this.total = response.data.count;
                    this.totalSearch = response.data.count;
                }
                this.setState({inProgress: false});
            })
            .catch((error) => {
                console.log(error);
            });
        **/
    }

    /**
     * Renders the component.
     *
     * @return {XML} The jsx component to be rendered, never null.
     */
    render() {
        const orderColumns = [
            {id: 'id', numeric: true},
            {id: 'username'},
            {id: 'admin'},
            {id: 'name'},
            {id: 'lastName'},
            {id: 'age'},
            {id: 'route'},
            {id: 'number'}
        ];
        //id, username, password, admin, name, lastName, age, route, number, state, city

        const columns = [
            {id: 'id', label: 'Id'},
            {id: 'username', label: 'User Name'},
            {id: 'admin', label: 'Admin'},
            {id: 'name', label: 'Name'},
            {id: 'lastName', label: 'Last Name'},
            {id: 'age', label: 'Age'},
            {id: 'route', label: 'Address'},
            {id: 'number', label: 'Number'}
        ];

        return (
            <div>
                <Grid
                    columns={columns}
                    totalSearch={this.totalSearch}
                    isAsc={this.isAsc}
                    total={this.total}
                    orderBy={this.orderBy}
                    limit={this.limit}
                    offset={this.offset}
                    page={this.page}
                    orderColumns={orderColumns}
                    height="calc(100vh - 233px)" //This is a height of the window minus the header and footer
                    selectable={true}
                    columnsCount="8"
                    data={this.rows}
                    showFooter={true}
                    selectedRows={this.selectedRows}
                    selectedRowsIndex={this.selectedRowsIndex}
                    loading={this.state.inProgress}
                    notFoundElement={["There are no new products yet.",
                        "Upload a CSV file to import them."]}
                    findElements={this.findElements.bind(this)}/>
            </div>
        );
    }
}

export default withRoot(Products);
