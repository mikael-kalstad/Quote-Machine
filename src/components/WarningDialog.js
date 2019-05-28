import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Title = styled.p`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: #333;
`

const Text = styled.p`
    font-size: 20px;
    font-weight: 300;
`

const ButtonRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    margin-left: 50%;
`

const ActionBtn = styled.button`
    width: 95px;
    height: 38px;
    color: white; 
    font-size: 13px;
    border-radius: 6px;
    outline: none;
    border: none;
    background-color: #cc4f52;
    cursor: pointer;
`

const Cancel = styled.a`
    cursor: pointer;
    font-size: 15px;
    color: grey;
`

const Exit = styled.div`
    position: absolute;
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #444;
    top: 13px;
    right: 13px;
    cursor: pointer;
`

class WarningDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        }
    }

    render() {
        const Container = styled.div`
            position: absolute;
            visibility:  ${this.props.show ? "show" : "hidden"};
            margin: auto;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: 450px;
            height: 250px;;
            padding: 30px;
            border-radius: 10px;
            background-color: white;
            z-index: 999;

            /* Layout */
            display: grid;
            grid-template-rows: 50px auto 50px;
        `

        return (
            <Container>
                <Title>{this.props.title}</Title>
                <Text>{this.props.text}</Text>
                <ButtonRow>
                    <Cancel onClick={this.props.cancelAction}>{this.props.cancelMsg ? this.props.cancelMsg : "cancel"}</Cancel>
                    <ActionBtn onClick={this.props.action}>{this.props.actionMsg ? this.props.actionMsg : "Yes"}</ActionBtn>
                </ButtonRow>
                <Exit onClick={this.props.cancelAction}>
                    <FontAwesomeIcon icon="times"/>
                </Exit>
            </Container>
        )
    }
}

export default WarningDialog;