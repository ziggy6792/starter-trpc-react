import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithAllProviders } from 'src/test-utils/render-test-utils';
import { server } from 'src/test-utils/mocks/server';
import { rest } from 'msw';
import { HistoricalPrice } from './historical-price';

describe('Historical Price', () => {
  it('renders historical price chart', async () => {
    renderWithAllProviders(<HistoricalPrice fromSymbol='BTC' />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Price in USD/)).toBeInTheDocument();
    });
    // Mock result shows from 2pm - 2pm next day
    expect(screen.getAllByText(/14:00/)).toHaveLength(2);
  });
  it('shows error on api errror', async () => {
    server.use(rest.get(`${process.env.REACT_APP_API_GSG_INTERNAL_URL}/getHistoricalPrice`, (req, res, ctx) => res(ctx.json({ error: 'error' }))));
    renderWithAllProviders(<HistoricalPrice fromSymbol='BTC' />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Oh no something went wrong!/)).toBeInTheDocument();
    });
  });
});
