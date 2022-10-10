-- create milkshakes table
CREATE TABLE milkshakes (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    flavor VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    long_description TEXT NOT NULL,
    img_url TEXT NOT NULL,
)

-- create milkshake_reviews table
CREATE TABLE milkshake_reviews (
	review_id BIGSERIAL NOT NULL PRIMARY KEY,
	mmkshake_id BIGINT NOT NULL REFERENCES milkshakes(id) ON DELETE CASCADE,
	reviewer_name VARCHAR(50) NOT NULL,
	reviewer_comment TEXT NOT NULL,
	reviewer_rating INT NOT NULL CHECK(reviewer_rating >=1 AND reviewer_rating <= 5)
)