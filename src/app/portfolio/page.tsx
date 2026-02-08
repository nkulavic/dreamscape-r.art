import { getAllMurals } from "@/db/dal";
import PortfolioClient from "./PortfolioClient";

export default async function PortfolioPage() {
  const murals = await getAllMurals();
  return <PortfolioClient murals={murals} />;
}
