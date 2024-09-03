import Image from "next/image";

import Menu from "./components/menu";
import { ChatDialog } from "./components/chat";
interface HomeProps {
  userId: string; // Add userId as a prop
}
export default function Home({ userId }: HomeProps) {
  return (
      <Menu/>
   
  );
}
