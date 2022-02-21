import seeder from "mongoose-seed";

const db = "mongodb://localhost:27017/agile_sprint_planner_user_db";

seeder.connect(db, function () {
  seeder.loadModels([
    "./models"
  ]);
  seeder.clearModels()
})

const data = [{
  username: "Kirsten",
  password: 123
}, {
  username: "David",
  password: 456
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    const usersCount =  await User.count().exec();

    return usersCount === 0;
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;