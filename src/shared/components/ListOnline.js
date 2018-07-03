import React from 'react';
import {Button} from '@material-ui/core/Button';

class ListOnline extends React.Component {

    friend_request = (user) => {
        this.setState({
            friend: user
        });
    };

    render() {
        return (
            <div>
                <p>List of online users {this.props.list.length}</p>
                <ul>
                    {this.props.list.map((user, index) => {
                        return (
                            <li key={index}>
                                <Button onClick={() => this.friend_request(user)}>
                                    <span>{user}</span>
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ListOnline;
