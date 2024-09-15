import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ServerStatus() {
  const [systemStats, setSystemStats] = useState({});
  const [freelancer, setFreelancer] = useState({});
  const [employer, setEmployer] = useState({});
  const [memoryData, setMemoryData] = useState([]);
  const [uptimeData, setUptimeData] = useState([]);

  useEffect(() => {
    const fetchStatus = () => {
      axios.get('http://vps.swarnadeepsahapoddar.in:1234/serverstatus').then((response) => {
        setSystemStats(response.data);
        setMemoryData((prevData) => [...prevData.slice(-9), response.data.UsedMemory]); // Keep the last 10 data points
        setUptimeData((prevData) => [...prevData.slice(-9), response.data.Uptime]);
        console.log(response.data);
      });
      axios.get('http://vps.swarnadeepsahapoddar.in:1234/freelancer').then((response) => {
        setFreelancer(response.data);
        console.log(response.data);
      });
      axios.get('http://vps.swarnadeepsahapoddar.in:1234/client').then((response) => {
        setEmployer(response.data);
        console.log(response.data);
      });
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Data for the Line Graphs
  const memoryChartData = {
    labels: Array.from({ length: memoryData.length }, (_, i) => `T-${(memoryData.length - i) * 5}s`),
    datasets: [
      {
        label: 'Used Memory (MB)',
        data: memoryData,
        borderColor: '#6366F1',
        backgroundColor: '#E0E7FF',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const uptimeChartData = {
    labels: Array.from({ length: uptimeData.length }, (_, i) => `T-${(uptimeData.length - i) * 5}s`),
    datasets: [
      {
        label: 'Uptime (seconds)',
        data: uptimeData,
        borderColor: '#F59E0B',
        backgroundColor: '#FEF3C7',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Server Status Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">System Statistics</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Architecture:</strong> {systemStats.Architecture}</li>
            <li><strong>CPU Model:</strong> {systemStats.CpuModel}</li>
            <li><strong>CPU Speed:</strong> {systemStats.CpuSpeed} GHz</li>
            <li><strong>Total Memory:</strong> {systemStats.TotalMemory} MB</li>
            <li><strong>Free Memory:</strong> {systemStats.FreeMemory} MB</li>
            <li><strong>Used Memory:</strong> {systemStats.UsedMemory} MB</li>
            <li><strong>Uptime:</strong> {systemStats.Uptime} seconds</li>
          </ul>
        </motion.div>
        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">Memory Usage Over Time</h2>
          <Line data={memoryChartData} />
        </motion.div>


        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">Uptime Over Time</h2>
          <Line data={uptimeChartData} />
        </motion.div>
        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-green-600">Freelancer Status</h2>
          <p className="text-gray-700">
            {freelancer.status ? freelancer.status : "Loading..."}
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Employer Status</h2>
          <p className="text-gray-700">
            {employer.status ? employer.status : "Loading..."}
          </p>
        </motion.div>

      </div>
    </div>
  );
}
