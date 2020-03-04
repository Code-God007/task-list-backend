const task = require("../Modals/task");

exports.addTask = (obj, callback) => {
  user.updateOne(
    {
      _id: obj.user_id
    },
    {
      $push: {
        usertasks: obj.new_task_id
      }
    },
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }
  );
};

exports.removeTask = (obj, callback) => {
  user.updateOne(
    {
      _id: obj.user_id
    },
    {
      $pull: {
        usertasks: {
          $in: [obj.task_id]
        }
      }
    },
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }
  );
};

exports.getTasks = (obj, callback) => {
  user
    .findOne(
      {
        _id: obj.user_id
      },
      {
        usertasks: {
          $slice: [Number(obj.skip_count), 10]
        }
      }
    )
    .populate(obj.query)
    .exec((error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
};

exports.createNewTask = (obj, callback) => {
  task.create(obj, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

exports.editTask = (obj, callback) => {
  task.updateOne(
    {
      _id: obj.task_id
    },
    {
      $set: {
        title: obj.task_title_new,
        description: obj.task_description_new
      }
    },
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }
  );
};
