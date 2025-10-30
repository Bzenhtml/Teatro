CREATE TABLE Entradas_graderia (
    id SERIAL PRIMARY KEY,               
    rut_del_cliente VARCHAR(10),
	Nombre_de_la_funcion varchar(300),
    numero_asiento INT NOT NULL,         
    valor int NOT NULL,        
    descuento int DEFAULT 0,  
    hora_funcion varchar(5),          
    fecha_funcion DATE NOT NULL,         
    correo VARCHAR(100) NOT NULL,        
    numero_contacto VARCHAR(20)          
);
CREATE TABLE Entradas_palco (
    id SERIAL PRIMARY KEY,               
    rut_del_cliente VARCHAR(10),
	Nombre_de_la_funcion varchar(300),
    numero_asiento INT NOT NULL,         
    valor int NOT NULL,        
    descuento int DEFAULT 0,  
    hora_funcion varchar(5),          
    fecha_funcion DATE NOT NULL,         
    correo VARCHAR(100) NOT NULL,        
    numero_contacto VARCHAR(20)          
);
CREATE TABLE Entradas_platea (
    id SERIAL PRIMARY KEY,               
    rut_del_cliente VARCHAR(10),
	Nombre_de_la_funcion varchar(300),
    numero_asiento INT NOT NULL,         
    valor int NOT NULL,        
    descuento int DEFAULT 0,  
    hora_funcion varchar(5),          
    fecha_funcion DATE NOT NULL,         
    correo VARCHAR(100) NOT NULL,        
    numero_contacto VARCHAR(20)          
);
select*from Entradas_platea