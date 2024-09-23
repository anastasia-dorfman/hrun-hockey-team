import { useLoaderData } from "react-router-dom";
import OrderCard from "../../components/account/OrderCard";
import Wrapper from "../../assets/wrappers/account/MyOrders";
import customFetch from "../../utils/customFetch";
// import { shouldUseMockData } from "../../utils/environment";
import { mockOrders } from "../../data/mockData.js";

const shouldUseMockData = true;

export const loader = async ({ request }) => {
  try {
    if (shouldUseMockData) {
      console.log("Using mock data");
      return { data: { orders: mockOrders } };
    }
    const { data } = await customFetch.get("/orders");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const MyOrders = () => {
  const { data } = useLoaderData();
  const orders = data.orders || [];

  if (orders.length === 0) return <h2>No orders yet</h2>;

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log("sortedOrders", sortedOrders);

  return (
    <Wrapper>
      {sortedOrders.length > 0 &&
        sortedOrders.map((o) => (
          <div className="order-item" key={o.orderId}>
            <OrderCard order={o} />
          </div>
        ))}
    </Wrapper>
  );
};

export default MyOrders;
