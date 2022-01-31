import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { data } from './mockData.js';
import PlayerFrame from './Components/PlayerFrame.jsx';
import Ruleset from './Components/Ruleset.jsx';
import Header from './Components/Header.jsx';
import LivingChat from './Components/LivingChat.jsx';
import GhostChat from './Components/GhostChat.jsx';
import WolfChat from './Components/WolfChat.jsx';
import Timer from './Components/Timer.jsx';
import GameButton from './Components/GameButton.jsx';
import Voting from './Components/Voting.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Login from './Components/Login.jsx';



import { io } from 'socket.io-client';

const GamePage = () => {
  //Note: These states are not final in anyway.
  const [timer, setTimer] = useState(0);
  const [previousResult, setPreviousResult] = useState('');
  const [currentDay, setCurrentDay] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [playerRoles, setPlayerRoles] = useState([]);
  const [voting, setVoting] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [phaseResults, setPhaseResults] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [ghostChats, setGhostChats] = useState([]);
  const [livingChats, setLivingChats] = useState([]);
  const [wolfChats, setWolfChats] = useState([]);
  const [host, setHost] = useState('');
  const [playerId, setPlayerId] = useState('');


  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('ws://localhost:8900'));
  }, []);

  //TODO: Add Lifecycle methods as needed.
  useEffect(() => {
    setTimer(data.gameState.timer);
    setPreviousResult(data.gameState.previousResult);
    setCurrentDay(data.gameState.currentDay);
    setCurrentPhase(data.gameState.currentPhase);
    setPlayerRoles(data.gameState.playerRoles);
    setVoting(data.gameState.voting);
    setGameStatus(data.gameState.gameStatus);
    setPhaseResults(data.gameState.phaseResults);
    setPlayerInfo(data.gameState.playerInfo);
    setGhostChats(data.gameState.ghostChats);
    setLivingChats(data.gameState.livingChats);
    setWolfChats(data.gameState.wolfChats);
    setHost(data.gameState.host);
    setPlayerId(data.playerState.player_id);
  })
  //TODO: create handleFunctions. Esp for GameEvents

  const handlePhaseChange = () => {
    //TODO: needs to update currentDay and currentPhase on server when timer runs out
  }
  //QUESTION: are individual player votes sent individually to the server?
  // or are they updated in GamePage to be sent up all together?
  const handleVoting = () => {
    //TODO: needs to send voting object to the server to get phaseResults
  }
  const handleEndOfGame = () => {
    //endgame conditions might automatically be determined from the server
    //TODO: needs to send playerRoles (and voting?) to server to determine if game ends
  }
  const handlePlayerJoiningGame = () => {
    //TODO: needs to tell server when a new player has connected
    //assign player_id, take in user's name and user's chosen icon/image
  }

  //Note: Divs are being used as place holders to avoid errors for missing components
  return (
    //TODO: Fill in components properly with handlers.
    <div>
      <Container fluid>
        <Login />
        <Row>
          <Col>
            <Header
              previousResult={previousResult}
              currentDay={currentDay}
              currentPhase={currentPhase}
            />
          </Col>
        </Row>
        <Row id="chat-row">
          <Col xs={3} id="column">
            <LivingChat
              livingChats={livingChats}
              playerInfo={playerInfo}
              playerId={playerId}
              socket={socket}
            />
          </Col>
          <Col id="column" className="clearfix">
            <PlayerFrame
              voting={voting}
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              timer={timer}
            />
          </Col>
          <Col xs={3} id="column">
            <GhostChat
              ghostChats={ghostChats}
              playerInfo={playerInfo}
              playerId={playerId}
              playerRoles={playerRoles}
              socket={socket}
            />
          </Col>
        </Row>
        <Row>
          <Col id="column">
            <Ruleset
            /* gameLogic object containing game-specific rules (# of wolves, etc) */
            />
          </Col>
          <Col id="column">
            <GameButton
              playerId={playerId}
              playerInfo={playerInfo}
              gameStatus={gameStatus}
            />
            <Voting
              timer={timer}
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              playerRoles={playerRoles}
            />
          </Col>
          <Col id="column">
            <WolfChat
              wolfChats={wolfChats}
              playerInfo={playerInfo}
              playerId={playerId}
              playerRoles={playerRoles}
              socket={socket}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GamePage;
