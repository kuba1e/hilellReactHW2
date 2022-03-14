import { React, Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    searchItem: "",
  };

  buttons = [
    { name: "all", label: "All" },
    { name: "todo", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {
    const { onSearchItem, onClickFilter, filterValue } = this.props;
    const searchText = "Type here to search";
    const classNames = "btn btn-outline-primary";
    const buttons = this.buttons.map(({ name, label }) => {
      return (
        <button
          key={name}
          className={filterValue === name ? classNames + " active" : classNames}
          data-name={name}
        >
          {label}
        </button>
      );
    });

    return (
      <div
        className="search-panel"
        onClick={({ target }) => {
          switch (target.dataset.name) {
            case "all":
              onClickFilter(target.dataset.name);
              break;
            case "todo":
              onClickFilter(target.dataset.name);
              break;
            case "done":
              onClickFilter(target.dataset.name);
              break;
          }
        }}
      >
        <input
          className="text-inputs"
          type="text"
          placeholder={searchText}
          onInput={(event) => {
            this.setState({
              searchItem: event.target.value,
            });
            onSearchItem(event);
          }}
          value={this.state.searchItem}
        ></input>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          {buttons}
        </div>
      </div>
    );
  }
}
