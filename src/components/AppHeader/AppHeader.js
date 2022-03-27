import { React, Component } from "react";
import "./AppHeader.css";

export default class AppHeader extends Component {
  render() {
    const { toDo, done } = this.props;
    return (
      <div className="app-header">
        <h1>My to do list</h1>
        <div>
          <p>
            <span>{toDo}</span> more to do, <span>{done}</span> done
          </p>
        </div>
      </div>
    );
  }
}
