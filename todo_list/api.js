let users = [];

export const signIn = async (identifier, password) => {
  try {
    const user = users.find(
      (user) =>
        user.identifier === identifier && user.password === password
    );

    if (user) {
      return { success: true, data: user.tasks };
    } else {
      return { success: false, message: 'Invalid identifier or password' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred' };
  }
};

export const signUp = async (name, email, identifier, password) => {
  try {
    const existingUser = users.find(
      (user) => user.identifier === identifier
    );
    if (existingUser) {
      return { success: false, message: 'Identifier is already taken' };
    }

    const newUser = {
      name,
      email,
      identifier,
      password,
      tasks: [],
    };

    users.push(newUser);

    return { success: true, data: newUser.tasks };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred' };
  }
};

export const addTask = async (identifier, task) => {
  try {
    const user = users.find((user) => user.identifier === identifier);

    if (user) {
      const newTask = {
        id: Date.now().toString(),
        title: task.title,
        description: task.description,
        completed: false,
      };

      user.tasks.push(newTask);

      return { success: true, data: user.tasks };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred' };
  }
};

export const deleteTask = async (identifier, taskId) => {
  try {
    const user = users.find((user) => user.identifier === identifier);

    if (user) {
      user.tasks = user.tasks.filter((task) => task.id !== taskId);

      return { success: true, data: user.tasks };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred' };
  }
};
