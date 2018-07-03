import React, {Component} from 'react';
import styled from 'styled-components';

const Title = styled.div`
    color: #ffd;
    margin: 0.7em 0;
    font-size: 2.8125rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.06667em;
    margin-left: 16em;
`;
export default class Home extends Component {
    render() {
        return (
            <div>
                <Title>Sesale</Title>
            </div>
        );
    }

}
