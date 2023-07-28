import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { InterfaceOrders, InterfaceItems } from '../types'
import StatusButtonsFilter from './StatusButtonsFilter'
import ButtonGroup from '@mui/material/ButtonGroup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import Button from '@mui/material/Button'
//import {itemsMockData} from '../mockData/itemsMockData';
import {addDaysFromDate} from '../utils';
import SendOrderService from '../services/SendOrderService'

function createData(
  id: string,
  createDate: Date,
  status: string,
  client: string,
  shippingAddress: string,
  shippingPromise: Date,
  items: Array<InterfaceItems>,
) {
  return {
    id,
    createDate,
    status,
    client,
    shippingAddress,
    shippingPromise,
    items,
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.id}
        </TableCell>
        <TableCell align='right'>{row.createDate as unknown as string}</TableCell>
        <TableCell align='right'>{row.status}</TableCell>
        <TableCell align='right'>{row.client}</TableCell>
        <TableCell align='right'>{row.shippingAddress}</TableCell>
        <TableCell align='right'>{row.shippingPromise as unknown as string}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Items
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell align='right'>Description</TableCell>
                    <TableCell align='right'>Url</TableCell>
                    <TableCell align='right'>Price ($)</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item : InterfaceItems) => (
                    <TableRow key={item.product.id}>
                      <TableCell component='th' scope='row'>
                        {item.product.id}
                      </TableCell>
                      <TableCell>{item.product.title}</TableCell>
                      <TableCell align='right'>{item.product.description}</TableCell>
                      <TableCell align='right'>{item.product.url}</TableCell>
                      <TableCell align='right'>{item.product.price}</TableCell>
                      <TableCell align='right'>{item.product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}


export default function DataTable() {

  const [orders, setOrders] = React.useState<Array<InterfaceOrders>>([])
  const [ordersNotFiltered, setOrdersNotFiltered] = React.useState<Array<InterfaceOrders>>([])
  const [firstDate, setFirstDate] = React.useState<Dayjs | null>(null)
  const [secondDate, setSecondDate] = React.useState<Dayjs | null>(null)
  const getAllOrders = ()=>{
    SendOrderService.getAll()
    .then((response: any) => {
      setOrders(response.data)
      setOrdersNotFiltered(response.data)
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }
  React.useEffect(()=>{
    getAllOrders();
  }, [])
  
  const checkTwoDaysShippingPromise = (_event: React.MouseEvent<HTMLButtonElement>) => {
    //check whether the shippingPromise is in two days for Approve orders
    const d = new Date()
    const filteredOrders = ordersNotFiltered.filter(
      (order: InterfaceOrders) => {
        const createDate = new Date(order.shippingPromise);
        const promiseDateLessTwoDays = addDaysFromDate(createDate, -2);
        return order.status.includes('Approve') && d.valueOf() >= promiseDateLessTwoDays.valueOf();
      }
        
    )
    setOrders(filteredOrders)
  }
  React.useEffect(() => {
    if (firstDate !== null && secondDate !== null) {
      //check traveling orders within date range
      const start = Date.parse(firstDate.format())
      const end = Date.parse(secondDate.format())
      const filteredOrders = ordersNotFiltered.filter(
        (order: InterfaceOrders) => {
          const createDate = new Date(order.createDate);
          return  order.status.includes('Traveling') && createDate.valueOf() >= start.valueOf() && createDate.valueOf() <= end.valueOf();
        }
         
      )
      setOrders(filteredOrders)
    }
  }, [firstDate, secondDate, ordersNotFiltered])
  return (
    <>
      <StatusButtonsFilter
        onStatusChange={(textContent: string) => {
          if (textContent === 'Reset') {
            getAllOrders();
          } else {
            const filteredOrders = ordersNotFiltered.filter((order: InterfaceOrders) =>
              order.status.includes(textContent),
            )
            setOrders(filteredOrders)
          }
        }}
      />
      <ButtonGroup variant='text' sx={{ dispaly: 'flex', alignItems: 'baseline' }}>
        <Typography variant='body1' gutterBottom>
          Filter by:
        </Typography>
        <Button color='error' variant='text' onClick={checkTwoDaysShippingPromise}>
          Less than two days for ShippingPromise
        </Button>
      </ButtonGroup>
      <ButtonGroup variant='text' sx={{ dispaly: 'flex', alignItems: 'baseline' }}>
        <Typography variant='body1' gutterBottom marginRight={'0.5rem'}>
          Filter traveling orders by date range:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={firstDate}
            onChange={(newValue) => {
              setFirstDate(newValue)
            }}
          />
          <DatePicker
            value={secondDate}
            onChange={(newValue) => {
              setSecondDate(newValue)
            }}
          />
        </LocalizationProvider>
      </ButtonGroup>
      <TableContainer component={Paper} data-testid="tableContainer">
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='center'>Id</TableCell>
              <TableCell align='center'>CreateDate</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Client</TableCell>
              <TableCell align='center'>ShippingAddress</TableCell>
              <TableCell align='center'>ShippingPromise</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length >=1 && orders.map((order) => (
              <Row
                key={order._id}
                row={createData(
                  order._id,
                  order.createDate,
                  order.status,
                  order.client,
                  order.shippingAddress,
                  order.shippingPromise,
                  order.items,
                )}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
