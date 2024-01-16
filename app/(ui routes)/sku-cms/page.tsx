import { columns } from "@/app/_components/data-table/columns";
import { DataTable } from "@/app/_components/data-table/data-table";
import FileUpload from "@/app/_components/file-upload/file-upload";
import { getSkuProducts } from "@/app/_lib/api";

export default async function SkuCmsPage() {
  const data = await getSkuProducts();

  console.log("FETCH SKU DATA", data);

  return (
    <main className="flex flex-col gap-3 items-center h-screen p-6">
      <h1 className="text-6xl">SKU CMS Page</h1>
      <section>
        <FileUpload />
      </section>
      <section>
        <DataTable columns={columns} data={data} />
      </section>
    </main>
  );
}
