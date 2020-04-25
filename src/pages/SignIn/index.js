import React, { Component } from "react";
import { withStyles, TextField } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import Logo from "../../assets/logo-goku.png";
import { Form, Container } from "./styles";

const styles = theme => ({
    input: {
        background: 'white',
        borderRadius: '10px',
        marginTop: '20px'
    }
});

class SigIn extends Component {
    state = {
        userName: "",
        password: "",
        error: ""
    };

    handleSigIn = e => {
        e.preventDefault();
        const { userName, password } = this.state;
        
        if (!userName || !password) {
            this.setState({ error: "Preencha usuário e senha para se cadastrar!" });
        } else {                        
                   
        }
    };

    handleGoBack = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Form onSubmit={this.handleSigIn}>
                    <img src={Logo} alt="logo-goku" />
                    {this.state.error && <p>{this.state.error}</p>}
                    <TextField
                        className={classes.input}
                        id="userName"
                        type="text"
                        variant="outlined"
                        placeholder="Usuário"
                        onChange={e => this.setState({ userName: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        className={classes.input}
                        id="senha"
                        type="password"
                        variant="outlined"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                        fullWidth
                    />
                    <button type="submit">Cadastrar</button>
                    <back onClick={this.handleGoBack}>Voltar</back>
                </Form>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(SigIn));