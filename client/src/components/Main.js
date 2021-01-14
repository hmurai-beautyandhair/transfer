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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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
  input: {
    width: 42,
  }
}));


  



export default function  Main() {
    const classes = useStyles();
   const [data, setData] = useState([]);
   const [skus, setSkus] = useState([]);
   const [value, setValue] = useState([]);
   const [items, setItems] = useState([]);
   const [flash, setFlash] = useState(null);
   const [error2, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const result = await actions.data();
          const result2 = await actions.products();
          console.log('Products', result2.data)
          setData(result.data);
          setSkus(result2.data)
        };
        fetchData();
      }, []);
    const [state, setState] = React.useState({
        from: '',
        to: '',
      });
      const filterOptions = createFilterOptions({
        limit: 10
      });
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const handleChange2 = (id, e) => {
        e.persist();
          let arr3 = [...items];
          let index = 0;
        let found = arr3?.filter(y => y.product == id)[0]
        arr3?.filter((y, i) => {
            if(y.product == id) index = i
        })
    
        console.log(index)
        // console.log("found", found)
        let maxim = 10
       
        
        if(e.target.value > maxim){
            found.quantity = maxim
        }
        else if(e.target.value === ''){
            found.quantity = Number(0)
        }
        else{
            found.quantity = e.target.value;
        }
        console.log('Found', found)
 arr3.splice(index, 1, found)

console.log("Arr3", arr3)
setTimeout( () => {setItems(arr3)}
  , 4000);

        console.log(e.target.value)

      };

      const deleteItem = (id) => {
        let arr3 = [...items];
        let index = 0;
      let found = arr3?.filter(y => y.product == id)[0]
      arr3?.filter((y, i) => {
          if(y.product == id) index = i
      })
  
      console.log(index)
      console.log('Found', found)
arr3.splice(index, 1)
console.log("Arr3", arr3)
setItems(arr3)

    };

     
    


      const Rows = ()=>{
      
            return items.map((x, i) => (
                <TableRow key={x}>
                  <TableCell  align="center" component="th" scope="row">
                    {x.product}
                  </TableCell>
                  <TableCell   style={{ margin: 4, fontWeight: 600, fontSize: '1.4em' }} align="center">
                      
                      
                      {console.log(typeof x.quantity)}
                     
                      <TextField
         id="standard-full-width"
         margin="normal"
          label="quantity"
        //   type="number"
          align="center"
          style={{ margin: 4, fontWeight: 600, fontSize: '1.4em' }}
          onChange={(e)=>handleChange2(x.product, e)}
          defaultValue={x.quantity}
        
         
        />
    
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                      <Button  variant="outlined" size="small" onClick={()=>deleteItem(x.product)}>Delete</Button>
                </TableCell>
                </TableRow>
                
              ))
    }
    
 



      const handleSubmit =(e) =>{
        e.preventDefault();
          if(!(state.from) || !(state.to) || (items.length <= 0)){
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
       products: items
      }
      console.log('This Transfer', transfer)
      setState({
        from: '',
        to: ''
      })
      setValue([]) 
      setItems([]) 
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
    options: skus.map((option) => option),
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
          
       {...flatProps}
        value={value}
        onChange={(event, newValue) => {
            console.log('Event', event.target.value)
            let arr = [...items]
            if(newValue) {
            if(arr.filter(e => e.product === newValue).length <= 0) arr.push({product: newValue, quantity: 0})
            }
          setValue(newValue);
          console.log('arrrrr', arr)
          setItems(arr)
        }}
        renderInput={(params) => <TextField {...params} label="Search for product"  />}
        filterOptions={filterOptions}
      />
<Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="success">Transfer successfully completed!</Alert>
        </Fade>
        <Fade in={error2} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Please fill in all required fields!</Alert>
        </Fade>
              </Typography>
              <Typography    style={{color: 'rgb(0 0 0 / 67%)'}} variant="h5" component="h5">
        Selected Products
        </Typography>
              <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Rows/>
        </TableBody>
      </Table>
    </TableContainer>
            </CardContent>

    

          </CardContent>
          <CardActions className={classes.button}>
          <Button onClick={handleSubmit}  variant="outlined"  endIcon={<Icon>send</Icon>}>
Transfer
</Button >


          </CardActions>
        </Card>
      );

}

