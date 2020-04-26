import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { textLabels } from "../../configs";
import { LinearProgress, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(2),
    backgroundColor: '#000',
    color: '#fff'
  },
  save: {
    backgroundColor: '#00cc66',
    color: '#fff',
    marginRight: 15,
  },
  cancel: {
    backgroundColor: '#cc3300',
    color: '#fff',
    marginRight: 15,
  }
});

const columns = [
  {
    name: "_id",
    label: "ID",
    options: {
      filter: false,
      display: false
    }
  },
  {
    name: "firstName",
    label: "Nome",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "lastName",
    label: "Sobrenome",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "userName",
    label: "Usuário",
    options: {
      filter: true,
      sort: true,
    }
  },
];

class User extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      data: [],
      loading: true,
      open: false,
      options: {
        filterType: 'textField',
        selectableRowsHeader: false,
        onRowClick: rowData => this.onRowClick(rowData),
        onRowsDelete: rowsDeleted => this.onRowsDeleted(rowsDeleted),
        textLabels: textLabels
      },
      rowData: {
        _id: '',
        firstName: '',
        lastName: '',
        userName: '',
        password: ''
      },
      error: ''
    };
  }

  componentDidMount = () => {
    this.props.getUsers();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { users } = this.props;

    if(prevProps.users !== users) {
      this.setState({ data: users.items ? users.items : [] })
    }
  }

  onRowsDeleted = async (rowsDeleted) => {
    try {
      const { data } = this.state;
    
      rowsDeleted.data.forEach(element => {
        this.props.deleteUser(data[element.index]._id);
      });
    } catch (err) {
      console.log(err);
    }
  }

  onRowClick = (rowData) => {
    let formatedRow = {
      _id: rowData[0],
      firstName: rowData[1],
      lastName: rowData[2],
      userName: rowData[3],
      password: '',
    }
    this.setState({ open: true, rowData: formatedRow });
  }

  onFabClick = () => {
    this.setState({ open: true, rowData: {} });
  }

  handleClose = () => {
    this.setState({ open: false, error: '' });
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ rowData: _.set({...this.state.rowData}, event.target.name, event.target.value) });
  }

  addUser = async (rowData) => {
    await this.props.register(rowData, true);

    setTimeout(() => {
      this.props.getUsers();
      this.setState({ open: false });
    }, 500);
  }

  updateUser = async (rowData) => {
    await this.props.updateUser(rowData);

    setTimeout(() => {
      this.props.getUsers();
      this.setState({ open: false });
    }, 500);
  }

  handleClickSave = async () => {
    this.setState({ error: ''});
    
    const { rowData } = this.state;
    
    if (!rowData._id) {
      this.addUser(rowData);
    } else {
      this.updateUser(rowData);
    }
  }

  render() {
    const { data, loading, options, open, rowData, error } = this.state;
    const { classes } = this.props;

    if (data.length <= 0 && loading) {
      return ( 
        <div className="w-full">
          <div className="text-center">
            <LinearProgress color="secondary" />
          </div>
        </div>
      );
    }   
        
    return(
      <div>
        <MUIDataTable
          title={"Usuários"}
          data={data}
          columns={columns}
          options={options}
        />

        <Fab aria-label="add" className={classes.fab} onClick={this.onFabClick}>
          <AddIcon />
        </Fab>

        <div>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Usuários</DialogTitle>
            <DialogContent>
              <DialogContentText color="secondary" align="center">
                {error}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="firstName"
                label="Nome"
                type="text"
                value={rowData.firstName || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="lastName"
                label="Sobrenome"
                type="text"
                value={rowData.lastName || ''}
                variant="outlined"
                onChange={this.handleChange}                               
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="userName"
                label="Usuário"
                type="text"
                value={rowData.userName || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="password"
                label="Senha"
                type="password"
                value={rowData.password || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} className={classes.cancel}>
                  Cancelar
                </Button>
                <Button onClick={this.handleClickSave} className={classes.save}>
                  Salvar
                </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { registering } = state.registration;
  return { user, users, registering };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  register: userActions.register,
  updateUser: userActions.update,
}

export default withStyles(styles)(connect(mapState, actionCreators)(User));