import React, { Component } from "react";

import "./App.css";
import ToDoList from "../ToDoListItems";
import SearchPanel from "../SearchPanel";
import AppHeader from "../AppHeader";
import ItemAddForm from "../ItemAddForm";

export default class App extends Component {
  state = {
    toDoData: [],
    status: "all",
    searchItem: "",
  };

  componentDidMount() {
    const toDoData = this.getAllItems();
    if (toDoData) {
      console.log(toDoData);
      const parsedToDoData = JSON.parse(toDoData);
      this.setState({
        toDoData: parsedToDoData,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.toDoData !== prevState.toDoData) {
      this.updateLocalStorage();
    }
  }

  getAllItems = () => {
    return localStorage.getItem("todos");
  };

  updateLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.toDoData));
  };

  generateId = (toDoArr) => {
    let id = null;
    if (toDoArr.length === 0) {
      id = 1;
    } else {
      id = toDoArr.at(-1).id + 1;
    }
    return id;
  };

  findElementById = (id) => {
    const { toDoData } = this.state;
    return toDoData.findIndex((element) => element.id === id);
  };

  addItem = (text) => {
    const newItem = this.createToDoItem(text);
    this.setState(({ toDoData }) => {
      toDoData = [...toDoData, newItem];
      return {
        toDoData,
      };
    });
  };

  toggleProperty = (array, id, property) => {
    const toggledElement = this.findElementById(id);
    const oldItem = array[toggledElement];
    const newItem = {
      ...oldItem,
      [property]: !oldItem[property],
    };

    return {
      toDoData: [
        ...array.slice(0, toggledElement),
        newItem,
        ...array.slice(toggledElement + 1),
      ],
    };
  };

  onToggleDone = (id) => {
    this.setState(({ toDoData }) => {
      return this.toggleProperty(toDoData, id, "done");
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      return this.toggleProperty(toDoData, id, "important");
    });
  };

  onSearchItem = ({ target }) => {
    this.setState({
      searchItem: target.value,
    });
  };

  onClickFilter = (name) => {
    this.setState({
      status: name,
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const elementId = toDoData.findIndex((element) => element.id === id);
      toDoData = [
        ...toDoData.slice(0, elementId),
        ...toDoData.slice(elementId + 1),
      ];
      return {
        toDoData,
      };
    });
  };

  createToDoItem = (label) => {
    return {
      label: label,
      important: false,
      done: false,
      id: this.generateId(this.state.toDoData),
    };
  };

  getToDoCount = (toDoData) => {
    return toDoData.filter((element) => element.done === false).length;
  };

  render() {
    const { toDoData, status, searchItem } = this.state;
    let filteredArr = [];
    // eslint-disable-next-line default-case
    switch (status) {
      case "all":
        filteredArr = toDoData;
        break;
      case "done":
        filteredArr = toDoData.filter((element) => element.done);
        break;
      case "todo":
        filteredArr = toDoData.filter((element) => !element.done);
        break;
    }

    let searchedArr = [];
    if (!searchItem) {
      searchedArr = filteredArr;
    } else {
      searchedArr = filteredArr.filter((element) => {
        return element.label.toLowerCase().includes(searchItem.toLowerCase());
      });
    }

    return (
      <div className="container">
        <AppHeader
          toDo={this.getToDoCount(toDoData)}
          done={toDoData.length - this.getToDoCount(toDoData)}
        />
        <SearchPanel
          onSearchItem={this.onSearchItem}
          onClickFilter={this.onClickFilter}
          filterValue={status}
        />
        <ToDoList
          items={searchedArr}
          onDeleted={this.onDeleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}
