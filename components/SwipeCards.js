import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from "expo-sqlite";
import SwipeCards from "react-native-swipe-cards";
import NoMoreCards from "./NoMoreCards";
import AddForm from "./AddForm";
import Card from "./Card";
import RadialProgress from "./RadialProgress";

import Add from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Reload from "react-native-vector-icons/AntDesign";

const SwipeCard = ({ updateSwipedRightCount, onRadialProgressChange }) => {
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

  const [wordCountWithTagRight, setWordCountWithTagRight] = useState(0);

  const [countGreaterThanThree, setCountGreaterThanThree] = useState(0);

  const [countWithTagRight3, setCountWithTagRight3] = useState(0);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [showStartButton, setShowStartButton] = useState(false);
  const [showView, setShowView] = useState(false);


  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowView(true);
    }, 2000);

    // Очистка таймаута при размонтировании компонента
    return () => clearTimeout(timeoutId);
  }, []); 

  
  useEffect(() => {
    const startButtonValue =  AsyncStorage.getItem("startButton");
console.log('startButtonValue ',startButtonValue);
    // Check if the start button value is set in AsyncStorage
    if (startButtonValue && startButtonValue === "0") {
        setShowStartButton(true);
    }
     else if (startButtonValue && startButtonValue === "1") {
      setShowStartButton(false);
  }



    setDataLoaded(true);
   fetchAndSetData();
}, []);


  // console.log('start');
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
      "CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, translation TEXT, tag TEXT, count INTEGER);",
      [],
      (tx, result) => {
        console.log("Table created successfully.");
      },
      (error) => {
        console.error("Error creating table:", error);
      }
    );
  });

  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'ALTER TABLE words ADD COLUMN tag TEXT;',
  //     [],
  //     (tx, result) => {
  //       console.log('Column "tag" added successfully.');
  //     },
  //     (error) => {
  //       console.log('Error adding column "tag":', error);
  //     }
  //   );

  //   tx.executeSql(
  //     'ALTER TABLE words ADD COLUMN count INTEGER;',
  //     [],
  //     (tx, result) => {
  //       console.log('Column "count" added successfully.');
  //     },
  //     (error) => {
  //       console.log('Error adding column "count":', error);
  //     }
  //   );
  // });

  // useEffect(() => {
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

          let count = countResult.rows.item(0).count;

          if (count === 0 && netInfoState.isConnected) {
            const apiData = await fetchDataFromAPI();

            apiData.forEach(({ word, translation }) => {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO words (word, translation, tag, count) VALUES (?, ?, ?, ?);",
                  [word, translation, "", 0], // Initialize tag as an empty string and count as 0
                  (tx, result) => {
                    // console.log("Data inserted successfully:", word, translation);
                  },
                  (error) => {
                    console.log("Error inserting data: ", error);
                  }
                );
              });
            });

            setCards(apiData);
            const wordCountRight = apiData.filter(
              (word) => word.tag === "right"
            ).length;
            setWordCountWithTagRight(wordCountRight);

            setDataLoaded(true); // Move this inside the if statement
          } else {
            setDataSource("SQLite");
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT COUNT(*) as count FROM words WHERE tag = 'right';",
                [],
                (tx, result) => {
                  const countRight = result.rows.item(0).count;
                  setWordCountWithTagRight(countRight);
                },
                (error) => {
                  console.log(
                    "Ошибка при получении количества слов с тегом 'right' из SQLite:",
                    error
                  );
                }
              );
            });
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT * FROM words WHERE count <= 3 ORDER BY RANDOM();",
                [],
                (tx, result) => {
                  const len = result.rows.length;
                  const data = [];
                  for (let i = 0; i < len; i++) {
                    const row = result.rows.item(i);
                    data.push({
                      id: row.id,
                      word: row.word,
                      translation: row.translation,
                      tag: row.tag,
                      count: row.count,
                    });
                  }
                  const shuffledData = data.sort(() => Math.random() - 0.5);

                  setCards(shuffledData);
                  console.log(shuffledData);

                  setLoading(false);
                }
              );
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
            await AsyncStorage.setItem(
              "lastCardId",
              apiData[apiData.length - 1].id.toString()
            );
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
        setDataLoaded(true); // Установите флаг, когда данные загружены
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

  //   fetchAndSetData();
  // }, []);

  useEffect(() =>{
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM words WHERE tag = 'right';",
        [],
        (tx, result) => {
          const countRight = result.rows.item(0).count;
          setWordCountWithTagRight(countRight);
        },
        (error) => {
          console.log(
            "Ошибка при получении количества слов с тегом 'right' из SQLite:",
            error
          );
        }
      );
    });
  },);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM words WHERE count >= 3;",
        [],
        (tx, result) => {
          const countItem = result.rows.item(0);
          const count = countItem ? countItem.count : 0;
          setCountGreaterThanThree(count);
        },
        (error) => {
          console.log(
            "Error fetching count of cards with count >= 3 from SQLite:",
            error
          );
        }
      );
    });
  }, [swipedRightCount, swipedLeftCount]);

  const handleYup = (card) => {
    setSwipedRightCount((prevCount) => prevCount + 1);
    setCurrentCardId(card.id);
    AsyncStorage.setItem("lastCardId", card.id.toString());

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT count FROM words WHERE id = ?;",
        [card.id],
        (tx, result) => {
          const currentCount = result.rows.item(0).count || 0;
          tx.executeSql(
            "UPDATE words SET tag = 'right', count = ? WHERE id = ?;",
            [currentCount + 1, card.id],
            (tx, result) => {
              updateProgress(); // Added to update progress after each swipe
            },
            (error) => {
              console.log("Error updating tag and count:", error);
            }
          );
        },
        (error) => {
          console.log("Error fetching count:", error);
        }
      );
    });
  };

  const handleNope = (card) => {
    setSwipedLeftCount((prevCount) => prevCount + 1);
    setCurrentCardId(card.id);

    AsyncStorage.setItem("lastCardId", card.id.toString());
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT count FROM words WHERE id = ?;",
        [card.id],
        (tx, result) => {
          const currentCount = result.rows.item(0).count || 0;
          tx.executeSql(
            "UPDATE words SET tag = 'left', count = ? WHERE id = ?;",
            [currentCount + 1, card.id],
            (tx, result) => {
              updateProgress(); // Added to update progress after each swipe
            },
            (error) => {
              console.log("Error updating tag and count:", error);
            }
          );
        },
        (error) => {
          console.log("Error fetching count:", error);
        }
      );
    });
  };

  const updateProgress = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM words WHERE count >= 3;",
        [],
        (tx, result) => {
          const countWithTagRight3 = result.rows.item(0).count;
          setCountWithTagRight3(countWithTagRight3);
        },
        (error) => {
          console.log("Error updating progress:", error);
        }
      );
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM words WHERE count >= 3;",
        [],
        (tx, result) => {
          const countWithTagRight3 = result.rows.item(0).count;
          setCountWithTagRight3(countWithTagRight3);
        },
        (error) => {
          console.log("Error updating progress:", error);
        }
      );
    });
  }, [swipedRightCount, swipedLeftCount]);

  const handleAddWord = (word, translation) => {
    // Add a new word to the SQLite database
    db.transaction((tx) => {
      // Inside the transaction where you insert new data
      tx.executeSql(
        "INSERT INTO words (word, translation, tag, count) VALUES (?, ?, ?, ?);",
        [word, translation, "", 0], // Initialize tag as an empty string and count as 0
        (tx, result) => {
          // console.log("Data inserted successfully:", word, translation, tag, count);
        },
        (error) => {
          console.log("Error inserting data: ", error);
        }
      );
    });

    const newCard = { id: cards.length + 1, word, translation };
    setCards([...cards, newCard]);
  };

  const restartApp = async () => {
    try {
      // Clear the SQLite table
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM words;", [], (tx, result) => {
          console.log("Table cleared successfully.");
        });
      });

      // Fetch data from the API
      const apiData = await fetchDataFromAPI();

      // Insert new data into the SQLite table
      apiData.forEach(({ word, translation }) => {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO words (word, translation, tag, count) VALUES (?, ?, ?, ?);",
            [word, translation, "", 0],
            (tx, result) => {
              console.log("Data inserted successfully:", word, translation);
            },
            (error) => {
              console.log("Error inserting data: ", error);
            }
          );
        });
      });

      // Update state and reset other necessary values
      setCards(apiData);
      setWordCountWithTagRight(0);
      setSwipedRightCount(0);
      setSwipedLeftCount(0);
      setCurrentCardId(null);
      setLastVisitedCardId(null);
      setShowNoMoreCards(false);
      setCountGreaterThanThree(0);
      setCountWithTagRight3(0);

      // Save the ID of the last card to AsyncStorage
      if (apiData.length > 0) {
        await AsyncStorage.setItem(
          "lastCardId",
          apiData[apiData.length - 1].id.toString()
        );
      }
    } catch (error) {
      console.error("Error restarting app:", error);
    }
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
          <View style={styles.containerProgress}>
            <RadialProgress
              value={Math.round((countWithTagRight3 / wordCount) * 100)}
            />
          </View>

          <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card {...cardData} />}
            handleYup={handleYup}
            handleNope={handleNope}
            hasMaybeAction={false}
            renderNoMoreCards={() => (showNoMoreCards ? <NoMoreCards /> : null)}
            initialCardIndex={
              lastVisitedCardId
                ? cards.findIndex((card) => card.id === lastVisitedCardId)
                : 0
            }
          />

          <View style={styles.buttonContainer}>
            <View>
              <Pressable
                style={[styles.button]}
                underlayColor="#c4661f"
                onPress={() => setShowConfirmationModal(true)}
              >
                <Text style={[styles.buttonText]}>
                  <Reload name="reload1" size={40} />
                </Text>
              </Pressable>
            </View>

            <View>
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
                    <Add name="add" size={40} />
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* )}  */}

          <Modal
            animationType="fade"
            transparent={true}
            visible={showConfirmationModal}
            onRequestClose={() => setShowConfirmationModal(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to restart?
                </Text>
                <Pressable
                  style={[styles.button, styles.modalButton]}
                  onPress={() => {
                    setShowConfirmationModal(false);
                    restartApp();
                  }}
                >
                  <Text style={[styles.buttonText]}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.modalButton]}
                  onPress={() => setShowConfirmationModal(false)}
                >
                  <Text style={[styles.buttonText]}>No</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
       )} 
       <View>
       {loading && showView && (
  <Pressable
    style={[styles.button]}
    underlayColor="#c4661f"
    onPress={async () => {
      await AsyncStorage.setItem("startButton", "1");
      setShowStartButton(false);
      restartApp();
      fetchAndSetData();
    }}
  >
    <Text style={[styles.buttonText]}>Start</Text>
  </Pressable>
)}


</View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    display: "flex",
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#6c526f",
    borderRadius: 15,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#a9b388",
  },

  containerProgress: {
    position: "absolute",
    top: 200,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "absolute",
    backgroundColor: "#fefae0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 45,
    borderRadius: 20,
    width: 250,
    textAlign: "center",
    color: "#756685",
    margin: "auto",
    borderWidth: 2,
    borderColor: "#5f6f52",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "vidaloka",
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "#6c526f",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
  },
  modalButton: {},
  toggleButton: {
    position: "absolute",
    bottom: 0,
  },
  addButton: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  toggleButtonText: {
    fontFamily: "vidaloka",
    fontSize: 20,
    color: "#783d19",
  },
});

export default SwipeCard;
