CREATE DATABASE bandas;

CREATE TABLE banda (

	id_banda SERIAL PRIMARY KEY,
	nome_banda VARCHAR(255) NOT NULL,
	genero_banda VARCHAR(40) NOT NULL

);

CREATE TABLE album (

	id_album SERIAL PRIMARY KEY,
	nome_album VARCHAR(255) NOT NULL,
	data_lanc_album DATE,
	id_banda INT REFERENCES banda(id_banda)

);

INSERT INTO banda(nome_banda, genero_banda)
			VALUES('Motionless In White', 'Metalcore'),
					('Nirvana', 'Grunge'),
					('Foo Fighters', 'Rock'),
					('Metallica', 'Trash Metal'),
					('Avatar', 'Melodic Death Metal');

INSERT INTO album(nome_album, data_lanc_album,  id_banda)
		VALUES('Scoring the End of the World', '2022-06-10', 1);