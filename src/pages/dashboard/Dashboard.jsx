import { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { UserIcon, BookOpenIcon, GraduationCapIcon } from "lucide-react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function DashboardPage() {
  const [startDate, setStartDate] = useState(
    getDateString(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))
  );
  const [endDate, setEndDate] = useState(getDateString(new Date()));

  const cardData = [
    {
      icon: <UserIcon size={24} />,
      value: "1,234",
      title: "Pengguna Terdaftar",
    },
    { icon: <BookOpenIcon size={24} />, value: "56", title: "Kursus Tersedia" },
    {
      icon: <GraduationCapIcon size={24} />,
      value: "789",
      title: "Total Kursus Terdaftar",
    },
  ];

  // Helper function to format date to YYYY-MM-DD
  function getDateString(date) {
    return date.toISOString().split("T")[0];
  }

  // Helper function to generate dates between start and end
  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    while (currentDate <= end) {
      dates.push(getDateString(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  // Dummy data for the chart
  const generateChartData = (start, end) => {
    return getDates(start, end).map((date) => ({
      date: date.split("-").reverse().slice(0, 2).join("/"), // Format as DD/MM
      users: Math.floor(Math.random() * 100) + 50, // Random number between 50 and 150
    }));
  };

  const chartData = generateChartData(startDate, endDate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardBody className="flex flex-col items-center text-center">
              <div className="text-primary mb-2">{card.icon}</div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="text-sm text-gray-500">{card.title}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Jumlah Pengguna (7 Hari Terakhir)
            </h2>
            <div className="flex space-x-4">
              <Input
                type="date"
                label="Tanggal Mulai"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={getDateString(new Date(endDate))}
              />
              <Input
                type="date"
                label="Tanggal Akhir"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={getDateString(new Date())}
              />
            </div>
          </div>
          <div className="h-full">
            <LineChart
              xAxis={[
                {
                  data: chartData.map((item) => item.date),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: chartData.map((item) => item.users),
                },
              ]}
              height={500}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
