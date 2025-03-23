import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Drawer, Button, Input, Select, Slider, Space} from 'antd';
import {FilterOutlined, SearchOutlined, ReloadOutlined} from '@ant-design/icons';
import {ConfigProvider} from 'antd';
import themeFilter from '../../../../shared/theme/themeFilterConfig';
import {
    updateFormValues,
    applyFilter,
    resetFilter,
    toggleFilterVisibility
} from '../../store/filterSlice';
import {RootState} from '../../store';
import {FilterForm} from './FilterForm';
import {useFilterLogic} from './useFilterLogic';
import {TFilterProduct} from '../../types/product';
import {squareHandleSliderStyles, createSliderStyles} from '../../../../styles/sliderStyles';

// Important: Order of imports matters for CSS!
// 1. First import CSS variables
import './scss/variables.css';
// 2. Then import module styles
import styles from './scss/FilterForm.module.scss';
import filterStyles from './scss/Filter.module.scss';

const {Option} = Select;

// Sử dụng styles tạo từ theme token
const customSliderStyles = createSliderStyles({
    isSquare: true,
    size: 'large',
    customColors: {
        railColor: 'rgba(118, 118, 128, 0.24)',
        trackColor: '#3B82F6',
        handleColor: '#3B82F6',
    }
});

export function Filter() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [drawerPriceRange, setDrawerPriceRange] = React.useState<[number, number]>([0.01, 200]);

    // Get filter state from Redux
    const {formValues, appliedFilters, isFilterVisible} = useSelector((state: RootState) => state.filter);
    const loading = useSelector((state: RootState) => state.products.loading);

    // Get filter logic from custom hook
    const {handleSearchChange} = useFilterLogic();

    // Apply initial values to form fields when component mounts
    useEffect(() => {
        form.resetFields();
    }, []);

    // Update form values when Redux state changes
    useEffect(() => {
        if (formValues) {
            form.setFieldsValue({
                ...formValues,
                // Map keyword to search and vice versa
                keyword: formValues.keyword || formValues.search,
                // Ensure priceRange is properly initialized
                priceRange: formValues.priceRange || [0.01, 200]
            });

            // Update drawer price range for mobile view
            setDrawerPriceRange(formValues.priceRange || [0.01, 200]);
        }
    }, [form, formValues]);

    const showDrawer = () => {
        dispatch(toggleFilterVisibility());
    };

    const closeDrawer = () => {
        dispatch(toggleFilterVisibility());
    };

    const handleResetFilter = () => {
        form.resetFields();
        dispatch(resetFilter());
    };

    const handleSubmit = (values: TFilterProduct) => {
        // Ensure search and keyword both have values
        if (values.keyword) {
            values.search = values.keyword;
        }

        // Ensure price range is properly set
        if (values.priceRange && Array.isArray(values.priceRange) && values.priceRange.length === 2) {
            values.minPrice = String(values.priceRange[0]);
            values.maxPrice = String(values.priceRange[1]);
        }

        dispatch(updateFormValues(values));
        dispatch(applyFilter());

        // Close drawer if it's open
        if (isFilterVisible) {
            closeDrawer();
        }
    };

    // Create filter summary for display
    const filterSummary = [];

    if (appliedFilters?.theme) {
        filterSummary.push(`Theme: ${appliedFilters.theme}`);
    }

    if (appliedFilters?.tier) {
        filterSummary.push(`Tier: ${appliedFilters.tier}`);
    }

    if (appliedFilters?.keyword) {
        filterSummary.push(`Search: ${appliedFilters.keyword}`);
    }

    if (appliedFilters?.priceRange && Array.isArray(appliedFilters.priceRange)) {
        filterSummary.push(`Price: ${appliedFilters.priceRange[0]} - ${appliedFilters.priceRange[1]} ETH`);
    }

    const handleDrawerPriceRangeChange = (value: [number, number]) => {
        setDrawerPriceRange(value);
    };

    return (
        <>
            {/* Mobile filter button */}
            <Button
                className={filterStyles.mobileFilterButton}
                type="primary"
                icon={<FilterOutlined/>}
                onClick={showDrawer}
                block
            >
                Filter Products
            </Button>

            {/* Desktop filter container */}
            <div className={filterStyles.desktopFilterContainer}>
                <ConfigProvider theme={themeFilter}>
                    <FilterForm
                        form={form}
                        loading={loading}
                        onSubmit={handleSubmit}
                        onResetFilter={handleResetFilter}
                        onSearchChange={handleSearchChange}
                        currentValues={formValues}
                    />
                </ConfigProvider>
            </div>

            {/* Mobile filter drawer */}
            <Drawer
                title="Filter Products"
                placement="right"
                closable={true}
                onClose={closeDrawer}
                open={isFilterVisible}
                width={320}
                styles={{
                    body: {
                        padding: 16
                    }
                }}
                footer={
                    <div className={filterStyles.drawerFooter}>
                        <Button onClick={handleResetFilter} icon={<ReloadOutlined/>}>
                            Reset All
                        </Button>
                        <Button type="primary" onClick={() => form.submit()}>
                            Apply Filters
                        </Button>
                    </div>
                }
            >
                <ConfigProvider theme={themeFilter}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="keyword" label="Search">
                            <Input
                                placeholder="Search products..."
                                prefix={<SearchOutlined/>}
                                onChange={handleSearchChange}
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item label="Price Range">
                            <Slider
                                range
                                min={0.01}
                                max={200}
                                value={drawerPriceRange}
                                onChange={(value: any) => handleDrawerPriceRangeChange(value as [number, number])}
                                onAfterChange={(value: any) => {
                                    form.setFieldsValue({priceRange: value});
                                }}
                                tooltip={{formatter: value => `${value} ETH`}}
                                // styles={customSliderStyles}
                            />
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
                                <span>{drawerPriceRange[0]} ETH</span>
                                <span>{drawerPriceRange[1]} ETH</span>
                            </div>
                        </Form.Item>

                        <Form.Item name="tier" label="Tier">
                            <Select placeholder="Select tier" allowClear>
                                <Option value="Free">Free</Option>
                                <Option value="Basic">Basic</Option>
                                <Option value="Premium">Premium</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="theme" label="Theme">
                            <Select placeholder="Select theme" allowClear>
                                <Option value="Light">Light</Option>
                                <Option value="Dark">Dark</Option>
                                <Option value="Colorful">Colorful</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="sortTime" label="Sort by Time">
                            <Select placeholder="Select sort order" allowClear>
                                <Option value="asc">Oldest First</Option>
                                <Option value="desc">Newest First</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="sortPrice" label="Sort by Price">
                            <Select placeholder="Select sort order" allowClear>
                                <Option value="asc">Low to High</Option>
                                <Option value="desc">High to Low</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </Drawer>
        </>
    );
}

export default FilterForm;