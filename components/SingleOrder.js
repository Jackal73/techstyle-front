import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 5px 0;
  padding: 10px 0;

  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  Time{
    font-size: .9rem;
    color: #002;
  }
`;

const Time = styled.time`
  font-weight: 600;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-bottom: 3px;
`;

const ProductSpan = styled.span`
  margin-left: 20px;
  font-size:.8rem;
  color: #888;
`;

const ProductItem = styled.span`
// font-weight: 600;
  font-size:.9rem;
  color: #888;
  span {
    color: #002;
    font-weight: 600;
  }
`;

const Address = styled.div`
  font-size:.8rem;
  line-height:1rem;
  margin-top: 5px;
  color:#888;
`;

export default function SingleOrder({line_items, createdAt, ...rest}) {
  let dateF = new Date(createdAt);
      dateF = new Date(dateF.getTime() + dateF.getTimezoneOffset());
  let orderDate = dateF.toLocaleString();

  return (
    <StyledOrder className="">
      <div className="">
        <Time>{orderDate}</Time>
          <Address>
            {rest.name}<br />
            {rest.email}<br />
            {rest.streetAddress}<br />
            {rest.city}, {rest.state}, {rest.country} {rest.postalCode}
          </Address>
      </div>

      <div className="">
        {line_items.map(item => (

          <ProductRow key={item.price_data.product_data.name} className="">
            <ProductItem className="">
              {item.quantity}  <span>{item.price_data.product_data.name}</span>
            </ProductItem>
            <ProductSpan className="">${item.price_data.unit_amount / 100} </ProductSpan>
          </ProductRow>

        ))}
      </div>
    </StyledOrder>
  )
}