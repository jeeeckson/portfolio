import React, {Component} from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    withStyles
} from 'material-ui';

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
 *
 */
class TableHeader extends Component {

    /**
     * Constructor with mandatory parameters.
     *
     * @param {Object} props The properties to be set to the component, cannot be null.
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.numSelected = props.numSelected;
        this.onRequestSort = props.onRequestSort;
        this.onSelectAllClick = props.onSelectAllClick;
        this.isAsc = props.isAsc;
        this.orderBy = props.orderBy;
        this.rowCount = props.rowCount;
        this.columnsTitles = props.columnsTitles;
        this.showCheckboxes = props.showCheckboxes;
    }

    /**
     * Performs actions while receives again properties.
     * @param props {object}: The properties of component.
     */
    componentWillReceiveProps(props) {
        this.props = props;
        this.numSelected = props.numSelected;
        this.onRequestSort = props.onRequestSort;
        this.onSelectAllClick = props.onSelectAllClick;
        this.isAsc = props.isAsc;
        this.orderBy = props.orderBy;
        this.rowCount = props.rowCount;
        this.columnsTitles = props.columnsTitles;
        this.showCheckboxes = props.showCheckboxes;
    }

    /**
     *
     * @param property
     * @param event
     */
    createSortHandler(property, event) {
        if (event) {
            this.onRequestSort(event, property);
        }
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        let cells = [];
        if (this.showCheckboxes) {
            cells.push(<TableCell
                key="-1"
                padding="checkbox">
                <Checkbox
                    indeterminate={this.numSelected > 0 && this.numSelected < this.rowCount}
                    checked={this.numSelected === this.rowCount}
                    onChange={this.onSelectAllClick}
                />
            </TableCell>);
        }
        cells.push(this.columnsTitles
            .map(column => {
                return (
                    <TableCell
                        key={column.id}
                        numeric={column.numeric}
                        padding={column.disablePadding ? 'none' : 'default'}
                        className={column.className}>
                        <Tooltip
                            label=""
                            title="Sort"
                            placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                            enterDelay={300}>
                            <TableSortLabel
                                className={column.className}
                                active={this.orderBy === column.id}
                                direction={this.isAsc}
                                onClick={(event) => this.createSortHandler(column.id, event)}>
                                {column.label}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                );
            }, this));

        return (
            <TableHead>
                <TableRow>
                    {cells}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles)(TableHeader);