import React, { useState, useEffect} from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import Input from '@material-ui/core/Input';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';



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
   const [returns, setReturns] = useState([]);
   const [flash, setFlash] = useState(null);
   const [error2, setError] = useState(null);
   const [error3, setError3] = useState(null);
   const [error4, setError4] = useState(null);
   const [transf, setTransf] = useState(null);
   const [zero_q, setZero_q] = useState(null);
   const [max_q, setMax_q] = useState(null);
   
   const [barcode, setBarcode] = useState('');
   

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

      const handleChange5 = (event) => {
         
      console.log(event.target.value)
      let newValue = event.target.value
      let arr = [...items]

      if(newValue) {
      
        let r1 = new RegExp(`.+,${newValue},.+`,"g");
        if(skus.filter(x => x.match(r1)).length > 0){
          let prod = skus.filter(x => x.match(r1))[0]
            let sku = (skus.filter(x => x.match(r1))[0]).split(',')[0]
            console.log('SKU greater 0', sku)
            if(arr.filter(e => e.product === prod).length <= 0) {
            if(sku) {
                
                    actions.maxValue(sku).then(x =>{
                        let objs = x.data
                        let val = []
                       val = objs.filter(r1 => r1.warehouse_id == state.from)
                        if(val.length > 0){
                          
                            if(skus.filter(x => x.match(r1)).length > 0){
                                console.log("match")
                                if(Number(val[0].on_hand) > 0 ) {
                                arr.push({product: prod, quantity: 1, max: val[0].on_hand})
                                setItems(arr)
                                setTimeout( () => {
                                    if(event.target.value >= 6){
                                        event.target.value = ''
                                      }
                                
                                }
                                , 1000);
                            
                                return;
                            }
                            else{
                                setZero_q(true);

                                setTimeout(() => {
                                    setZero_q(null);
                                }, 2000);
                                setTimeout( () => {
                                    if(event.target.value >= 6){
                                        event.target.value = ''
                                      }
                                
                                }
                                , 1000);
                                return
                            }
                            }
                            else{
                                console.log('No match')
                            arr.push({product: prod, quantity: 0, max: val[0].on_hand})
                            setItems(arr)
                            setBarcode('')
                            setTimeout( () => {
                                if(event.target.value >= 6){
                                    event.target.value = ''
                                  }
                            
                            }
                            , 1000);
                                return;
                            }
                        }
                    }).catch(err=>err)
            }
            }
            else{
                let index = 0;
               let same_sku = arr.filter((e, i) => {
                   if( e.product === prod) {
                       index = i;
                       return e
                   }}
                   )[0] 
                   if(same_sku.max == same_sku.quantity){
                    setMax_q(true);

                    setTimeout(() => {
                        setMax_q(null);
                    }, 3000);
                    setBarcode('')
                    setTimeout( () => {
                        if(event.target.value >= 6){
                            event.target.value = ''
                          }
                    
                    }
                    , 1000);
                    return
                   }
         same_sku.quantity =  Number(same_sku.quantity) + 1
         arr.splice(index, 1, same_sku)
         setItems(arr)
         setBarcode('')
         setTimeout( () => {
             if(event.target.value >= 6){
                 event.target.value = ''
               }
         
         }
         , 1000);
            }
            }
            // else{
            //     console.log('WRONG BARCODE')
                
            // }
        
      


        }
        else{
            event.target.value =''
            console.log('No BARCODE')
            return;
           
        }






      }



      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
        setItems([])
      };

      const handleChange2 = (id, max,  e) => {
        e.persist();
          let arr3 = [...items];
          let index = 0;
        let found = arr3?.filter(y => y.product == id)[0]
        arr3?.forEach((y, i) => {
            if(y.product == id) index = i
        })
    
        console.log(index)
        // console.log("found", found)
       
    if(max){
        max = Number(max)
        if(e.target.value > max){
            found.quantity = max
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
  , 2000);
    }
       

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

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: 'rgb(241 240 240);',
          color: theme.palette.common.black ,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
    


      const Rows = ()=>{
      if(items.length > 0) {
            return items.map((x, i) => (
                <TableRow key={x.product}>
                  <TableCell  align="center" component="th" scope="row">
                    {x.product}
                  </TableCell>
                  <TableCell  align="center" component="th" scope="row"><FormControl disabled>
        <InputLabel htmlFor="component-disabled">Max</InputLabel>
        <Input id="component-disabled" value={x.max} />
       
      </FormControl></TableCell>
                  <TableCell   style={{ margin: 4, fontWeight: 600, fontSize: '1.4em' }} align="center">
                      
                      
                      {console.log(typeof x.quantity)}
                     
                      <TextField
         id="standard-full-width"
         margin="normal"
          label="Quantity"
        //   type="number"
          align="center"
          style={{ margin: 4, fontWeight: 600, fontSize: '1.4em' }}
          onChange={(e)=>handleChange2(x.product, x.max,  e)}
          defaultValue={x.quantity}
        
         
        />
    
                      </TableCell>


                      <TableCell align="center" component="th" scope="row">
                      <Button  variant="outlined" size="small" onClick={()=>deleteItem(x.product)}>Delete</Button>
                </TableCell>
                </TableRow>
                
              ))
            }
            else{
                return ''
            }
    }
    function refreshPage() {
        window.location.reload(false);
      }
 
    const Returns = ()=>{
        if(returns.length > 0) {
              return returns.map((x, i) => (
                  <TableRow key={i}>
                    <TableCell  align="center" component="th" scope="row">
                      {x.sku}
                    </TableCell>
                    
         
                      {x.errors ?  <TableCell  align="center" component="th" scope="row">
                        <WarningIcon color="secondary" fontSize="large"/>
                      </TableCell> :  <TableCell  align="center" component="th" scope="row">
                      <CheckCircleIcon style={{ color: 'rgb(111 220 76)' }}  fontSize="large"/>
                          </TableCell>}
                
                  </TableRow>
                  
                ))
              }
              else{
                  return ''
              }
      }
  



      const handleSubmit =(e) =>{
        e.preventDefault();
          if(!(state.from) || !(state.to) || (items.length <= 0)){
            setError(true);

            setTimeout(() => {
              setError(null);
            }, 2000);
          
            //   alert('Please, fill in all required fields')
              return 
          }
          if(items.filter(x => x.quantity == 0).length > 0){
            setError3(true);

            setTimeout(() => {
              setError3(null);
            }, 3000);
            return
          }
          let new_products2 = []
       let new_products1 = [...items]
       new_products1.forEach(x =>{

        let sku = x.product.split(',')[0]
        new_products2.push({sku: sku, quantity: Number(x.quantity)})
       })
       console.log('Products', new_products2)
      let transfer = {
        warehouse_from: state.from,
        warehouse_to: state.to,
       products: new_products2
      }
      console.log('This Transfer', transfer)
      setData([])
      setState({
        from: '',
        to: ''
      })

      setValue([]) 
      setItems([]) 
console.log()
     
setTransf(true);
      actions.transfer(transfer).then(x =>{
          if(x.data) {
        setFlash(true);
setReturns(x.data)


    //   setTimeout(() => {
    //     setFlash(null);
    //   }, 4000);
  

}
    else{
        console.log('here')
            setError4(true);

            setTimeout(() => {
              setError4(null);
            }, 5000);
    }
     
    }).catch(err=>{
        console.log(err)
        setError4(true);
            setTimeout(() => {
              setError4(null);
            }, 5000);
    })
      
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
              <Typography variant="body2"  component="div" className={classes.form}>
              <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-label"> From Warehouse</InputLabel>
        <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
          native
          className={classes.box}
          value={state.from}
         
          onChange={handleChange}
          name="from"
          inputProps={{
            id: 'age-native-required',
          }}
        >
          {/* <option aria-label="None" value="" /> */}
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
              </Typography >
              <Typography variant="body2"  component="h2" align='center'>
              {(transf && returns <= 0) ?<Fade align='center' in={transf} timeout={{ enter: 300, exit: 1000 }}>
              <CircularProgress  align='center' style={{ color: 'rgb(96 96 96 / 87%)' }} />
              
        </Fade>: ('')}
        </Typography>
              {flash ? <Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="success">Transfer successfully completed!</Alert>
        </Fade> : ('')}
        {error4 ?<Fade in={error4} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Server error occurred. Please, reload the page!</Alert>
        </Fade>: ('')}
              {(state.to && state.from) ? <>
              <Typography variant="body2"  component="p" className={classes.auto}>
                
              <TextField
         id="standard-full-width"
         margin="normal"
          label="Barcode"
        //   type="number"
          align="center"
          style={{ margin: 4, fontWeight: 600, fontSize: '1.4em' }}
          onChange={(e) =>handleChange5(e)}
          defaultValue={barcode}
        //   value={barcode}
        
        />
{max_q ?<Fade in={max_q} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">You have reached maximum inventory allowed for this product!</Alert>
        </Fade>: ('')}
        {zero_q ?<Fade in={zero_q} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">This product has quantity of zero!</Alert>
        </Fade>: ('')}

              <Autocomplete
          
       {...flatProps}
        value={value}
        onChange={(event, newValue) => {
            console.log('Event', event)
            let arr = [...items]

            if(newValue) {
            
            if(arr.filter(e => e.product === newValue).length <= 0) {
                let sku = newValue.split(',')[0]
             
            if(sku) {
                let r1 = new RegExp(`.+,${newValue},.+`,"g");
                    actions.maxValue(sku).then(x =>{
                        let objs = x.data
                        let val = []
                       val = objs.filter(r1 => r1.warehouse_id == state.from)
                        if(val.length > 0){
                          
                            if(skus.filter(x => x.match(r1)).length > 0){
                                console.log("match")
                                arr.push({product: newValue, quantity: 0, max: val[0].on_hand})
                                setItems(arr)
                                return;
                            }
                            else{
                            arr.push({product: newValue, quantity: 0, max: val[0].on_hand})
                            setItems(arr)
                                return;
                            }
                        }
                    }).catch(err=>err)
            }
            }
            }
        //   setValue(newValue);
        //   console.log('arrrrr', arr)
        //   setItems(arr)
        }}
        renderInput={(params) => <TextField {...params} label="Search for product"  />}
        filterOptions={filterOptions}
      />
  

        {error2 ?<Fade in={error2} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Please fill in all required fields!</Alert>
        </Fade>: ('')}
    
        {error3 ?<Fade in={error3} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">One of the products has quantity of zero!</Alert>
        </Fade>: ('')}
        

      
      
              </Typography>
              <Typography    style={{color: 'rgb(0 0 0 / 67%)', padding: '1.5em 0.5em 0.2em '}} variant="h5" component="h5">
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
    </TableContainer></>
    : ('')}
            </CardContent>

    

          </CardContent>
          {(state.to && state.from) ?
          <CardActions className={classes.button}>
          <Button onClick={handleSubmit}  variant="outlined"  endIcon={<Icon>send</Icon>}>
Transfer
</Button >


          </CardActions> :('')}
          {returns.length > 0 ? <> <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">SKU</StyledTableCell>
            <StyledTableCell align="center">STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Returns/>
        </TableBody>
      </Table>
    </TableContainer>
    <Typography  align='center' style={{ marginTop: '2em'}} >
    <Button onClick={refreshPage} size='large' variant="outlined" >
  Do more work
</Button>
              </Typography>
  
    </> : ('')}
  

   
        </Card>
      );

}

