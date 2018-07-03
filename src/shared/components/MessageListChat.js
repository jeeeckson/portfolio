import React from 'react';

class MessageList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.messages && this.props.messages.map((message, index) => {
                    return (
                        <li key={index}>
                            <div>{message.user}</div>
                            <br/>
                            <div>{message.message}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default MessageList;
