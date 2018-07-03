import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


class EnhancedTableToolbar extends React.Component {

    render() {
        const {numSelected, title} = this.props;
        return (
            <Toolbar>
                <div>
                    {numSelected > 0 ? (
                        <Typography type="subheading">{numSelected} selected</Typography>
                    ) : (
                        <Typography type="title">{title}</Typography>
                    )}
                </div>
                <div/>
                <div>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;
