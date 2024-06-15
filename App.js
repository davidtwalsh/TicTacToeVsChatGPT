import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GridButtons = () => {
  // State for buttons with initial data
  const [buttons, setButtons] = useState([
    { id: 0, text: '' },
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
    { id: 5, text: '' },
    { id: 6, text: '' },
    { id: 7, text: '' },
    { id: 8, text: '' },
  ]);

  const [playerTurn, setPlayerTurn] = useState('X');

  const [gameOverText, setGameOverText] = useState('');

  // Function to handle button press and update text
  const handlePress = (id) => {
    if (buttons[id].text != ''){
      console.log(`"Spot ${id} is already taken!"`)
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
    } else if (playerTurn === 'O'){
      setPlayerTurn('X')
    }
  };

  // useEffect hook with dependency on buttons state
  useEffect(() => {
    checkForWin(); // Call the function after state update
  }, [buttons]); // Dependency array ensures this effect runs only when buttons state changes

  const checkForWin = () => {
    const curPlayer = playerTurn;
    //top row
    if (buttons[0].text != '' && buttons[0].text === buttons[1].text && buttons[0].text === buttons[2].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //middle row
    else if (buttons[3].text != '' && buttons[3].text === buttons[4].text && buttons[3].text === buttons[5].text){
      if (buttons[3].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }  
    //bottom row
    else if (buttons[6].text != '' && buttons[6].text === buttons[7].text && buttons[6].text === buttons[8].text){
      if (buttons[6].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }  
    //first col
    else if (buttons[0].text != '' && buttons[0].text === buttons[3].text && buttons[0].text === buttons[6].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //second col
    else if (buttons[1].text != '' && buttons[1].text === buttons[4].text && buttons[1].text === buttons[7].text){
      if (buttons[1].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //third col
    else if (buttons[2].text != '' && buttons[2].text === buttons[5].text && buttons[2].text === buttons[8].text){
      if (buttons[2].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //diagonal left to right
    else if (buttons[0].text != '' && buttons[0].text === buttons[4].text && buttons[0].text === buttons[8].text){
      if (buttons[0].text === 'X'){
        gameOver('X');
      } else {
        gameOver('O');
      }
    }
    //diagonal right to left
    else if (buttons[2].text != '' && buttons[2].text === buttons[4].text && buttons[2].text === buttons[6].text){
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
  }

  const restartGame = () => {
    console.log("resetting board");
    setPlayerTurn('X');
    const resetButtons = buttons.map(button => ({ ...button, text: '' }));
    setButtons(resetButtons);
    setGameOverText('');
  }

  // Function to render a single button
  const renderButton = (button) => {
    return (
      <TouchableOpacity key={button.id} style={styles.button} onPress={() => handlePress(button.id)}>
        <Text style={styles.buttonText}>{button.text}</Text>
      </TouchableOpacity>
    );
  };

  // Function to render all buttons
  const renderButtons = () => {
    return buttons.map((button) => renderButton(button));
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
    fontSize: 24,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GridButtons;