import { useState } from 'react';
import { Info } from 'lucide-react';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="cursor-help text-cyberGreen mr-1">
        <Info className="w-4 h-4 inline" />
      </span>
      {show && <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-slate-800 text-white text-sm rounded shadow-lg z-10 whitespace-nowrap">{text}</div>}
      {children}
    </div>
  );
}