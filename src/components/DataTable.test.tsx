import ordersMockData from '../mockData/ordersMockData.json';
import { render, screen, waitFor } from '@testing-library/react';
import DataTable from './DataTable';
import nock from 'nock';

describe('Render the DataTable component', () => {
  it('Should render the DataTable component correctly', () => {
    const { getByText } = render(<DataTable />);
    const filterByState = getByText('Filter by state:');
    const approveButton = getByText('Approve');
    const cancelButton = getByText('Cancel');
    const deliveryButton = getByText('Delivery');
    const travelingButton = getByText('Traveling');
    const resetButton = getByText('Reset');
    const lessThanTwoDaysButton = getByText('Less than two days for ShippingPromise');
    const filterTravelingText = getByText('Filter traveling orders by date range:');

    expect(filterByState).toBeInTheDocument();
    expect(approveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deliveryButton).toBeInTheDocument();
    expect(travelingButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(lessThanTwoDaysButton).toBeInTheDocument();
    expect(filterTravelingText).toBeInTheDocument();
  });
  it('Should render mock data correctly', async () => {
    nock('http://localhost:8080/api')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/orders')
      .reply(200, ordersMockData);
    const { getByText, getByTestId } = render(<DataTable />);
    const filterByState = getByText('Filter by state:');
    const approveButton = getByText('Approve');
    const cancelButton = getByText('Cancel');
    const deliveryButton = getByText('Delivery');
    const travelingButton = getByText('Traveling');
    const resetButton = getByText('Reset');
    const lessThanTwoDaysButton = getByText('Less than two days for ShippingPromise');
    const filterTravelingText = getByText('Filter traveling orders by date range:');

    expect(filterByState).toBeInTheDocument();
    expect(approveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deliveryButton).toBeInTheDocument();
    expect(travelingButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(lessThanTwoDaysButton).toBeInTheDocument();
    expect(filterTravelingText).toBeInTheDocument();
    await waitFor(() => {
      screen.debug(undefined, Infinity);
      //expect(getByTestId('/value from the api')).toBeInTheDocument();
    });
  });
});
