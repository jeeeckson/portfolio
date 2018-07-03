import React from 'react';
import {Button} from '@material-ui/core/Button';
import axios from "axios/index";

class ConnectTo extends React.Component {

    confirm = () => {
        const {friend, user, closeConfirm} = this.props;
        let params = {
            "friend_handle": friend,
            "my_handle": user
        };
        axios.post('/friend_request/confirmed', params).then(res => {
            console.log(res);
            closeConfirm();
        }).catch(err => console.log(err))
    };

    render() {
        const {closeConfirm, friend} = this.props;
        return (
            <div>
                <p>Are you sure you want to connect to {friend}?</p>
                <div>
                    <Button onClick={() => this.confirm(friend)}/>
                    <Button onClick={() => closeConfirm()}/>
                </div>
            </div>
        )
    }
}

export default ConnectTo;
