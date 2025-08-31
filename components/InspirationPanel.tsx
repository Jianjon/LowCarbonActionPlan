
import React, { useState } from 'react';
import LeafIcon from './icons/LeafIcon';
import SunBoltIcon from './icons/SunBoltIcon';
import BicycleIcon from './icons/BicycleIcon';
import RecycleIcon from './icons/RecycleIcon';
import HeartHomeIcon from './icons/HeartHomeIcon';
import TeamIcon from './icons/TeamIcon';

const inspirationData = [
  {
    icon: LeafIcon,
    title: '生態綠化',
    description: '可透過植物降低溫度、美化社區空間，也有助於雨水滲透與生物棲息。',
    examples: [
      '廟埕或廣場設置綠籬、花架或香草植栽箱',
      '在空地設置小型社區花園、蝴蝶生態角',
      '活動中心周邊鋪設透水磚、設置爬藤植物牆',
      '公共空間栽種遮蔭樹種，改善高溫環境',
    ],
  },
  {
    icon: SunBoltIcon,
    title: '綠能節電',
    description: '協助降低社區公共空間的電力使用成本，亦提升安全與便利性。',
    examples: [
      '活動中心汰換老舊燈具為 LED 照明',
      '廟埕或巷道加裝太陽能感應燈或路燈',
      '建置簡易型太陽能板（可供照明、USB充電）',
      '設立用電儀表與能源管理宣導板',
    ],
  },
  {
    icon: BicycleIcon,
    title: '綠色運輸',
    description: '推動短程步行或非燃油代步工具，減少交通碳排與噪音污染。',
    examples: [
      '規劃共用電輔車或腳踏車停放區',
      '社區公有地設置簡易電動車充電插座',
      '舉辦推廣綠色通勤的短程走讀活動',
      '製作社區綠色通行地圖（鼓勵步行路線）',
    ],
  },
  {
    icon: RecycleIcon,
    title: '資源循環',
    description: '強調廢棄物分類、再利用與資源回收的常態化。',
    examples: [
      '設置雨水回收桶或雨撲滿，提供澆花用水',
      '活動中心設置分類清楚的資源回收區',
      '建置堆肥系統，用於花園或盆栽',
      '舉辦二手物交換日、修繕小站活動',
    ],
  },
  {
    icon: HeartHomeIcon,
    title: '低碳生活',
    description: '從日常飲食、用水用電與生活方式入手，讓居民逐步培養低碳習慣。',
    examples: [
      '整建共食廚房，搭配在地食材推廣活動',
      '設置可重複使用器具、洗碗區與儲放架',
      '舉辦惜食料理班、剩食再利用課程',
      '活動中心加裝節水設備（感應水龍頭、省水閥）',
    ],
  },
    {
    icon: TeamIcon,
    title: '永續經營',
    description: '強調空間的教育功能與社區自主管理能力，讓行動可延續。',
    examples: [
      '設立永續教育牆面或展示角落，搭配導覽內容',
      '建立志工維護制度，推動空間認養',
      '辦理社區種子志工培訓、環境講座',
      '結合在地學校或社區團體定期運用與巡查空間',
    ],
  },
];

const InspirationCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  examples: string[];
}> = ({ icon: Icon, title, description, examples }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center mb-2">
      <Icon className="w-6 h-6 text-brand-primary mr-3" />
      <h4 className="font-bold text-lg text-brand-primary">{title}</h4>
    </div>
    <p className="text-sm text-brand-text-secondary mb-3">{description}</p>
    <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
      {examples.map((ex, i) => <li key={i}>{ex}</li>)}
    </ul>
  </div>
);


const InspirationPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-teal-50/70 border border-brand-secondary rounded-lg p-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-brand-primary">💡 靈感角落</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 animate-fade-in">
                    {inspirationData.map(item => <InspirationCard key={item.title} {...item} />)}
                </div>
            )}
        </div>
    );
}

export default InspirationPanel;
