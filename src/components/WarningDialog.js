import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`

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
        const Dialog = styled.div`
            position: absolute;
            visibility:  ${this.props.show ? "show" : "hidden"};
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            margin-top: 300px;
            width: 450px;
            height: 250px;;
            padding: 30px;
            border-radius: 10px;
            background-color: white;
            z-index: 999;

            /* Layout */
            display: grid;
            grid-template-rows: 50px auto 50px;

            animation: popup 200ms 1 ease;

            @keyframes popup {
                0% {
                    opacity: 0;
                    margin-top: 700px;
                }
                100% {
                    opacity: 1;
                    margin-top: 300px;
                }
            }
        `

        return ( 
            <Overlay onClick={this.props.cancelAction}>       
                <Dialog>
                    <Title>{this.props.title}</Title>
                    <Text>{this.props.text}</Text>
                    <ButtonRow>
                        <Cancel onClick={this.props.cancelAction}>{this.props.cancelMsg ? this.props.cancelMsg : "cancel"}</Cancel>
                        <ActionBtn onClick={this.props.action}>{this.props.actionMsg ? this.props.actionMsg : "Yes"}</ActionBtn>
                    </ButtonRow>
                    <Exit onClick={this.props.cancelAction}>
                        <FontAwesomeIcon icon="times"/>
                    </Exit>
                </Dialog>
            </Overlay>
        )
    }
}

export default WarningDialog;