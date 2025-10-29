import DetailProduct from "@/views/Products/Detail";

type Props = {
  params: Promise<{ slug: string }>;
};

const ProductDetail = async ({ params }: Props) => {
  const { slug } = await params;
  return <DetailProduct slug={slug} />;
};

export default ProductDetail;
