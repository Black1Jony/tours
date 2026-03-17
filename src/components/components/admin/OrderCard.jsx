import { Card, Button, Tag, Popconfirm } from "antd";
import { motion } from "framer-motion";

const OrderCard = ({ order, onDelete, onAccept, navigate, messageApi }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card
        className="h-full flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl transition"
        title={
          <div className="flex justify-between items-center">
            {order.name}
            <Tag color={order.status === "accepted" ? "green" : "orange"}>
              {order.status === "accepted" ? "Accepted" : "Pending"}
            </Tag>
          </div>
        }
      >
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-1 text-sm text-gray-700">
            <p>📞 {order.contact}</p>
            <p>📌 {order.chosenApp}</p>
            {order.guests > 0 && <p>👤 {order.guests}</p>}
            {order.idTour !== 0 && (
              <p
                className="text-blue-600 cursor-pointer break-words hover:underline"
                onClick={() => navigate(`/tour/${order.idTour}`)}
              >
                Перейти на тур
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {order.price > 0 && (
              <p className="text-green-600 font-bold text-lg">${order.price}</p>
            )}

            <div className="flex gap-2">
              <Button
                type="primary"
                onClick={() => onAccept(order._id)}
                disabled={order.status === "accepted"}
              >
                Accept
              </Button>

              <Popconfirm
                title="Удалить заявку?"
                onConfirm={() => onDelete(order)}
                okText="Да"
                cancelText="Нет"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderCard;