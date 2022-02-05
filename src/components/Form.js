import React from 'react';

export default class Form extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      name="username"
                      placeholder="username"
                      value={this.props.username}
                      onChange={(event) => this.props.change(event)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      name="password"
                      placeholder="password"
                      value={this.props.password}
                      onChange={(event) => this.props.change(event)}
                    />
                    <button
                      className="Mobilebtn btn--danger--solid btn--medium"
                      style={{
                          margin: "8px",
                          marginLeft: "0"
                      }}
                      onClick={(event) => {
                          this.props.onSumbit(event)
                      }}
                    >
                        Submit
                    </button>
                </form>
                {this.props.error && (
                    <div class="alert alert-danger" role="alert">
                        {this.props.error}
                    </div>
                )}
                <div>{this.props.text}</div>
            </div>
        )
    }
}