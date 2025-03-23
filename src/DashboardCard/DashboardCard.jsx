import React from "react";
import { Card, CardContent } from "../components/Card/Card";
import { FaBell, FaClipboardList, FaFileAlt } from "react-icons/fa";

const cardData = [
  { id: 1, color: "bg-blue-100", icon: <FaFileAlt size={40} className="text-blue-500" />, value: 4, text: "Help Articles" },
  { id: 2, color: "bg-green-100", icon: <FaBell size={40} className="text-green-500" />, value: 0, text: "New Tickets" },
  { id: 3, color: "bg-orange-100", icon: <FaClipboardList size={40} className="text-orange-500" />, value: 2, text: "Replied Tickets" },
  { id: 4, color: "bg-red-100", icon: <FaFileAlt size={40} className="text-red-500" />, value: 2, text: "Closed Tickets" },
];

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cardData.map((card) => (
        <Card key={card.id} className={`p-4 ${card.color}`}>
          <CardContent className="flex items-center justify-between">
            {card.icon}
            <div className="text-right">
              <h2 className="text-2xl font-bold">{card.value}</h2>
              <p>{card.text}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCard;
