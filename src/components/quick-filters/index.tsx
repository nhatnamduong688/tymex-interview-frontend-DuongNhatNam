import { useEffect, useState } from 'react';
import useFilters from '@/hooks/useFilters';
import { useSearchParams } from 'next/navigation';
import { quickFilter } from '@/assets/mock-data/quick-filter';
import './index.css';

const QuickFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const searchParams = useSearchParams();
  const { setDataFilter, resetFilters, dataFilter } = useFilters();

  const handleQuickFilter = (filter: string) => {
    resetFilters();
    setActiveFilter(filter);
    if (filter === 'all') {
      setDataFilter({ ...dataFilter, category: '' });
    } else {
      setDataFilter({ ...dataFilter, category: filter });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlFilterData = {
      category: params.get('category') || '',
    };
    // Update active quick filter
    setActiveFilter(urlFilterData.category || 'all');
  }, [searchParams]);

  return (
    <div className='quick-filters'>
      <div className='quick-filters-list'>
        {quickFilter.map((item, index) => (
          <button
            className={`quick-filters-item ${
              activeFilter === item.value ? 'active' : ''
            }`}
            key={`${item.value}-${index}`}
            onClick={() => handleQuickFilter(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickFilters;
