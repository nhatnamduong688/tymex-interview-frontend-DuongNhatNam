import { Col, Row, Form } from "antd";
import { BannerSection } from "./components/banner-section";
import { FilterForm } from "./components/filter-form/FilterForm";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { TagCategories } from "./components/tag-categories";
import styles from "./scss/Marketplace.module.scss";
import { ProductList } from "./components/product-list";
import {FilterMobile} from "./components/filter-mobile";
import { useState } from "react";
import { TFilterProduct } from "./types/product";

export const MarketPlaceModule = () => {
  const { isCollapsed } = useBreakpoint();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState<TFilterProduct>({});

  const handleSubmit = (values: TFilterProduct) => {
    setLoading(true);
    // Xử lý logic filter
    console.log("Filter values:", values);
    setFilterValues(values);
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    form.resetFields();
    setFilterValues({});
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Xử lý search trực tiếp nếu cần
    console.log("Search changed:", e.target.value);
  };

  return (
    <article>
      <BannerSection />
      <div className={styles["container-product-list"]}>
        {isCollapsed && <FilterMobile />}

        <Row gutter={16}>
          {!isCollapsed && (
            <Col xl={6}>
              <FilterForm 
                form={form}
                loading={loading}
                onSubmit={handleSubmit}
                onResetFilter={handleReset}
                onSearchChange={handleSearchChange}
                currentValues={filterValues}
              />
            </Col>
          )}
          <Col xl={18} lg={24} className={styles["product-list-inner"]}>
            {!isCollapsed && <TagCategories />}
            <ProductList />
          </Col>
        </Row>
      </div>
    </article>
  );
}; 