import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { volumeData } from '../../data/mockData';

export function VolumeChart() {
  return (
    <div className="chart-container" role="img" aria-label="Volume de documentos nos últimos 30 dias">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={volumeData} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="receivedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#155eef" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#155eef" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#edf1f6" strokeDasharray="3 3" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 11 }} dy={8} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 11 }} domain={[0, 100]} />
          <Tooltip contentStyle={{ border: '1px solid #e4e9f2', borderRadius: 9, boxShadow: '0 8px 20px rgb(15 23 42 / 8%)', fontSize: 11 }} />
          <Area type="monotone" dataKey="received" name="Recebidos" stroke="#155eef" strokeWidth={2.2} fill="url(#receivedFill)" dot={false} activeDot={{ r: 4, fill: '#155eef', stroke: '#fff', strokeWidth: 2 }} isAnimationActive={false} />
          <Area type="monotone" dataKey="processed" name="Processados" stroke="#06b6d4" strokeWidth={2} fill="transparent" dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
