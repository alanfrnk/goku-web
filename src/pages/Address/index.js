import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { textLabels } from "../../configs";
import { LinearProgress, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { connect } from 'react-redux';

import { addressActions } from '../../actions';

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
    name: "zipCode",
    label: "Cep",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "street",
    label: "Rua",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "number",
    label: "Número",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "complement",
    label: "Complemento",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "district",
    label: "Bairro",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "city",
    label: "Cidade",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "state",
    label: "Estado",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "country",
    label: "País",
    options: {
      filter: true,
      sort: true,
    }
  },
];

class Address extends Component {
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
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        country: '',
      },
      error: ''
    };
  }

  componentDidMount = () => {
    this.props.getAdresses();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { adresses } = this.props;

    if(prevProps.adresses !== adresses) {
      this.setState({ 
        data: adresses.items ? adresses.items : [],
        loading: false 
      })
    }
  }

  onRowsDeleted = async (rowsDeleted) => {
    try {
      const { data } = this.state;
    
      rowsDeleted.data.forEach(element => {
        this.props.deleteAddress(data[element.index]._id);
      });
    } catch (err) {
      console.log(err);
    }
  }

  onRowClick = (rowData) => {
    let formatedRow = {
      _id: rowData[0],
      zipCode: rowData[1],
      street: rowData[2],
      number: rowData[3],
      complement: rowData[4],
      district: rowData[5],
      city: rowData[6],
      state: rowData[7],
      country: rowData[8],
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

  addAddress = async (rowData) => {
    await this.props.register(rowData, true);

    setTimeout(() => {
      this.props.getAdresses();
      this.setState({ open: false });
    }, 500);
  }

  updateAddress = async (rowData) => {
    await this.props.updateAddress(rowData);

    setTimeout(() => {
      this.props.getAdresses();
      this.setState({ open: false });
    }, 500);
  }

  handleClickSave = async () => {
    this.setState({ error: ''});
    
    const { rowData } = this.state;
    
    if (!rowData._id) {
      this.addAddress(rowData);
    } else {
      this.updateAddress(rowData);
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
          title={"Endereços"}
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
            <DialogTitle id="form-dialog-title">Endereços</DialogTitle>
            <DialogContent>
              <DialogContentText color="secondary" align="center">
                {error}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="zipCode"
                label="Cep"
                type="text"
                value={rowData.zipCode || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="street"
                label="Rua"
                type="text"
                value={rowData.street || ''}
                variant="outlined"
                onChange={this.handleChange}                               
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="number"
                label="Número"
                type="text"
                value={rowData.number || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="complement"
                label="Complemento"
                type="text"
                value={rowData.complement || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="district"
                label="Bairro"
                type="text"
                value={rowData.district || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="city"
                label="Cidade"
                type="text"
                value={rowData.city || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="state"
                label="Estado"
                type="text"
                value={rowData.state || ''}
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField                                
                margin="dense"
                name="country"
                label="País"
                type="text"
                value={rowData.country || ''}
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
  const { adresses } = state;
  const { registering } = state.registration;
  return { adresses, registering };
}

const actionCreators = {
  getAdresses: addressActions.getAll,
  deleteAddress: addressActions.delete,
  register: addressActions.register,
  updateAddress: addressActions.update,
}

export default withStyles(styles)(connect(mapState, actionCreators)(Address));