import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "src");

// Paths to fix
const pathMappings = [
  // Filter-form fixes
  {
    from: "../../../store/slices/filterSlice",
    to: "../../store/filterSlice",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../store",
    to: "../../..",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../types/product",
    to: "../../types/product",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../hooks/useBreakpoint",
    to: "../../../../shared/hooks/useBreakpoint",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../enums/filter",
    to: "../../enums/filter",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../helpers/common",
    to: "../../../../shared/helpers/common",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../services/api",
    to: "../../services/api",
    dir: "src/features/marketplace/components/filter-form",
  },
  {
    from: "../../../theme/themeFilterConfig",
    to: "../../../../shared/theme/themeFilterConfig",
    dir: "src/features/marketplace/components/filter-form",
  },

  // Product-list fixes
  {
    from: "../../../store/slices/productsSlice",
    to: "../../store/productsSlice",
    dir: "src/features/marketplace/components/product-list",
  },
  {
    from: "../../../store/slices/filterSlice",
    to: "../../store/filterSlice",
    dir: "src/features/marketplace/components/product-list",
  },
  {
    from: "../../../hooks",
    to: "../../../../shared/hooks",
    dir: "src/features/marketplace/components/product-list",
  },
  {
    from: "../../../store",
    to: "../../..",
    dir: "src/features/marketplace/components/product-list",
  },

  // Product-cart fixes
  {
    from: "../../../types/product",
    to: "../../types/product",
    dir: "src/features/marketplace/components/product-cart",
  },

  // Tag-categories fixes
  {
    from: "../../../components/Button",
    to: "../../../../shared/components/Button",
    dir: "src/features/marketplace/components/tag-categories",
  },
  {
    from: "../../../store",
    to: "../../..",
    dir: "src/features/marketplace/components/tag-categories",
  },
  {
    from: "../../../store/slices/filterSlice",
    to: "../../store/filterSlice",
    dir: "src/features/marketplace/components/tag-categories",
  },
  {
    from: "../../../enums/filter",
    to: "../../enums/filter",
    dir: "src/features/marketplace/components/tag-categories",
  },

  // Store fixes
  {
    from: "../../services/productApi",
    to: "../services/productApi",
    dir: "src/features/marketplace/store",
  },
  {
    from: "../../types/product",
    to: "../types/product",
    dir: "src/features/marketplace/store",
  },
  {
    from: "../../enums/filter",
    to: "../enums/filter",
    dir: "src/features/marketplace/store",
  },
  { from: "../index", to: "../..", dir: "src/features/marketplace/store" },

  // Services fixes
  {
    from: "./apiService",
    to: "./apiService",
    dir: "src/features/marketplace/services",
  },
  {
    from: "../types/product",
    to: "../types/product",
    dir: "src/features/marketplace/services",
  },
  {
    from: "../utils/enumHelpers",
    to: "../utils/enumHelpers",
    dir: "src/features/marketplace/services",
  },

  // Hooks fixes
  {
    from: "../store/slices/productsSlice",
    to: "../../features/marketplace/store/productsSlice",
    dir: "src/shared/hooks",
  },
  {
    from: "../store/slices/filterSlice",
    to: "../../features/marketplace/store/filterSlice",
    dir: "src/shared/hooks",
  },
  {
    from: "../types/product",
    to: "../../types/product",
    dir: "src/shared/hooks",
  },
];

let totalChanges = 0;

for (const mapping of pathMappings) {
  // Find all .ts and .tsx files in the specified directory
  const files = glob.sync(`${mapping.dir}/**/*.{ts,tsx}`);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    // Create a regex to match import statements with the specified path
    const importRegex = new RegExp(`from\\s+['"](${mapping.from})['"]`, "g");

    // Replace all matching import statements
    const newContent = content.replace(importRegex, `from '${mapping.to}'`);

    // Count changes
    const changes = (content.match(importRegex) || []).length;

    // Write the file back if there were changes
    if (changes > 0) {
      fs.writeFileSync(file, newContent);
      totalChanges += changes;
      console.log(`Updated ${changes} import(s) in ${file}`);
    }
  });
}

console.log(`Total ${totalChanges} import statements updated.`);
