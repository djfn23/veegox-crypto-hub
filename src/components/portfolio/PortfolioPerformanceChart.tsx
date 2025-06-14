
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { date: '01/01', value: 1000 },
  { date: '01/02', value: 1200 },
  { date: '01/03', value: 1100 },
  { date: '01/04', value: 1400 },
  { date: '01/05', value: 1350 },
  { date: '01/06', value: 1600 },
  { date: '01/07', value: 1750 }
];

export const PortfolioPerformanceChart = () => {
  return (
    <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Performance (7 jours)</CardTitle>
          <Badge variant="secondary" className="bg-green-600/20 text-green-300">
            +24.5%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
