import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
export default class Messages extends Component {
    constructor(props) {
        super(props);

    }

    scrollDown = () => {
        const {container} = this.refs;
        container.scrollTop = container.scrollHeight
    };

    componentDidMount() {
        this.scrollDown()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
    }

    render() {
        const {messages, user, typingUsers, name} = this.props;
        return (
            <div ref='container'
                 className="thread-container">
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Messages of {name}
                        </Typography>
                        <Typography  component="h6">
                            {
                                messages.map((mes) => {
                                    return (
                                        <div
                                            key={mes.id}
                                            className={`message-container ${mes.sender === user.name && 'right'}`}
                                        >

                                            <div className="time">{mes.time}</div>
                                            <div className="data">
                                                <Column>
                                                    <Row>
                                                        <div className="name">{mes.sender}</div>
                                                        : <div className="message">{mes.message}</div>
                                                    </Row>
                                                </Column>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                            {
                                typingUsers.map((name) => {
                                    return (
                                        <div key={name} className="typing-user">
                                            {`${name} is typing . . .`}
                                        </div>
                                    )
                                })
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
