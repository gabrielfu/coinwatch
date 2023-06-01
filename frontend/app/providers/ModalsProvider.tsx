'use client';

import CreatePortfolioModal from "../components/modals/CreatePortfolioModal";
import DeletePortfolioModal from "../components/modals/DeletePortfolioModal";

const ModalsProvider = () => {
  return ( 
    <>
      <CreatePortfolioModal />
      <DeletePortfolioModal />
    </>
   );
}
 
export default ModalsProvider;