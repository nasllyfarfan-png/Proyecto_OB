import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from '../components/Products';

export default function ProductsPage({ onAdd }) {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchText, setSearchText]     = useState('');

  // sync ?q= param from navbar search
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchText(q);
  }, [searchParams]);

  return (
    <Products
      onAdd={onAdd}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      searchText={searchText}
    />
  );
}
