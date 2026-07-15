-- ============================================
-- organization table 
-- ============================================

CREATE TABLE organization (
     organization_id SERIAL PRIMARY KEY,
	 name VARCHAR(150) NOT NULL,
	 description TEXT NOT NULL,
	 contact_email VARCHAR(255) NOT NULL,
	 logo_filename VARCHAR(255) NOT NULL
	 

);

SELECT * FROM organization 


-- ============================================
-- STEP 3 Insert Sample Data
-- ============================================
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ============================================
-- 3. project table 
-- ============================================

DROP TABLE IF EXISTS project_category CASCADE;
DROP TABLE IF EXISTS project CASCADE;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO project (title, description) VALUES
('Park Cleanup', 'Join us to clean up local parks and make them beautiful!'),
('Food Drive', 'Help collect and distribute food to those in need.'),
('Community Tutoring', 'Volunteer to tutor students in various subjects.');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), 
(2, 2), 
(2, 3), 
(3, 2);

SELECT * FROM project;








-- ============================================
-- 3. category table 
-- ============================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');