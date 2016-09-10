
create table birds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) not null,
    weight DECIMAL(5,2) not null,
    height DECIMAL(5,2) not null
)ENGINE=Innodb;


create table records(
    rid int primary key auto_increment,
    location varchar(100),
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id int not null
)ENGINE=Innodb;