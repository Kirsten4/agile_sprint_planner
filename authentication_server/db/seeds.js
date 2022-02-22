use agile_sprint_planner_user_db;
db.dropDatabase();

db.Users.insertMany([
  {
      username: "Kirsten4",
      password: "$2a$10$0WphU0P5Y4SRB1j3JnGKuOEIGwWTtsM/25uqos6MgMXkUoz6WGxwW"
    }, {
      username: "David2",
      password: "$2a$10$lXg.rjqNOlVrGC8U7IFKYevaYHa8h5BL9XvJXyCyzJMjwPTSl8ira"
    }
])