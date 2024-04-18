#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let conditions = true;

console.log(
  chalk.blueBright.bold("\n\t <============Welcome To My ToDo-List =============>\n")
);



let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green.bold("Select an option:"),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);

    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await DeleteTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    }
      else if (option.choice === "Update Task") {
      await updateTask();
    }
    else if (option.choice === "Exit") {
      conditions = false;
    }
  }
}
// ! function to add new task to todo-list

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green.bold("Enter Your New Task"),
    },
  ]);

  todoList.push(newTask.task);
  console.log(
    chalk.yellowBright.bold(`\n ${newTask.task} Task added successfully`)
  );
};
// !function to view all todo-List tasks
let viewTask = async () => {
  console.log(chalk.yellowBright("\n your ToDo-List: \n", todoList));
  todoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
  console.log("\n");
}

// ! function to delete a task from todo-list
let DeleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green.bold("Enter the index of the task to delete:"),
    },
  ]);
  let deletedTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(`\nDeleted task: ${deletedTask} This task has been deleted`);
}

// ! function to update a task in todo-list
let updateTask = async () => {
  await viewTask();
  let updateTaskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green.bold("Enter the index of the task to update: "),
    },
    {
      name: "newTask",
      type: "input",
      message: chalk.green.bold("Enter the new task: "),
    },
  ]);

  todoList[updateTaskIndex.index] = updateTaskIndex.newTask;
  console.log(`\n Task at index ${updateTaskIndex.index} has been updated successfully`); 
}
main();
