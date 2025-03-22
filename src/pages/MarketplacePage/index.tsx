import React from 'react';
import styled from 'styled-components';
import withPageLoading from "../../hoc/withPageLoading";
import { MarketPlaceModule } from "../../features/marketplace";

const Container = styled.div`
  min-height: 80vh;
  padding: 100px 20px 20px;
`;

function MarketplacePage() {
  return <MarketPlaceModule />;
}

export default withPageLoading(MarketplacePage); 