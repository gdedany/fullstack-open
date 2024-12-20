import { useNotificationValue } from "../NotificationContext";
const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const notification = useNotificationValue();
  console.log("notification in Notification component:", notification);
  if (!notification) {
    return null;
  } else return <div style={style}>{notification}</div>;
};

export default Notification;
