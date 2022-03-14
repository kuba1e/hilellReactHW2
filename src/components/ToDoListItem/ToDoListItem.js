import { React, Component } from "react";
import "./ToDoListItem.css";

export default class ToDoListItem extends Component {

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, done, important} = this.props;
    let classNames = done?'todo-list-item done':'todo-list-item'

    if(important){
      classNames+=' important'
    }

    return (
      <div className="item-content">
      <span
        className={classNames}
        onClick={onToggleDone}
      >
        {label}
      </span>
      <div className="btn-container">
      <button type="button" className="btn btn-danger" onClick={onDeleted}>
        Delete
      </button>
      <button type="button" className="btn btn-success" onClick={onToggleImportant}>
        Exclamation
      </button>
    </div>
    </div>
    );
  }
}
