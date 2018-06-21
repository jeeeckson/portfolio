import React from 'react';
import 'react-dates/initialize';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const Row = styled.div`
    display: ${props => props.hide ? 'none' : 'flex'};
    width: 100%;
    @media (min-width: 996px) {
      padding: ${props => props.withPadding ? '15px 45px 30px' : '0'};
      background-color: ${props => props.withColor ? 'white' : 'none'};
      padding-bottom: ${props => props.withColor ? '14px' : '0px'};
    }
`;
export const RowSon = styled(Row)`
    flex-direction: column;
    @media (min-width: 996px) {
        background-color: 'transparent';
        padding: ${props => props.withPadding ? '15px 45px 30px' : '0'};
        margin-bottom: 25px;
        flex-direction: row;
        padding-bottom: 35px;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            width: 90%;
            bottom: -10px;
            left: 0;
            right: 0;
            margin: auto;
            border-bottom: 1px solid #eee;
        }
    }
`;

class LobbysContainer extends React.Component {
    state = {
        description: '',
        eventDate: new Date(),
        location: '',
        weight: '',
        weightRange: '',
        showPassword: false
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    onDateChange = date => {
        this.setState({eventDate: date});
    };
    render() {
        const {location, description, eventDate} = this.state;
        return (
            <div>
                <TextField
                    label="Título"
                    type="text"
                    value={description}
                    onChange={this.handleChange('description')}
                />
                <TextField
                    label="Lugar"
                    value={location}
                    type="text"
                    onChange={this.handleChange('location')}
                />
                <RowSon>

                </RowSon>

            </div>
        );
        /**
         * <DatePicker
         autoOk
         label="Día del evento"
         clearable
         showTodayButton
         format="DD/MM/YYYY"
         value={eventDate}
         onChange={this.onDateChange}
         animateYearScrolling={true}
         />
         */

    }
}

export default LobbysContainer;
