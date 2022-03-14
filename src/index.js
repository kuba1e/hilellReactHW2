import { React, Component } from "react";
import ReactDOM from "react-dom";

import ToDoList from "./components/ToDoListItems/ToDoListItems";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import AppHeader from "./components/AppHeader/AppHeader";
import ItemAddForm from "./components/ItemAddForm";

export default class App extends Component {
  startId = 1;
  constructor() {
    super();
    this.state = {
      toDoData: [
        this.createToDoItem("Drink Cofee"),
        this.createToDoItem("Make awesome app"),
        this.createToDoItem("Make a lunch"),
      ],
      status: "all",
      searchItem:''
    };
  }
  deleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const elementId = toDoData.findIndex((element) => element.id === id);
      toDoData = [
        ...toDoData.slice(0, elementId),
        ...toDoData.slice(elementId + 1),
      ];

      return {
        toDoData: toDoData,
      };
    });
  };

  getInputValue = (value) => {
    return value;
  };

  generateId = (toDoArr) => {
    let id = null;
    if (toDoArr.length === 0) {
      id = 0;
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
      const newArray = [...toDoData, newItem];
      return {
        toDoData: newArray,
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

  toggleDone = (id) => {
    this.setState(({ toDoData }) => {
      return this.toggleProperty(toDoData, id, "done");
    });
  };

  toggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      return this.toggleProperty(toDoData, id, "important");
    });
  };

  onSearchItem = ({ target }) => {
    this.setState({
      searchItem: target.value
    })
  };

  onClickFilter = (name) => {
    this.setState({
      status: name
    })
  };

  createToDoItem = (label) => {
    return {
      label: label,
      important: false,
      done: false,
      id: ++this.startId,
    };
  };

  getToDoCount = (toDoData) => {
    return toDoData.filter((element) => element.done === false).length;
  };

  render() {
    const { toDoData, status, searchItem } = this.state;
    let filteredArr = [];
    switch (status) {
      case "all":
        filteredArr = toDoData;
        break;
      case "done":
        filteredArr = toDoData.filter(element=>element.done);
        break;
      case "todo":
        filteredArr = toDoData.filter(element=>!element.done);
        break;
    }

    let searchedArr = []
    if(!searchItem){
      searchedArr = filteredArr
    } else {
      searchedArr = filteredArr.filter((element)=>{
        return element.label.toLowerCase().includes(searchItem.toLowerCase())
      })
      console.log(searchedArr)
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
          filterValue = {status}
        />
        <ToDoList
          items={searchedArr}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone}
        />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
