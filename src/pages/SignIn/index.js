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
  back: {
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

class SignIn extends Component {
  state = {
    error: "",
    user: {
      firstName: '',
      lastName: '',
      userName: '',
      password: ''
    },
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

  handleRegister = e => {
    e.preventDefault();
    const { user } = this.state;
    
    if (!user.firstName || !user.lastName || !user.userName || !user.password) {
      this.setState({ error: "Preencha todos os campos para se cadastrar!" });
    } else {                        
      this.props.register(user);  
    }
  }

  handleGoBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Form onSubmit={this.handleRegister}>
          <img src={Logo} alt="logo-goku"/>
          {this.state.error && <p>{this.state.error}</p>}
          <TextField
            className={classes.input}
            id="firstName"
            name="firstName"
            type="text"
            variant="outlined"
            placeholder="Nome"
            onChange={e => this.handleChange(e)}
            fullWidth
          />
          <TextField
            className={classes.input}
            id="lastName"
            name="lastName"
            type="text"
            variant="outlined"
            placeholder="Sobrenome"
            onChange={e => this.handleChange(e)}
            fullWidth
          />
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
          <button type="submit">Cadastrar</button>
          <div className={classes.back} onClick={this.handleGoBack}>Voltar</div>
        </Form>
      </Container>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapState, actionCreators)(SignIn)));