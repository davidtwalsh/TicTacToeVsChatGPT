import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, TextInput} from 'react-native';
import ChatGPTService from './ChatGPTService';

let isGameOver = false;

const GridButtons = () => {
  // State for buttons with initial data
  const [buttons, setButtons] = useState([
    { id: 0, text: 'E' },
    { id: 1, text: 'E' },
    { id: 2, text: 'E' },
    { id: 3, text: 'E' },
    { id: 4, text: 'E' },
    { id: 5, text: 'E' },
    { id: 6, text: 'E' },
    { id: 7, text: 'E' },
    { id: 8, text: 'E' },
  ]);

  const [playerTurn, setPlayerTurn] = useState('X');

  const [gameOverText, setGameOverText] = useState('');

  // Function to handle button press and update text
  const handlePress = (id) => {

    if (isGameOver === true){
      return;
    }
    if (buttons[id].text != 'E'){
      console.log(`"Spot ${id} is already taken!"`);
      return
    }
    if (playerTurn == 'O') {
      console.log('button pressed but its ChatGPTs turn');
      return
    }
    // Find the button in the state array and update its text
    const updatedButtons = buttons.map(button =>
      button.id === id ? { ...button, text: playerTurn} : button
    );
    // Update state with the new buttons array
    setButtons(updatedButtons);
    //Update player turn
    if (playerTurn === 'X'){
      setPlayerTurn('O')
    }
  };

  // useEffect hook with dependency on buttons state
  useEffect(() => {
    checkForWin(); // Call the function after state update
  }, [buttons]); // Dependency array ensures this effect runs only when buttons state changes

  useEffect(() => {
    getChatGPTInput(); // Call the function after state update
  }, [playerTurn]); // Dependency array ensures this effect runs only when playerturn state changes

  const checkForWin = () => {
    const curPlayer = playerTurn;
    //top row
    if (buttons[0].text != 'E' && buttons[0].text === buttons[1].text && buttons[0].text === buttons[2].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //middle row
    else if (buttons[3].text != 'E' && buttons[3].text === buttons[4].text && buttons[3].text === buttons[5].text){
      if (buttons[3].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }  
    //bottom row
    else if (buttons[6].text != 'E' && buttons[6].text === buttons[7].text && buttons[6].text === buttons[8].text){
      if (buttons[6].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }  
    //first col
    else if (buttons[0].text != 'E' && buttons[0].text === buttons[3].text && buttons[0].text === buttons[6].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //second col
    else if (buttons[1].text != 'E' && buttons[1].text === buttons[4].text && buttons[1].text === buttons[7].text){
      if (buttons[1].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //third col
    else if (buttons[2].text != 'E' && buttons[2].text === buttons[5].text && buttons[2].text === buttons[8].text){
      if (buttons[2].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //diagonal left to right
    else if (buttons[0].text != 'E' && buttons[0].text === buttons[4].text && buttons[0].text === buttons[8].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //diagonal right to left
    else if (buttons[2].text != 'E' && buttons[2].text === buttons[4].text && buttons[2].text === buttons[6].text){
      if (buttons[2].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
  }

  const gameOver = (winner) => {
    if (winner == 'X'){
      setGameOverText("You win!")
    } else {
      setGameOverText("ChatGPT wins!");
    }
    isGameOver = true;
  }

  const restartGame = () => {
    console.log("resetting board");
    setPlayerTurn('X');
    const resetButtons = buttons.map(button => ({ ...button, text: 'E' }));
    setButtons(resetButtons);
    setGameOverText('');
    isGameOver = false;
  }

  // Function to render a single button
  const renderButton = (button) => {
    // Conditionally render buttonText based on button.text value
    const buttonText = button.text === 'E' ? "" : button.text;

    return (
      <TouchableOpacity key={button.id} style={styles.button} onPress={() => handlePress(button.id)}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  // Function to render all buttons
  const renderButtons = () => {
    return buttons.map((button) => renderButton(button));
  };

  const getChatGPTInput = () => {
    if (playerTurn === 'X'){
      return //its the users turn so return out
    }
    let input = '';
    input += 'We are playing TicTacToe.' + '\n';
    input += 'I am X and you are O.' + '\n';
    input += 'E means the space is empty.' + '\n';
    input += 'The state of the board is:' + '\n';

    let board = '';
    board += buttons[0].text + ' | ' + buttons[1].text + ' | ' + buttons[2].text + '\n';
    board += buttons[3].text + ' | ' + buttons[4].text + ' | ' + buttons[5].text + '\n';
    board += buttons[6].text + ' | ' + buttons[7].text + ' | ' + buttons[8].text + '\n';

    input += board;
    input += 'It is your turn, where do you want to go?' + '\n';
    input += 'Answer in the following format:' + '\n';
    input += '(Row#,Column#)' + '\n';
    input += 'Only include the line above in your response.';
    input += 'The possible choices you can make are: (0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1) or (2,2)'

    console.log(input);
    handleSend(input);
  };

  const handleSend = async (input) => {
    const result = await ChatGPTService(input);

    processChatGPTTurn(result);
  };

  const processChatGPTTurn = (response) => {

    if (isGameOver == true){
      return;
    }
    console.log(`ChatGPT Response is: ${response}`);
    try {
      response = response.slice(1, -1); // This will give remove the parentheses
      response = response.replaceAll('Row','');
      response = response.replaceAll('Column','')
      response = response.replaceAll('#','');
      response = response.replaceAll(' ','');
      console.log(`Parsed response: ` + response);
      let parts = response.split(',') // will give array ["row #,col #"]
      let row = parseInt(parts[0],10);
      let col = parseInt(parts[1],10);

      butNumber = (3 * row) + col;
      if (buttons[butNumber].text == 'E'){
        buttons[butNumber].text = 'O';
        const updatedButtons = buttons.map(button =>
          button.id === butNumber ? { ...button, text: 'O'} : button
        );
        setButtons(updatedButtons);
        setPlayerTurn('X');
      } else {
        buttonNumber = 0;
        for (let i = 0; i < buttons.length; i++){
          if (buttons[i].text === 'E'){
            buttonNumber = i;
            break;
          }
        }
        const updatedButtons = buttons.map(button =>
          button.id === buttonNumber ? { ...button, text: 'O'} : button
        );
        setButtons(updatedButtons);
        setPlayerTurn('X');
      }

    } catch (exception) {
      console.log(exception);
      console.log('Error parsing ChatGPT response, default placing space for it in first empty space');
      buttonNumber = 0;
      for (let i = 0; i < buttons.length; i++){
        if (buttons[i].text === 'E'){
          buttonNumber = i;
          break;
        }
      }
      const updatedButtons = buttons.map(button =>
        button.id === buttonNumber ? { ...button, text: 'O'} : button
      );
      setButtons(updatedButtons);
      setPlayerTurn('X');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>{gameOverText}</Text>
      <View style={styles.gridContainer}>{renderButtons()}</View>
      <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
        <Text style={styles.buttonText}>
          Restart Button
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    margin: 5,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  restartButton: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a8f96',
    margin: 5,
  },
  gameOverText: {
    height: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GridButtons;