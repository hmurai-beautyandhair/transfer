import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Icon from '@material-ui/core/Icon';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import actions from "../services/service";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    padding: '2em',
    // padding: 'auto',
    margin: 'auto',
    
  },
  form: {
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center'
  },
  auto: {
    padding: 'auto',
    margin: 'auto',
    maxWidth: 620,
  },
  media: {
    height: 140,
  },
  box: {

    width: 250
  },
  formControl: {
    margin: theme.spacing(5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title:{
      textAlign: 'center',
     paddingBottom: '0.3em',
      fontSize: '2.5em',
      fontWeight: '700',
      color: 'rgb(0 0 0 / 67%);'
  },
  button:{
    float: 'right',
    color: 'rgb(0 0 0 / 67%);'
  },
  alert: {
    left: '0',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: '1500',
  },
}));

function createData(name, quantity) {
    return { name, quantity };
  }
  



export default function  Main() {
    const classes = useStyles();
   const [data, setData] = useState([]);
   const [value, setValue] = useState([]);
   const [items, setItems] = useState([]);
   const [flash, setFlash] = useState(null);
   const [error2, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const result = await actions.data();
          console.log('Warehouses', result.data)
          setData(result.data);
          
        };
        fetchData();
      }, []);
    const [state, setState] = React.useState({
        from: '',
        to: '',
      });
    
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const rows6 = [

        createData('Frozen yoghurt', 159, 6 ),
        createData('Ice cream sandwich', 237)
      ]
      const Rows = ()=>{
        return items.map(x =>{
        return <div>{x.product}, {x.quantity}</div>
        })
    }
    
      const handleSubmit =(e) =>{
        e.preventDefault();
          if(!(state.from) || !(state.to) || (value.length <= 0)){
            setError(true);

            setTimeout(() => {
              setError(null);
            }, 5000);
          
            //   alert('Please, fill in all required fields')
              return 
          }
       
      let transfer = {
       from: state.from,
       to: state.to,
       products: value
      }
      console.log('This Transfer', transfer)
      setState({
        from: '',
        to: ''
      })
      setValue([]) 
      setFlash(true);

      setTimeout(() => {
        setFlash(null);
      }, 5000);
      }

     


const Data = ()=>{
    return data.map(x =>{
    return  <option key={x.id} value={x.id}>{x.identifier}</option>
    })
}
const flatProps = {
    options: data.map((option) => option.identifier),
  };

    return (
        <Card className={classes.root}>
          <CardContent>
            <CardMedia
              className={classes.media}
              image="https://qbtgd46ws2c3m4sms3ttzgel-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/shiphero-full.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
               Warehouse Transfer
              </Typography>
              <Typography variant="body2"  component="p" className={classes.form}>
              <FormControl required className={classes.formControl}>
        <InputLabel > From Warehouse</InputLabel>
        <Select
          native
          className={classes.box}
          value={state.from}
          onChange={handleChange}
          name="from"
          inputProps={{
            id: 'age-native-required',
          }}
        >
          <option aria-label="None" value="" />
          <Data/>
          
        </Select>
        <FormHelperText>Required</FormHelperText>
        {/* FROM {state.from} */}
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel > To Warehouse</InputLabel>
        <Select
          native
          className={classes.box}
          value={state.to}
          onChange={handleChange}
          name="to"
          inputProps={{
            id: 'age-native-required',
          }}
        >
          <option aria-label="None" value="" />
          <Data/>
          
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
              </Typography>
              <Typography variant="body2"  component="p" className={classes.auto}>
              <Autocomplete
            multiple
       {...flatProps}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          let arr = [...items]
          let arr2  = []
      
        console.log('Value', newValue)
          if(value.length > 0){
            console.log('here')
            newValue.forEach(x =>{
              if(arr.length > 0) {
          if(arr.filter(e => e.product === x).length <= 0){
              arr2.push({product: x, quantity: 1})
          }
          else{
            arr2.push(arr.filter(e => e.product === x)[0])
          }
          }
          else{
            arr2.push({product: x, quantity: 1})
          }
          })
        }
        setItems(arr2)
        }}
        renderInput={(params) => <TextField {...params} label="Search for product"  />}
      />
<Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="success">Transfer successfully completed!</Alert>
        </Fade>
        <Fade in={error2} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Please fill in all required fields!</Alert>
        </Fade>
              </Typography>
            </CardContent>

    {/* <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    <Rows/>

          </CardContent>
          <CardActions className={classes.button}>
          <Button onClick={handleSubmit}  variant="outlined"  endIcon={<Icon>send</Icon>}>
Transfer
</Button >
          </CardActions>
    
    {console.log('Items', items)}
        </Card>
      );

}