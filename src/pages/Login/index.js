import React, { Component } from "react";
import { withStyles, TextField } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import Logo from "../../assets/logo-goku.png";
import { Form, Container } from "./styles";

const styles = theme => ({
  input: {
    background: 'white',
    borderRadius: '10px',
    marginTop: '20px'
  },
  register: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    background: '#fe7f09',
    height: 56,
    border: 0,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
    cursor: 'pointer'
  }
});

class Login extends Component {
  state = {
    user: {
      userName: "",
      password: "",
    },
    error: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
        user: {
            ...user,
            [name]: value
        }
    });
  }

  handleLogin = e => {
    e.preventDefault();
    const { user } = this.state;
    
    if (!user.userName || !user.password) {
      this.setState({ error: "Preencha usuário e senha para continuar!" });
    } else {                        
      this.props.login(user);  
    }
  }

  handleRegister = e => {
    e.preventDefault();
    this.props.history.push("/register");
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
          <img src={Logo} alt="logo-goku" />
          {this.state.error && <p>{this.state.error}</p>}
          <TextField
            className={classes.input}
            id="userName"
            name="userName"
            type="text"
            variant="outlined"
            placeholder="Usuário"
            onChange={e => this.handleChange(e)}
            fullWidth
          />
          <TextField
            className={classes.input}
            id="password"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Senha"
            onChange={e => this.handleChange(e)}
            fullWidth
          />
          <button type="submit">Entrar</button>
          <div className={classes.register} onClick={this.handleRegister}>Cadastrar Usuário</div>
        </Form>
      </Container>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapState, actionCreators)(Login)));