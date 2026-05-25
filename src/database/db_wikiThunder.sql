create database wikiThunder;
use wikiThunder;

create table users (
    idUser int auto_increment,
    nickname varchar(50) not null unique,
    email varchar(100) not null unique,
    password varchar(255) not null,
    main_nation varchar(45),
    playstyle_pref varchar(45),
    creation_date timestamp,
    constraint pk_User primary key (idUser)
);

create table vehicles (
    idVehicle int auto_increment,
    identifier varchar(100) not null unique,
    country varchar(50),
    vehicle_type varchar(50),
    realistic_br decimal(4,1),
    constraint pk_vehicles primary key (idVehicle)
);

create table favorites (
    idFavorite int auto_increment,
    idUser int not null,
    idVehicle int not null,
    addition_time timestamp,
    constraint pk_Favorites primary key (idFavorite),
    constraint fk_Favorites_User foreign key (idUser) references users(idUser),
    constraint fk_Favorites_vehicles foreign key (idVehicle) references vehicles(idVehicle)
);

select * from users;
select * from vehicles;
select * from favorites;