import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApislice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import ContentWrapper from "../../components/ContentWrapper";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="bg-accent min-h-[100vh]">
      <ContentWrapper>
        <section className="flex flex-col">
          <div className="w-[80%] flex justify-around flex-wrap">
            <div className="rounded-lg bg-secondary p-5 w-[20rem] mt-5">
              <div className="font-bold rounded-full w-[3rem] bg-primary text-center p-3 text-accent">
                $
              </div>

              <p className="mt-5 text-accent">Total Sales:</p>
              <h1 className="text-xl font-bold text-accent">
                $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
              </h1>
            </div>
            <div className="rounded-lg bg-secondary p-5 w-[20rem] mt-5">
              <div className="font-bold rounded-full w-[3rem] bg-primary text-center p-3 text-accent">
                $
              </div>

              <p className="mt-5 text-accent">Customers</p>
              <h1 className="text-xl font-bold text-accent">
                $ {isLoading ? <Loader /> : customers?.length}
              </h1>
            </div>
            <div className="rounded-lg bg-secondary p-5 w-[20rem] mt-5">
              <div className="font-bold rounded-full w-[3rem] bg-primary text-center p-3 text-accent">
                $
              </div>

              <p className="mt-5 text-accent">All Orders</p>
              <h1 className="text-xl font-bold text-accent">
                $ {isLoading ? <Loader /> : orders?.totalOrders}
              </h1>
            </div>
          </div>

          <div className="mt-[4rem] text-accent">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>

          <div className="mt-[4rem]">
            <OrderList />
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
};

export default AdminDashboard;
