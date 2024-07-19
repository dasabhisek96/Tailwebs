CREATE TABLE users_tailwebs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("teacher", "student", "admin") NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subject (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Subject VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE mark (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Mark VARCHAR(100) NOT NULL,
    subject_id INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users_tailwebs(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select users_tailwebs.name, subject.name, mark.mark from ((mark inner join users_tailwebs on users_tailwebs.id = mark.user_id) inner join subject on subject.id = mark.subject_id);