import { React, Component } from "react";
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import "./ToDoListItems.css";

export default class ToDoList extends Component {
  render() {
    const { items, onDeleted, onToggleImportant, onToggleDone } = this.props;
    const elements = items.map((item) => {
      return (
        <div key={item.id}>
          <li className="list-group-item">
            <ToDoListItem {...item} onDeleted={()=>{
              return onDeleted(item.id)
            }} onToggleImportant={()=>{
              return onToggleImportant(item.id)
            }}
            onToggleDone= {()=>{
              return onToggleDone(item.id)
            }}
            />
          </li>
        </div>
      );
    });

    return <ul className="list-group todo-list-items">{elements}</ul>;
  }
}
