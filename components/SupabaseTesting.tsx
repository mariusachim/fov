import React, { useEffect, useState } from 'react';

type Row = Record<string, any>;

const SUPABASE_URL = 'https://xgcsqdolgdsxlbvigobt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnY3NxZG9sZ2RzeGxidmlnb2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODI1ODAsImV4cCI6MjA4MDM1ODU4MH0.oQ1lwuymuSp6c_wL5xrvrgAc0YtWyv2377ZK3nyIsHc';

const SupabaseTesting: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/test_table?select=*`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
        }
        const data = (await res.json()) as Row[];
        if (!cancelled) setRows(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-900">Supabase: test_table</h2>
        <p className="text-xs text-gray-500">Data fetched via PostgREST from Supabase</p>
      </div>

      {loading && (
        <div className="text-sm text-gray-600">Loading data…</div>
      )}

      {error && (
        <div className="text-sm text-red-600">Error: {error}</div>
      )}

      {!loading && !error && (
        rows.length === 0 ? (
          <div className="text-sm text-gray-600">No rows found.</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key} className="py-2 pr-4 font-medium uppercase tracking-wider text-[11px]">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    {Object.keys(rows[0]).map((key) => (
                      <td key={key} className="py-2 pr-4 text-gray-800">
                        {typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default SupabaseTesting;
