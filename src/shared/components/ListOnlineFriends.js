import React from 'react';
import {Button} from '@material-ui/core/Button';

class ListOnlineFriends extends React.Component {

    render() {
        const {online_friends} = this.props;
        return (
            <div>
                <p>List of online user friends<span>{online_friends.length}</span></p>
                <ul>
                    {online_friends.map((friend, index) => {
                        return (
                            <li key={index}>
                                <Button onClick={() => this.chat_popup(friend)}>
                                    <span>{friend}</span>
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ListOnlineFriends;
