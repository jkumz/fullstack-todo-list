import React, { Component } from "react"

class ListTodosComponent extends Component {
    // pass props onto constructor
    constructor(props) {
        // in react, all consturctors need to call super(props)
        super(props)
        this.state = {
            todos:
                [
                    { id: 1, description: "d1", done: false, targetDate: new Date() },
                    { id: 2, description: "d2", done: false, targetDate: new Date() },
                    { id: 3, description: "d3", done: false, targetDate: new Date() }
                ]
        }
    }

    render() {
        return <div>
            <h1>List todos</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Desc.</th>
                            <th>Done?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                item =>
                                    <tr key={item.id}>
                                        <td>{item.description}</td>
                                        <td>{item.done.toString()}</td>
                                        <td>{item.targetDate.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default ListTodosComponent;