import { columns } from "@/app/_components/data-table/columns";
import { DataTable } from "@/app/_components/data-table/data-table";
import FileUpload from "@/app/_components/file-upload/file-upload";
import SkuAddProductBtn from "@/app/_components/sku-add-product-btn/sku-add-product-btn";
import TestDataDownload from "@/app/_components/test-data-download/test-data-download";
import { getSkuProducts } from "@/app/_lib/api";

export default async function SkuCmsPage() {
  const data = await getSkuProducts();

  console.log("FETCH SKU DATA", data);

  return (
    <main className="flex flex-col gap-9 items-center h-screen p-6">
      <h1 className="text-6xl">SKU CMS Page</h1>
      <section className="flex flex-col gap-4">
        <FileUpload />
        <TestDataDownload />
      </section>
      <section>
        <SkuAddProductBtn />
      </section>
      <section>
        <DataTable columns={columns} data={data} />
      </section>
    </main>
  );
}
