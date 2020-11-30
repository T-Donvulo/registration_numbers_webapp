create table town_codes(
    id serial primary key,
    code text not null,
    townName text not null
);

create table number_plate(
    id serial primary key,
    numberPlate text not null,
    townName_id int not null,
    foreign key (townName_id) references town_codes(id)

);

insert into town_codes (code, townName) values ('Botshabelo', 'CB');
insert into town_codes (code, townName) values('ThabaNchu', 'CT');
insert into town_codes (code, townName) values('Bloemfontein', 'CS');


