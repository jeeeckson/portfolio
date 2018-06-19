import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
    TablePagination,
    withStyles,
    IconButton,
    CircularProgress,
    Button,
    Checkbox
} from 'material-ui';
import TableHeader from './TableHeader';
//import SEARCH_EMPTYSTATE from './../../../public/icons/search_emptystate.png';
//import EMPTY_STATE from './../../../public/icons/emptystate.png';
import {OpenInNew, FileDownload} from 'material-ui-icons';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 800
    },
    tableWrapper: {
        overflowX: 'auto'
    }
});

/**
 * Component that displays the list of elements loaded into the app.
 *
 * The properties that this component need are:
 *
 * columns [{id: {string}, label: {string}, className: {string}}] : There are a array with the columns to match with the
 * response with the data to show, cannot be null.
 *
 * limit {string} : This is a limit to paginate, cannot be null.
 *
 * isAsc {bool} : This is a order of pagination, cannot be null.
 *
 * orderBy {string} : This is a field order of pagination, cannot be null.
 *
 * offset {string} : This is a position of the pagination, cannot be null.
 *
 * total {string} : This is a totals of the search, cannot be null.
 *
 * totalSearch {string} : This is a totals of the text search, cannot be null.
 *
 * rows {string} : This is a field order of pagination for first search, cannot be null.
 *
 * orderColumns [{id: {string}, className: {string}, link: {boolean}, type: {string}, tooltip: {boolean}}] : This is
 * a map to render the columns, cannot be null.
 * id: the field to show, cannot be null.
 * className: the styles to format the value of column, can be null.
 * link: if need show a link like a icon.
 * type: Can be 'money' or 'percentage' or null.
 * tooltip: if need show an large value in a tooltip. can be null.
 *
 * height {string} : This is a height of the table's body, cannot be null.
 *
 * displayRowCheckbox {bool} : If display checkbox on rows or not, can be null, default value False.
 *
 * deselectOnClickaway {bool} : If the click outside the grid lost the selection, can be null.
 *
 * showCheckboxes {bool} : If need show the checkbox, can be null.
 *
 * enableSelectAll {bool} : If need enable the "select all" on the row of columns name, can be null.
 *
 * multiSelectable {bool} : This is a position to start of pagination, can be null.
 *
 * selectable {bool} : If a row can be selectable, can be null.
 *
 * findElements {function} : The function to reload the data when it change, can be null.
 *
 * statusColors {Array} : This is a array with objects with a map for states on the grid, can be null.
 *
 * emptyState {image} : This is a image to display on empty's states, cannot be null.
 *
 * columnsCount {number} : This is a count of columns to be rendered, cannot be null.
 *
 * data {Array} : This is a array of the data to be displayed on the grid, can be null.
 *
 * loading {bool} : This is the switch to enable o disable the spin from loading, can be null.
 *
 * notFoundElement {Array} : Expected 2 strings to be display, one above the other, cannot be null.
 *
 * showFooter {Bool} : Enable o disable the footer of the grid.
 */
class Grid extends Component {

    /**
     * Constructor with mandatory parameters.
     *
     * @param {Object} props The properties to be set to the component, cannot be null.
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.offset = props.offset;
        this.totalSearch = props.totalSearch;
        this.total = props.total;
        this.limit = props.limit;
        this.isAsc = props.isAsc;
        this.orderBy = props.orderBy;
        this.rows = props.data;
        this.page = props.page;
        this.displayRowCheckbox = !!props.displayRowCheckbox;
        this.enableSelectAll = !!props.enableSelectAll;
        this.showCheckboxes = !!props.showCheckboxes;
        this.rowSelectionFunction = props.rowSelectionFunction;
        this.selectedRows = props.selectedRows;
        this.selectedRowsIndex = props.selectedRowsIndex;
    }

    /**
     * Performs actions while receives again properties.
     * @param props {object}: The properties of component.
     */
    componentWillReceiveProps(props) {
        this.props = props;
        this.offset = props.offset;
        this.totalSearch = props.totalSearch;
        this.total = props.total;
        this.limit = props.limit;
        this.isAsc = props.isAsc;
        this.orderBy = props.orderBy;
        this.rows = props.data;
        this.displayRowCheckbox = !!props.displayRowCheckbox;
        this.enableSelectAll = !!props.enableSelectAll;
        this.showCheckboxes = !!props.showCheckboxes;
        this.rowSelectionFunction = props.rowSelectionFunction;
        this.selectedRows = props.selectedRows;
        this.selectedRowsIndex = props.selectedRowsIndex;
    }

    /**
     * Performs actions while receives again properties.
     * @param props {object}: The properties of component.
     */
    componentWillUnmount() {
        this.props = {};
        this.offset = 0;
        this.totalSearch = 0;
        this.total = 0;
        this.limit = 0;
        this.isAsc = 0;
        this.orderBy = '';
        this.page = 0;
        this.rows = [];
        this.displayRowCheckbox = false;
        this.enableSelectAll = false;
        this.showCheckboxes = false;
        this.rowSelectionFunction = () => {
        };
        this.selectedRows = [];
        this.selectedRowsIndex = [];
    }

    /**
     * Generates a row component for each element.
     * @returns {Array<TableRow>} : An array in which each element is a react component representing a table row,
     * never null but can be empty if no products match the current search criteria.
     */
    generateTableRows() {

        return this.rows.map((row, index) => {
            let fields = [];
            if (this.showCheckboxes) {
                fields.push(
                    <TableCell key={-1} padding="checkbox">
                        <Checkbox checked={this.isSelected(index)}/>
                    </TableCell>
                );
            }
            fields.push(this.props.orderColumns
                .map((element, indexCol) => {
                    return this.generateField(row, element, indexCol);
                }));
            return (
                <TableRow
                    key={index}
                    selected={this.isSelected(index)}
                    hover
                    onClick={event => this.handleClick(event, index)}
                    onKeyDown={event => this.handleKeyDown(event, index)}
                    role="checkbox"
                    aria-checked={this.isSelected(index)}
                    tabIndex={-1}>
                    {fields}
                </TableRow>);
        });
    }

    /**
     * This method generates a field within a row, depending on the type you want to display.
     * @param row {object} : The row with the field to be display, the field is accessed by "[element.id]",
     * cannot be null.
     * @param element {object} : The element of the "orderColumns" props, cannot be null.
     * @param index {number} : The index to be display, cannot be null.
     * @returns {XML} : This is the element to be display, in format like HTML or empty.
     */
    generateField(row, element, index) {
        let field = '';
        const styles = {
            text: {
                display: 'block',
                fontWeight: 700,
                fontSize: 15,
                lineHeight: '25px',
                color: '#409a9a',
                textAlign: 'center',
                cursor: 'pointer'
            }
        };

        if (element.link) {
            field = (<a target="blank" href={row[element.id]}>
                <OpenInNew className="avenue-link-icon"/>
            </a>);
        } else if (element.button) {
            field = (
                <Button
                    id={row["id"]}
                    className={element.classNameButton}
                    onClick={() => element.func(row["id"])}>
                    {"" + row[element.id] + ""}
                </Button>
            );
        } else if (element.date) {
            field = (
                <label>
                    {new Date("" + row[element.id] + "").toLocaleDateString() + "\n" +
                    new Date("" + row[element.id] + "").toLocaleTimeString()}
                </label>
            );
        } else if (element.download) {
            field = (
                <IconButton
                    color="primary"
                    id={row["id"]}
                    className={element.classNameButton}
                    onClick={() => element.func(row["id"])}
                    aria-label={"" + row[element.id] + ""}>
                    <FileDownload/>
                </IconButton>
            );
        } else if (element.secondaryButton) {
            field = (
                <span
                    style={styles.text}
                    id={row["id"]}
                    className={element.classNameButton}
                    onClick={() => element.func(row["id"])}>
                    {row[element.id]}
                </span>);
        } else {
            field = field.concat(this.getLabel(element.id, row[element.id]));
        }
        let classNameColor;
        if (element.showWithColor) {
            classNameColor = this.getColor(element.showWithColor, row[element.id]);
        } else if (element.showWithColorRed) {
            classNameColor = "avenue-order-status-purchase-failed";
        }
        let className = '';
        if (element.className) {
            className = element.className;
        }
        return (<TableCell
            padding="checkbox"
            key={index}
            numeric={element.numeric}
            title={element.tooltip ? row[element.id] : ''}>
            <div key={index} className={className + ' ' + classNameColor}>
                {element.type === 'money' ? '$' : ''}
                {field}
                {element.type === 'percentage' ? '%' : ''}
            </div>
        </TableCell>);
    }

    /**
     * This function generate the className for an status in a row, you need the array prop (statusColors).
     * @param showWithColor {object} : If display the Checkbox or not, cannot be null.
     * @param status {string} : This is a input status to match into the array, cannot be null.
     * @returns {string} : Return a className or empty.
     */
    getColor(showWithColor, status) {
        if (this.props.statusColors && showWithColor) {
            let match = this.props.statusColors.filter((state) => {
                return state.key === status;
            }).map((color) => color)[0];
            return match.className;
        } else {
            return '';
        }
    }

    /**
     * This function generate the label for an status in a row. This is a hack form to replace the enum label to a
     * normal string.
     * @param nameColumn {string} : The name of column to evaluate, cannot be null.
     * @param value {string} : The value to be replace, cannot be null.
     * @returns {string} : The value to be display, cannot be null.
     */
    getLabel(nameColumn, value) {
        if (this.props.statusColors && nameColumn === 'order_state') {
            let match = this.props.statusColors.filter((state) => {
                return state.key === value;
            }).map((color) => color)[0];
            if (match) {
                return match.label;
            }
        }
        return value;
    }

    /**
     * Sorts the tabled based on a column, the one that triggered the given event
     * @param id: Event has be triggered, cannot be null.
     */
    handleRequestSort(event, id) {
        if (this.totalSearch) {
            let order = 'desc';
            if (this.orderBy === id && this.isAsc === order) {
                order = 'asc';
            }
            this.isAsc = order;
            this.orderBy = id;
            this.props.findElements({isAsc: this.isAsc, orderBy: this.orderBy});
        } else {
            this.orderBy = id;
        }
    }

    /**
     *
     * @param event
     * @param id
     */
    handleKeyDown(event, id) {
        if (event.key === 'space') {
            this.handleClick(event, id);
        }
    }

    /**
     *
     * @param event
     * @param page
     */
    handleChangePage(event, page) {
        console.log(page);
        this.page = page;
        this.offset = page * this.limit;
        this.props.findElements({offset: this.offset, page: this.page});
    }

    /**
     *
     * @param event
     */
    handleChangeRowsPerPage(event) {
        this.limit = event.target.value;
        this.props.findElements({limit: this.limit});
    }

    /**
     *
     * @param event
     * @param checked
     */
    handleSelectAllClick(event, checked) {
        let rowsSelected = [];
        let selectedRow = [];
        if (checked) {
            this.rows.forEach((row, index) => {
                rowsSelected.push(row);
                selectedRow.push(index);
            });
        }
        if (this.rowSelectionFunction) {
            this.rowSelectionFunction(rowsSelected, selectedRow);
        }
        this.selectedRows = rowsSelected;
        this.selectedRowsIndex = selectedRow;

        //This SetState is for a re-render
        if (this.props.refresh) this.props.refresh();
        //this.setState({selectedRows: rowsSelected});
    }

    /**
     * This only determines if a row is selected.
     * @param index {number}: Whether the line is selected or not, can be null.
     * @returns {boolean} : is selected the line.
     */
    isSelected(index) {
        return this.selectedRowsIndex ? this.selectedRowsIndex.indexOf(index) !== -1 : false;
    }

    /**
     * Store the selected row and send to order page.
     * @param id {number} : The row selected by the user, can be null.
     * @param event
     */
    handleClick(event, id) {
        const selected = this.selectedRowsIndex;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        newSelected.forEach((index) => {
            this.selectedRows.push(this.rows[index]);
        });

        this.selectedRowsIndex = newSelected;
        if (this.props.refresh) this.props.refresh();

        if (this.rowSelectionFunction) {
            this.rowSelectionFunction(this.selectedRows, this.selectedRowsIndex);
        }
    }

    /**
     * Renders the component.
     *
     * @return {XML} The jsx component to be rendered, never null.
     */
    render() {
        let countColumns = this.props.columnsCount;
        if (this.showCheckboxes) {
            countColumns++;
        }
        const loading = (
            <TableRow>
                <TableCell
                    colSpan={countColumns}
                    className={"avenue-not-found-container" + this.props.notFoundHeight ?
                        this.props.notFoundHeight : ""}>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <CircularProgress size={150}/>
                    </div>
                </TableCell>
            </TableRow>
        );

        const tableFooter = (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={this.totalSearch}
                        rowsPerPage={this.limit}
                        page={this.page}
                        onChangePage={this.handleChangePage.bind(this)}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                    />
                </TableRow>
            </TableFooter>);

        const noResultFound = (
            <TableRow>
                <TableCell
                    colSpan={countColumns}
                    className={"avenue-not-found-container" + this.props.notFoundHeight ?
                        this.props.notFoundHeight : ""}>
                    <div style={{width: '100%'}}>
                        <div className="avenue-row-align">
                            {/*<img
                                alt="Search Not Found"
                                src={SEARCH_EMPTYSTATE}
                                className="avenue-search-not-found-icon"/>*/}
                        </div>
                        <div className="avenue-row-align">
                            <span>No results found for your search.</span>
                        </div>

                    </div>
                </TableCell>
            </TableRow>
        );

        const noHaveElements = (
            <TableRow
                style={{height: this.props.height}}>

                <TableCell
                    colSpan={countColumns}
                    style={{height: this.props.height}}
                    className={"avenue-not-found-container " + this.props.notFoundHeight ?
                        this.props.notFoundHeight : ""}>
                    <div style={{width: '100%'}}>
                        <div className="avenue-row-align">
                            {/*<img
                                alt="Not Found Elements"
                                src={EMPTY_STATE}
                                className="avenue-search-not-found-icon"/>*/}
                        </div>
                        <div className="avenue-row-align">
                            <span>{this.props.notFoundElement[0]}</span>
                        </div>
                        <div className="avenue-row-align">
                            <span>{this.props.notFoundElement[1]}</span>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        );

        let tableRows;

        if (this.props.loading) {
            tableRows = loading;
        } else if (!this.props.loading && this.rows && this.rows.length) {
            tableRows = this.generateTableRows();
        } else if (!this.totalSearch && this.total && !this.props.loading) {
            tableRows = noResultFound;
        } else if (!this.total && !this.props.loading) {
            tableRows = noHaveElements;
        }
        return (
            <div>
                <Table
                    className={this.props.className}>
                    <TableHeader
                        showCheckboxes={this.showCheckboxes}
                        numSelected={this.showCheckboxes ? this.selectedRowsIndex.length : 0}
                        isAsc={this.isAsc}
                        orderBy={this.orderBy}
                        onSelectAllClick={this.handleSelectAllClick.bind(this)}
                        onRequestSort={this.handleRequestSort.bind(this)}
                        rowCount={this.totalSearch}
                        columnsTitles={this.props.columns}/>
                    <TableBody
                        style={{height: this.props.notFoundHeight}}>
                        {tableRows}
                    </TableBody>
                    {this.props.showFooter ?
                        tableFooter : <div/>}
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(Grid);