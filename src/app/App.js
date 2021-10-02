import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      tasks: [],
      _id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Registro actualizado" });
          this.setState({ firstName: "", lastName: "", address: "", _id: "" });
          this.fetchTasks();
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Registro guardado" });
          this.setState({ firstName: "", lastName: "", address: "" });
          this.fetchTasks();
        })
        .catch((err) => console.log(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if (confirm("¿Esta seguro de eliminar el registro?")) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Registro eliminado" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch("/api/tasks/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <nav className="cyan darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN-Stack
            </a>
          </div>
        </nav>

        <div className="container" style={{ marginTop: "50px" }}>
          <div className="col">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field cols12">
                        <input
                          name="firstName"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Nombres"
                          value={this.state.firstName}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field cols12">
                        <input
                          name="lastName"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Apellidos"
                          value={this.state.lastName}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field cols12">
                        <textarea
                          name="address"
                          onChange={this.handleChange}
                          placeholder="Direccion"
                          className="materialize-textarea"
                          value={this.state.address}
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn waves-effect waves-orange">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table class="striped" style={{ marginTop: "50px" }}>
                <thead>
                  <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Direccion</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.firstName}</td>
                        <td>{task.lastName}</td>
                        <td>{task.address}</td>
                        <td>
                          <button
                            class="btn blue darken-3 waves-effect waves-light"
                            onClick={() => this.editTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            class="btn red darken-3 waves-effect waves-red"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
