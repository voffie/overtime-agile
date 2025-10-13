USE overtime;

CREATE TABLE player (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL
);

CREATE TABLE game (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  playerid INT NOT NULL,
  time_taken INT DEFAULT 0, -- time taken in seconds
  current_room INT NOT NULL DEFAULT 0,
  status ENUM('completed', 'in-progress') NOT NULL DEFAULT 'in-progress',
  FOREIGN KEY (playerid) REFERENCES player(id)
);

INSERT INTO player (username, password_hash)
VALUES ("demo_player", "password");

INSERT INTO game (playerid)
VALUES (1);
