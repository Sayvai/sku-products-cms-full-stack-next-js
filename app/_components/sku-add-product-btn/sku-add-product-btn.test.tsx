import { render, screen } from "@testing-library/react";

import SkuAddProductBtn from "./sku-add-product-btn";

describe("<SkuAddProductBtn />", () => {
  it("should render users data", () => {
    render(<SkuAddProductBtn />);

    expect(screen.getByText("Add SKU Product")).toBeInTheDocument();
  });
});
