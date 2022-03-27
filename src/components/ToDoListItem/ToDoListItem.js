import { React, Component } from "react";
import "./ToDoListItem.css";

export default class ToDoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;
    let classNames = done ? "todo-list-item done" : "todo-list-item";

    if (important) {
      classNames += " important";
    }

    return (
      <div className="item-content">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckChecked"
          defaultChecked={done}
          onClick={onToggleDone}
        />
        <span className={classNames}>{label}</span>
        <div className="btn-container">
          <button type="button" className="btn btn-danger" onClick={onDeleted}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={onToggleImportant}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}
