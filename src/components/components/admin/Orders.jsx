// frontend/src/pages/Orders.jsx
import { useEffect, useState, useCallback } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router";
import { Row, Col, message, Button, Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import OrderCard from "./OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");
      setOrders(res.data || []);
    } catch (error) {
      console.error("Ошибка загрузки заказов", error);
      messageApi.error("Ошибка загрузки заказов");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleDelete = async (order) => {
    const snapshot = orders;
    setOrders((prev) => prev.filter((o) => o._id !== order._id));

    try {
      await api.delete(`/books/${order._id}`, {
        data: { guest: order.guests, idTour: order.idTour },
      });
      messageApi.success("Удалено ✅");
    } catch (error) {
      console.error("Ошибка удаления:", error);
      setOrders(snapshot); 
      messageApi.error("Ошибка удаления");
    }
  };

const handleAccept = async (id) => {
  const snapshot = orders;

  // Оптимистично меняем статус на accepted
  setOrders((prev) =>
    prev.map((o) => (o._id === id ? { ...o, status: "accepted" } : o))
  );

  try {
    const key = localStorage.getItem("secretKey");

    // отправка PATCH
    const res = await api.patch(`/books/${id}/accept?secretKey=${key}`);

    // если бэк вернул объект с обновлённой бронью, синхронизируем фронт
    if (res?.data?.book) {
      const updatedBook = res.data.book;
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedBook._id ? updatedBook : o))
      );
    }

    messageApi.success("Заявка принята ✅");
  } catch (error) {
    console.error("Ошибка принятия:", error);

    // если хотим, можно убрать откат, потому что бэк реально принял
    // setOrders(snapshot);
    
    // но можно показать только предупреждение, если нужно
    messageApi.warning("accepted");
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {contextHolder}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📦 Orders</h1>
        <Button onClick={getOrders}>Перезагрузить</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <AnimatePresence>
            {orders.map((order) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={order._id}>
                <OrderCard
                  order={order}
                  onDelete={handleDelete}
                  onAccept={handleAccept}
                  navigate={navigate}
                  messageApi={messageApi}
                />
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Нет заказов</p>
      )}
    </div>
  );
};

export default Orders;