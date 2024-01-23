import { render, screen } from "@testing-library/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SkuItemApiRequest } from "@/app/_types/sku";

const mockData: SkuItemApiRequest[] = [
  {
    sku: "UK-34343",
    description: "Test desc",
    quantity: 8,
    store: "LON",
  },
];

describe("<DataTable>", () => {
  it("should render the table column headers", () => {
    // given
    render(<DataTable columns={columns} data={mockData} />);

    // then
    expect(
      screen.getByRole("columnheader", { name: "SKU" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Quantity" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Store" })
    ).toBeInTheDocument();
  });

  it("should render with no table data", () => {
    // given
    render(<DataTable columns={columns} data={[]} />);

    // then
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("should render with table data", () => {
    // given
    render(<DataTable columns={columns} data={mockData} />);

    // then
    expect(screen.getByText("UK-34343")).toBeInTheDocument();
    expect(screen.getByText("Test desc")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("LON")).toBeInTheDocument();
  });
});
