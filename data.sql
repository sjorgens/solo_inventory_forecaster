--Create tables
CREATE TABLE parts
(
id SERIAL PRIMARY KEY,
part_number varchar(255),
manufacturer varchar(255),
part_description varchar(255),
quantity_available real
);


CREATE TABLE orders
(
id SERIAL PRIMARY KEY,
part_id int,
quantity_required real,
CONSTRAINT partsFk FOREIGN KEY
(part_id) REFERENCES parts(id)
);

--Parts data
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('2071E BL 4/23 W1000', 'Systimax', 'Plenum Cat6 23AWG 4Pair UTP Blue 1000Ft Box', 55000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('2071E WH 4/23 W1000', 'Systimax', 'Plenum Cat6 23AWG 4Pair UTP White 1000Ft Box', 40000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('1071E LB 4/23 W1000', 'Systimax', 'Riser Cat6 23AWG 4Pair UTP Slate 1000Ft Box', 48000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('2061F BL 4/24 W1000', 'Systimax', 'Plenum Cat5e 24AWG 4Pair UTP Blue 1000Ft Box', 25000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('51-241-28', 'Superior Essex', 'Plenum Cat5e 24AWG 4Pair UTP Blue 1000Ft Box', 33000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('51-241-48', 'Superior Essex', 'Plenum Cat5e 24AWG 4Pair UTP White 1000Ft Box', 28000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('51-241-38', 'Superior Essex', 'Plenum Cat5e 24AWG 4Pair UTP Grey 1000Ft Box', 15000);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('MGS400-318', 'Systimax', 'GigaSPEED Cat6 Data Jack Blue', 150);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('MGS400-262', 'Systimax', 'GigaSPEED Cat6 Data Jack White', 120);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('MGS400-112', 'Systimax', 'GigaSPEED Cat6 Data Jack Orange', 105);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('M102SMB-B-262', 'Systimax', 'M102 Type Surface Mount Box Dual Port White', 25);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('M20AP-262', 'Systimax', 'M20 Dust Cover for M-Series Faceplates White', 80);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('M2000-24 1U', 'Systimax', 'M2000 UTP Modular Panel 1U 24Port', -5);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('CPC3312-02F007', 'Systimax', 'Patch Cord Cat6 24AWG 4Pair UTP Light Blue 7Ft', 85);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('CPC3312-02F010', 'Systimax', 'Patch Cord Cat6 24AWG 4Pair UTP Light Blue 10Ft', 55);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('CPC3312-03F010', 'Systimax', 'Patch Cord Cat6 24AWG 4Pair UTP Dark Gray 10Ft', 30);
INSERT INTO parts (part_number, manufacturer, part_description, quantity_available) VALUES ('CPC3312-03F007', 'Systimax', 'Patch Cord Cat6 24AWG 4Pair UTP Dark Gray 7Ft', 22);

--Orders data.  Note that part_id must match 1 parts id (parts.id)
--Otherwise it will fail due to the Foreign Key Constraint
INSERT INTO orders (part_id, quantity_required) VALUES (1, 100000);
INSERT INTO orders (part_id, quantity_required) VALUES (2, 100000);
INSERT INTO orders (part_id, quantity_required) VALUES (8, 325);
INSERT INTO orders (part_id, quantity_required) VALUES (13, 40);
INSERT INTO orders (part_id, quantity_required) VALUES (14, 300);
INSERT INTO orders (part_id, quantity_required) VALUES (15, 200);

--Query to select data for table to display in Forecaster.html
SELECT parts.part_number, parts.manufacturer, parts.part_description, orders.quantity_required, parts.quantity_available FROM parts INNER JOIN orders
ON parts.id = orders.part_id
ORDER BY parts.id ASC;;