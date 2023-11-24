import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';
import SwipeCards from "react-native-swipe-cards";
import NoMoreCards from "./NoMoreCards";
import AddForm from "./AddForm";
import Card from "./Card";
import RadialProgress from "./RadialProgress";

import Add from "react-native-vector-icons/MaterialIcons";

 import AsyncStorage from "@react-native-async-storage/async-storage";


const SwipeCard = ({ updateSwipedRightCount }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [dataSource, setDataSource] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [swipedRightCount, setSwipedRightCount] = useState(0);
  const [swipedLeftCount, setSwipedLeftCount] = useState(0);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [showNoMoreCards, setShowNoMoreCards] = useState(false);
const [lastVisitedCardId, setLastVisitedCardId] = useState(null);


const db = SQLite.openDatabase("mydatabase.db");
const fetchDataFromAPI = async () => {
  try {
    const response = await fetch("https://eb-api.una.rest/words");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, translation TEXT);",
    [],
    (tx, result) => {
      console.log("Table created successfully.");
    },
    (error) => {
      console.error("Error creating table:", error);
    }
  );
});

 

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const netInfoState = await NetInfo.fetch();
        setIsOnline(netInfoState.isConnected);

     
        db.transaction(async (tx) => {
          const countResult = await new Promise((resolve, reject) => {
            tx.executeSql(
              "SELECT COUNT(*) as count FROM words;",
              [],
              (tx, result) => {
                resolve(result);
              },
              (error) => {
                reject(error);
              }
            );
          });

          const count = countResult.rows.item(0).count;

          if (count === 0 && netInfoState.isConnected) {
            const apiData = await fetchDataFromAPI();

            apiData.forEach(({ word, translation }) => {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO words (word, translation) VALUES (?, ?);",
                  [word, translation],
                  (tx, result) => {
                    console.log("Данные успешно вставлены:", word, translation);
                  },
                  (error) => {
                    console.log("Ошибка при вставке данных: ", error);
                  }
                );
              });
            });

            setCards(cardsToDisplay);
            
          } else {
            setDataSource("SQLite");

         db.transaction((tx) => {
      tx.executeSql("SELECT * FROM words ORDER BY RANDOM();", [], (tx, result) => {
        const len = result.rows.length;
        const data = [];
        for (let i = 0; i < len; i++) {
          const row = result.rows.item(i);
          data.push({
            id: row.id,
            word: row.word,
            translation: row.translation,
          });
        }
        const shuffledData = data.sort(() => Math.random() - 0.5);

        console.log("Data fetched from SQLite:", shuffledData);

        setCards(shuffledData);
        setLoading(false);
              });
            });

            db.transaction((tx) => {
              tx.executeSql(
                "SELECT COUNT(*) as count FROM words;",
                [],
                (tx, result) => {
                  const count = result.rows.item(0).count;
                  setWordCount(count);
                },
                (error) => {
                  console.log(
                    "Error while fetching word count from SQLite:",
                    error
                  );
                }
              );
            });
          }
        });

        if (count === 0 && netInfoState.isConnected) {
          // ... остальной код

          setCards(apiData);

          // Сохраняем ID последней карточки в AsyncStorage
          if (apiData.length > 0) {
            await AsyncStorage.setItem("lastCardId", apiData[apiData.length - 1].id.toString());
          }
        } else {
          setDataSource("SQLite");

          // ... остальной код
        }




        setTimeout(() => {
          setShowNoMoreCards(true);
        }, 30000);

        setLoading(false);
        const storedLastCardId = await AsyncStorage.getItem("lastCardId");

        if (storedLastCardId) {
          setLastVisitedCardId(parseInt(storedLastCardId, 10));
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
      
    };

    fetchAndSetData();
  }, []);

  const handleYup = (card) => {
    console.log(`Swiped right for: ${card.word}`);
    setSwipedRightCount((prevCount) => prevCount + 1);
    setCurrentCardId(card.id);
    AsyncStorage.setItem("lastCardId", card.id.toString());

    console.log(`Current Card ID (Yup): ${card.id}`);

    console.log("Swiped right for card:", card);
    if (card.id) {
      console.log("Current Card ID (Yup):", card.id);
      setCurrentCardId(card.id);
    } else {
      console.log("Card does not have an ID property.");
    }

    updateSwipedRightCount((prevCount) => prevCount + 1);
    setCurrentCardId(card.id);
    AsyncStorage.setItem("lastCardId", card.id.toString());

  };

  const handleNope = (card) => {
    console.log(`Swiped left for: ${card.word}`);
    setSwipedLeftCount((prevCount) => prevCount + 1);
    setCurrentCardId(card.id);

    console.log(`Current Card ID (Yup): ${card.id}`);
    console.log("Swiped left for card:", card);
    if (card.id) {
      console.log("Current Card ID (Nope):", card.id);
      setCurrentCardId(card.id);
    } else {
      console.log("Card does not have an ID property.");
    }
    AsyncStorage.setItem("lastCardId", card.id.toString());

  };

  const handleAddWord = (word, translation) => {
    // Add a new word to the SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO words (word, translation) VALUES (?, ?);",
        [word, translation],
        (tx, result) => {
          console.log("Word added to the database:", word, translation);
        },
        (error) => {
          console.log("Error adding word to the database: ", error);
        }
      );
    });

    const newCard = { id: cards.length + 1, word, translation };
    setCards([...cards, newCard]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Image
          source={require("../assets/loading.gif")}
          style={{
            width: 100,
            height: 200,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
      ) : (
        <>

  
           <Text>Data Source: {dataSource}</Text>
          <Text>Number of Words in DB: {wordCount}</Text>
          <Text>Swiped Right: {swipedRightCount}</Text>
          <Text>Swiped Left: {swipedLeftCount}</Text>
          <Text>Current Card ID: {currentCardId}</Text> 
       
          <View style={styles.containerProgress}>
          <RadialProgress value={Math.round((swipedRightCount / wordCount) * 100)} />
            </View> 
          <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card {...cardData} />}
            handleYup={handleYup}
            handleNope={handleNope}
            hasMaybeAction={false}  
            renderNoMoreCards={() => (showNoMoreCards ? <NoMoreCards /> : null)}
            initialCardIndex={lastVisitedCardId ? cards.findIndex(card => card.id === lastVisitedCardId) : 0}

          />
          <Text style={[styles.buttonText]}>add your word</Text>
          <Pressable
            style={[styles.button]}
            underlayColor="#c4661f"
            onPress={() => setShowForm(true)}
          >
            <AddForm
              visible={showForm}
              onClose={() => setShowForm(false)}
              onAddWord={handleAddWord}
            />

            <View>
              <Text style={[styles.buttonText]}>
                <Add name="add" size={30} />
              </Text>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#b99470",
    borderRadius: 50,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "vidaloka",
    fontSize: 20,
    color: "#783d19",
  },
  addButton: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  containerProgress:{
    position: "absolute",
    top:200,
  }
});

export default SwipeCard;