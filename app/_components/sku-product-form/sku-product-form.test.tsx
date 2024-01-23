import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SkuProductForm from "./sku-product-form";
import { SkuItemApiRequest } from "@/app/_types/sku";

const mockSkuData: SkuItemApiRequest = {
  sku: "UK-101",
  description: "Test SKU",
  quantity: 88,
  store: "Test Store",
};

describe("<SkuProductForm />", () => {
  it("should render SKU product item data onto the form", () => {
    // given
    render(<SkuProductForm data={mockSkuData} />);

    // then
    expect(screen.getByDisplayValue("UK-101")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test SKU")).toBeInTheDocument();
    expect(screen.getByDisplayValue("88")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Store")).toBeInTheDocument();
  });

  it("should render the default primary action label", () => {
    // given
    render(<SkuProductForm primaryActionLabel="Test Submit" />);

    // then
    expect(screen.getByText("Test Submit")).toBeInTheDocument();
  });

  it.skip("should call the prop callback function 'onActionCompleted()' when clicked", async () => {
    // TODO: Will need to look into why the mocked onActionCompleted() callback is not being called even after clicking on the primary button.

    const user = userEvent.setup();
    const mockOnActionCompleted = jest.fn();

    // given
    render(
      <SkuProductForm
        data={mockSkuData}
        onActionCompleted={mockOnActionCompleted}
      />
    );

    // when
    const primaryButton = screen.getByRole("button", { name: "Submit" });
    await user.click(primaryButton);

    // then
    expect(mockOnActionCompleted).toHaveBeenCalled();
  });
});
