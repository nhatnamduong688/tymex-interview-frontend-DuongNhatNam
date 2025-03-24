'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loader-spinner';
import QuickFilters from '@/components/quick-filters';
import ListProducts from '@/components/list-products';
import Button from '@/components/button';
import useFilters from '@/hooks/useFilters';
import { Controller } from 'react-hook-form';
import SearchInput from '@/components/search-input';
import Dropdown from '@/components/dropdown';
import Icon from '@/components/icon';
import Range from '@/components/range';
import {
  priceOptions,
  themeOptions,
  tierOptions,
  timeOptions,
} from '@/assets/mock-data/dropdown';
import BgWave from '../../../public/images/bg-wave.png';
import './index.css';

type FormValues = {
  search: string;
  tier: string;
  theme: string;
  time: string;
  priceOrder: string;
};

const initialFormData = {
  search: '',
  tier: '',
  theme: '',
  time: '',
  priceOrder: '',
  price: [],
};

const GroupProducts = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: initialFormData,
  });

  const {
    filteredProducts,
    setDataFilter,
    loadMore,
    resetFilters,
    hasMore,
    isLoading,
    dataFilter,
  } = useFilters();

  const onSubmit = (data: FormValues) => {
    setDataFilter(data);
    setIsFiltersOpen(false);
  };

  const handleResetFilters = () => {
    reset();
    setSearchValue('');
    setDataFilter(initialFormData);
    resetFilters();
    setIsFiltersOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlFilterData = {
      search: params.get('search') || '',
      tier: params.get('tier') || '',
      theme: params.get('theme') || '',
      time: params.get('time') || '',
      priceOrder: params.get('priceOrder') || '',
      category: params.get('category') || '',
    };

    // Update form values
    Object.entries(urlFilterData).forEach(([key, value]) => {
      setValue(key as keyof FormValues, value);
    });

    setSearchValue(urlFilterData.search);
  }, [searchParams, setValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setDataFilter({ ...dataFilter, search: value });
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setDataFilter({ ...dataFilter, search: '' });
  };

  const handleOpenFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className='group-products'>
      <div className='group-products-container'>
        <Button
          className='open-filters'
          text='Open filters'
          onClick={handleOpenFilters}
        />
        <div
          className={`group-products-filters ${isFiltersOpen ? 'open' : ''}`}
        >
          <SearchInput
            value={searchValue}
            onChange={handleSearch}
            onClear={handleClearSearch}
          />

          <div className='filters-range'>
            <Range
              title='Price'
              min={0}
              max={200}
              step={10}
              defaultValue={[2, 200]}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='filters'>
            <div className='filters-dropdowns'>
              <Controller
                name='tier'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Tier'
                    options={tierOptions}
                    value={field.value}
                    placeholder='Select tier'
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='theme'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Theme'
                    options={themeOptions}
                    value={field.value}
                    placeholder='Select theme'
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='time'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Time'
                    options={timeOptions}
                    value={field.value}
                    placeholder='Order by time'
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='priceOrder'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Price'
                    options={priceOptions}
                    value={field.value}
                    placeholder='Order by price'
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className='filters-button'>
              <Button
                text='Reset filter'
                icon={<Icon name='close-circle' />}
                typeButton='secondary'
                type='button'
                onClick={handleResetFilters}
              />
              <Button
                text='Search'
                size='medium'
                type='submit'
                disabled={!isDirty}
              />
            </div>
          </form>
        </div>
        <div className='group-products-list'>
          <QuickFilters />
          <ListProducts products={filteredProducts || []} />
          <TailSpin
            visible={isLoading}
            height='80'
            width='80'
            color='#DA429D'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass='group-products-loading'
          />
          {hasMore && !isLoading && (
            <div className='group-products-button-container'>
              <Button text='View more' size='large' onClick={loadMore} />
            </div>
          )}
        </div>
      </div>

      <Image src={BgWave} alt='bg-wave' className='bg-wave' height={418} />
    </div>
  );
};

export default GroupProducts;
