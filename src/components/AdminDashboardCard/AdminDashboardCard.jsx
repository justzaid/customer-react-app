import React from "react";
import { Card, CardContent } from "../Card/Card";
import { FaFileAlt, FaReplyAll } from "react-icons/fa";
import { MdNotificationsActive, MdLiveHelp } from "react-icons/md";

// Renamed cardData to dynamicCardData and accept props for counts
const AdminDashboardCard = ({ openTicketsCount = 0, repliedTicketsCount = 0, closedTicketsCount = 0, resolvedTicketsCount = 0 }) => {
  
  const dynamicCardData = [
    { id: 1, color: "bg-[#5CB85C]", icon: <MdNotificationsActive size={40} className="text-white" />, value: openTicketsCount, text: "Open Tickets" }, // Changed text, using prop
    { id: 2, color: "bg-[#F0AD4E]", icon: <FaReplyAll size={40} className="text-amber-50" />, value: repliedTicketsCount, text: "Replied Tickets" }, // Using prop
    { id: 3, color: "bg-[#D9534F]", icon: <FaFileAlt size={40} className="text-red-100" />, value: closedTicketsCount, text: "Closed Tickets" }, // Using prop
    { id: 4, color: "bg-[#3B82F6]", icon: <MdLiveHelp size={40} className="text-white" />, value: resolvedTicketsCount, text: "Resolved Tickets" } // Using prop, changed text
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
        {dynamicCardData.map((card) => (
        <div key={card.id}>
            <Card className={`p-4 ${card.color}`}>
            <CardContent className="flex items-center justify-between">
            <div className="flex justify-between mb-2">
            {card.icon}
                <h2 className="text-3xl font-semibold text-white">{card.value}</h2>
            </div>
            <div className="text-right text-white">
                <p>{card.text}</p>
            </div>
            </CardContent>
            </Card>
            <div className="mt-2 text-left">
                <a href="#" style={{ color: card.color.replace("bg-[", "").replace("]", "") }}>
                View Details
                </a>
                <hr className="my-2 border-grey-300" />
          </div>
        </div>
        ))}

    </div>
  );
};

export default AdminDashboardCard;
