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
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (playerid) REFERENCES player(id) ON DELETE CASCADE
);
INSERT INTO player (username, password_hash)
VALUES ("demo_player", "password");
INSERT INTO game (playerid)
VALUES (1);