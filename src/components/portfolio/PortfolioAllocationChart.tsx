
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const portfolioData = [
  { name: 'Veegox', value: 45, color: '#8B5CF6' },
  { name: 'ETH', value: 25, color: '#3B82F6' },
  { name: 'USDC', value: 15, color: '#10B981' },
  { name: 'BTC', value: 10, color: '#F59E0B' },
  { name: 'Autres', value: 5, color: '#6B7280' }
];

export const PortfolioAllocationChart = () => {
  return (
    <Card className="lg:col-span-1 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Répartition du Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-4">
          {portfolioData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
