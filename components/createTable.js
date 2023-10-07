import React from "react";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("mydatabase.db");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, translation TEXT);",
      [],
      (tx, result) => {
        console.log('Таблица "words" успешно создана');
      },
      (error) => {
        console.log('Ошибка при создании таблицы "words": ', error);
      }
    );
  });
};

export default createTable;
