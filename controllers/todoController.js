let todos = [
  {
    id: 0,
    title: "Learn Node.js",
    desc: "Start learning Node js by 5pm",
    completed: false,
    poi: "high",
  },
  {
    id: 1,
    title: "Build a REST API",
    desc: " Build a rest api with my term",
    completed: false,
    poi: "medium",
  },
  {
    id: 2,
    title: "Dance with anita",
    desc: " Go to dancing clases with anita and joy",
    completed: true,
    poi: "low",
  },
];

exports.getAll = function (req, res) {
  const { completed, poi, all } = req.query;

  const filteredTodos = todos.filter((item) => {
    console.log(typeof all, all);
    if (all == "true") {
      return [];
    } else {
      // console.log(new Boolean(completed));
      return item.completed == new Boolean(completed) || item.poi == poi;
    }
  });

  if (filteredTodos.length > 1) {
    return res.status(200).json(filteredTodos);
  } else {
    res.status(200).json(todos);
  }
};

exports.show = function (req, res) {
  const id = req.params.id;
  //filter data with the id given
  const todo = todos[id];

  //when todos has data
  if (todos) {
    res.status(200).json(todo);
  } else {
    //when todo is undefined
    res.status(404).json({ message: "data not found" });
  }
};

exports.store = function (req, res) {
  const { completed, poi, title, desc } = req.body;
  const data = {
    id: todos.length + 1,
    completed,
    poi,
    title,
    desc,
  };
  //verify data
  if (title && desc && poi) {
    //push to existing todos
    todos.push(data);

    //send res of 200 and form data
    res.status(200);
  } else {
    res
      .status(400)
      .json({ error: "title, description and piority where not defined " });
  }
};

exports.update = (req, res) => {
  //destructure the req.body
  const { completed, poi, title, desc } = req.body;

  //get the specific id from the frontend to update
  const id = parseInt(req.params.id);

  //get the specific todos from the todos array
  const todoIndex = todos.findIndex((t) => t.id === id);

  //validate data
  if (!poi && !title && !desc && !completed) {
    res.status(400).json({ error: " please fill all form fields " });
    returns;
  }

  //verfiy if index exist
  if (todoIndex !== -1) {
    //update the todos
    todos[todoIndex] = {
      id: id,
      title: title,
      completed: completed,
      desc: desc,
      poi: poi,
    };

    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: "this todo does not exist" });
  }
};

exports.delete = function (req, res) {
  //get the specific id from the frontend to update
  const id = parseInt(req.params.id);

  //get the specific todos from the todos array
  const todoIndex = todos.findIndex((t) => t.id === id);

  //check if todo index is valid
  if (todoIndex !== -1) {
    //remove from todos array with splice
    todos.splice(todoIndex, 1);
    res.status(204);
  } else {
    res.status(404).json({ error: "todo index is invalid" });
  }
};
