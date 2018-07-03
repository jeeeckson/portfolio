import React from 'react';
import TextField from '@material-ui/core/TextField';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons/';
import styled from 'styled-components';
import {DatePicker, TimePicker} from 'material-ui-pickers';
import YouTube from 'react-youtube';
import {SoundCloud} from './../../components/SoundCloud';

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

class LobbysContainer extends React.PureComponent {
    state = {
        description: '',
        eventDate: new Date(),
        location: '',
        weight: '',
        weightRange: '',
        timeEnd: new Date(),
        timeStart: new Date(),
        showPassword: false,
        opts: {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        }
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    onDateChange = eventDate => {
        this.setState({eventDate});
    };

    onTimeStartChange = timeStart => {
        this.setState({timeStart});
    };

    onTimeEndChange = timeEnd => {
        this.setState({timeEnd});
    };

    onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    render() {
        const {location, description, eventDate, timeStart, timeEnd, opts} = this.state;
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
                <div className="picker">
                    <DatePicker
                        value={eventDate}
                        onChange={this.onDateChange}
                        disablePast
                        format="DD-MM-YYYY"
                        showTodayButton
                        autoOk
                        emptyLabel="Día"
                        leftArrowIcon={<KeyboardArrowLeft/>}
                        rightArrowIcon={<KeyboardArrowRight/>}
                    />
                    <TimePicker
                        value={timeStart}
                        onChange={this.onTimeStartChange}
                    />
                    <TimePicker
                        value={timeEnd}
                        onChange={this.onTimeEndChange}
                    />
                    <YouTube
                        videoId="IVohvU3WApo"
                        opts={opts}
                        onReady={this.onReady}
                    />
                    {SoundCloud()}
                </div>

            </div>
        );
    }
}

export default LobbysContainer;
