import { React, Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    searchItem: "",
  };

  buttons = [
    { id: 1, name: "all", label: "All" },
    { id: 2, name: "todo", label: "Active" },
    { id: 3, name: "done", label: "Done" },
  ];

  render() {
    const { onSearchItem, onClickFilter, filterValue } = this.props;
    const searchText = "Type here to search";
    const classNames = "btn btn-outline-primary";
    const buttons = this.buttons.map(({ id, name, label }) => {
      return (
        <button
          key={id}
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
          // eslint-disable-next-line default-case
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
        <div className="btn-group">{buttons}</div>
      </div>
    );
  }
}
