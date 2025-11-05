USE overtime;

CREATE TABLE player (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL
);

CREATE TABLE game (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  playerid INT NOT NULL,
  time_room_break INT DEFAULT 0,
  time_room_archive INT DEFAULT 0,
  time_room_design INT DEFAULT 0,
  time_room_server INT DEFAULT 0,
  time_room_office INT DEFAULT 0,
  current_room ENUM(
    'break',
    'archive',
    'design',
    'server',
    'office',
    'ending'
  ) NOT NULL DEFAULT 'break',
  ending_choice ENUM(
    'stay',
    'quit',
    'press'
  ) DEFAULT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (playerid) REFERENCES player(id) ON DELETE CASCADE
);

INSERT INTO player (username, password_hash)
VALUES ("demoPlayer", "$2a$12$DANLa.cRt3omOEgb9C0Pk.4KJ2t5NGTwl666CPEb6AXcX51BZI0dS"); -- Bcrypt version of "password"

INSERT INTO game (playerid)
VALUES (1);
