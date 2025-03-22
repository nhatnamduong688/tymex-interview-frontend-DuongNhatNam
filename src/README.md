# Cấu trúc thư mục ứng dụng

Ứng dụng được tổ chức theo mô hình Feature-based architecture, giúp code dễ quản lý, mở rộng và tái sử dụng.

## Thư mục chính

### `/features`

Chứa các tính năng (features) của ứng dụng, mỗi tính năng là một module độc lập.

- `/marketplace`: Module marketplace
  - `/components`: UI components của marketplace
  - `/store`: Redux store (slices) của marketplace
  - `/services`: API services của marketplace
  - `/types`: Types liên quan đến marketplace
  - `/utils`: Helper functions của marketplace

### `/shared`

Chứa các components, hooks, utilities được dùng chung giữa các features.

- `/components`: Shared UI components
- `/hooks`: Custom hooks dùng chung
- `/utils`: Utility functions dùng chung

### `/core`

Chứa các functionality cốt lõi của ứng dụng.

- `/api`: Base API configuration
- `/store`: Root store setup, middleware
- `/router`: Routing configuration
- `/types`: Global types
- `/constants`: Global constants

## Lợi ích của cấu trúc này

1. **Code organization**: Mỗi feature có thể hoạt động độc lập
2. **Scalability**: Dễ dàng thêm/xóa features mà không ảnh hưởng đến features khác
3. **Reusability**: Shared components và utilities có thể được sử dụng ở bất cứ đâu
4. **Maintainability**: Dễ dàng bảo trì vì code được phân tách theo chức năng
5. **Testability**: Mỗi feature có thể được test độc lập

## Quy ước

- Mỗi feature chỉ import từ `/shared` và `/core`, không import trực tiếp từ feature khác
- File index.ts nên được sử dụng cho public API, chỉ export những gì cần thiết
- Code liên quan đến UI nên nằm trong `/components`
- Logic business nên nằm trong `/services` hoặc `/store`
